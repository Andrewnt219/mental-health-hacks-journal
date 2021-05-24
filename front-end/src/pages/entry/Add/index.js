import { fireStoreApi } from "api/firestore-api";
import { ReactComponent as ArrowRight } from "assets/svg/arrow-right.svg";
import { ReactComponent as ArrrowLeftButton } from "assets/svg/arrrow-left-button.svg";
import { ReactComponent as Checkmark } from "assets/svg/checkmark.svg";
import Layout from "components/Layout";
import MoodPickerRow, { emojiLookup } from "components/MoodPickerRow";
import Button from "components/ui/Button";
import * as Typography from "components/ui/Typography";
import { useAuth } from "context/AuthContext";
import dayjs from "dayjs";
import React, { useEffect, useReducer, useState } from "react";
import * as Styled from "./Add.styled";

const reducer = (state, action) => {
  switch (action.type) {
    case "GO_BACK":
      let previousStep = 1;

      if (state.currentStep < 3 && state.currentStep > 0) {
        previousStep = state.currentStep - 1;
      }

      return { ...state, currentStep: previousStep };

    case "SELECT_MOOD":
      return { ...state, moodStatus: action.payload, currentStep: 2 };

    case "SUBMIT_ENTRY":
      return { ...state, ...action.payload, currentStep: 3 };

    default:
      throw new Error("Invalid action");
  }
};

const initialState = {
  currentStep: 1,
  title: "",
  content: "",
  isPublished: false,
  moodStatus: "",
};

const EntryAddPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentStep } = state;
  const { token } = useAuth();

  const onMoodSelected = (mood) =>
    dispatch({ type: "SELECT_MOOD", payload: mood });

  const onEntrySubmitted = async (formData) =>
    dispatch({ type: "SUBMIT_ENTRY", payload: formData });

  useEffect(() => {
    if (state.currentStep === 3) {
      fireStoreApi.post("/journals/addJournal", { ...state, userId: token });
    }
  }, [state, token]);

  let view = null;
  switch (currentStep) {
    case 2:
      view = <EditorView onFormSubmitted={onEntrySubmitted} />;

      break;

    case 3:
      view = (
        <SubmitConfirmView
          selectedMood={state.moodStatus}
          isPublished={state.isPublished}
        />
      );
      break;

    case 1:
    default:
      view = <ChooseMoodView onFormSubmitted={onMoodSelected} />;

      break;
  }

  return (
    <Layout>
      <Styled.PageWrapper>
        <Styled.Header>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button onClick={() => dispatch({ type: "GO_BACK" })}>
              <ArrowRight />
            </Button>

            <Typography.Title style={{ marginLeft: "1rem" }}>
              {currentStep === 3 ? "Entry Saved" : "New Entry"}
            </Typography.Title>
          </div>

          <Styled.Date>{dayjs().format("MM.DD.YYYY")}</Styled.Date>
        </Styled.Header>

        <Styled.BodyWrapper>{view}</Styled.BodyWrapper>
      </Styled.PageWrapper>
    </Layout>
  );
};

function ChooseMoodView({ onFormSubmitted }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onFormSubmitted?.(selectedMood);
  };

  return (
    <Styled.MoodPickWrapper onSubmit={handleSubmit}>
      <Typography.SectionTitle>Choose your Mood</Typography.SectionTitle>
      <MoodPickerRow onClick={(mood) => setSelectedMood(mood)} />

      <button
        type="submit"
        style={{ marginTop: "4.2rem", background: "transparent" }}
      >
        <ArrrowLeftButton />
      </button>
    </Styled.MoodPickWrapper>
  );
}

function EditorView({ onFormSubmitted }) {
  const [formData, setFormData] = useState({});

  const handleChange = (ev) => {
    const { target } = ev;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onFormSubmitted?.(formData);
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Typography.SectionTitleUnderline as="label">
        <Styled.TitleInput
          type="text"
          value={formData.title}
          placeholder="Catchy Title Here"
          onChange={handleChange}
          name="title"
        />
      </Typography.SectionTitleUnderline>

      <Styled.TextArea
        rows={15}
        value={formData.content}
        onChange={handleChange}
        name="content"
      />

      <label>
        <input
          type="checkbox"
          name="isPublished"
          checked={formData.isPublished}
          onChange={handleChange}
        />
        Publish anonymously to community
      </label>

      <Button contained>Save</Button>
    </Styled.Form>
  );
}

function SubmitConfirmView({ selectedMood, isPublished }) {
  return (
    <Styled.SubmitWrapper>
      <Styled.EmojiWrapper>{emojiLookup(selectedMood)}</Styled.EmojiWrapper>
      <Styled.SubmitButton contained>
        <Checkmark />
        <span>
          {isPublished
            ? "Anonymous Posting successful"
            : "Your memory is stored"}
        </span>
      </Styled.SubmitButton>

      <Styled.Link to="/" style={{ color: "rgba(224, 121, 0, 0.6)" }}>
        Go back to Home
      </Styled.Link>
    </Styled.SubmitWrapper>
  );
}

export default EntryAddPage;
