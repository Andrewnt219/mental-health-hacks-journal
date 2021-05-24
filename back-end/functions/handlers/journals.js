const { admin, db } = require("../utils/init");
const { analyze } = require("./sentiment");
const { addPrompt } = require("./prompts");
const { thisWeekTracker } = require("./weeklyTrackers");

exports.getUsersJournals = (req, res) => {
  db.collection("journals")
    .where("userId", "==", `${req.user.userId}`)
    .orderBy("dateCreated", "desc")
    .get()
    .then((data) => {
      let journals = [];
      data.forEach((doc) => {
        journals.push({
          journalId: doc.id,
          content: doc.data().content,
          dateCreated: doc.data().dateCreated,
          userId: doc.data().userId,
          moodStatus: doc.data().moodStatus,
          moodScore: doc.data().moodScore,
        });
      });

      return res.status(200).json(journals);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Something went wrong, please try again!" });
    });
};

exports.getOneJournal = (req, res) => {
  let journalData = {};
  db.doc(`/journals/${req.params.journalId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(400).json({ error: "Journal not found" });
      }
      journalData = doc.data();
      journalData.journalId = doc.id;
      return res.status(200).json(journalData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong, please try again" });
    });
};

/* 
  req: {
    body: {
      content: String
      moodStatus: Integer
      allowPrompt: Boolean
    }
  }
*/
exports.addJournal = async (req, res) => {
  try {
    if (req.body.content.trim() === "") {
      return res.status(400).json({ error: "Content must not be empty" });
    }

    const analysis = await analyze(req.body.content);

    const newJournal = {
      content: req.body.content,
      userId: req.user.userId,
      dateCreated: new Date().toISOString(),
      moodStatus: req.body.moodStatus,
      moodScore: analysis.score,
    };

    db.collection("journals")
      .add(newJournal)
      .then((doc) => {
        const resJournal = newJournal;
        resJournal.journalId = doc.id;

        // Filter negative or mixed journal only when user allows
        const isNegativeOrMixedScore =
          analysis.score < 0 || (analysis.score == 0 && analysis.magnitude > 1);
        if (req.body.allowPrompt && isNegativeOrMixedScore) {
          resJournal.magnitude = analysis.magnitude;
          resJournal.visible = req.body.allowPrompt;
          // Create a prompt from negative content
          addPrompt(resJournal);
        }

        const dateOfWeek = new Date().getDay();
        thisWeekTracker(req.user.userId)
          .then((tracker) => {
            tracker.journalWritten[dateOfWeek - 1] = true;
            return db.doc(`/weeklyTrackers/${tracker.trackerId}`).set(tracker);
          })
          .then(() => {
            res.status(200).json(resJournal);
          });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ error: "Something went wrong, please try again!" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong, please try again!" });
  }
};

// delete journal
exports.deleteJournal = (req, res) => {
  const document = db.doc(`/journals/${req.params.journalId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(400).json({ error: "Journal not found!" });
      }
      if (doc.data().userId !== req.user.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      // delete all of its related prompts
      db.collection("prompts")
        .where("journalId", "==", `${req.params.journalId}`)
        .get()
        .then((docs) => {
          const batch = db.batch();
          docs.forEach((doc) => {
            batch.delete(doc.ref);
          });

          // commit the batch
          return batch.commit();
        });
    })
    .then(() => {
      res
        .status(200)
        .json({ message: "Journal has been deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Something went wrong, please try again" });
    });
};
