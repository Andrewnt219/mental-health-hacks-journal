import { fireStoreApi } from "api/firestore-api";
import { ReactComponent as ArrowRight } from "assets/svg/arrow-right.svg";
import Layout from "components/Layout";
import Button from "components/ui/Button";
import * as Typography from "components/ui/Typography";
import { useAuth } from "context/AuthContext";
import dayjs from "dayjs";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as Styled from "./Add/Add.styled";

const EntryPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { journalId } = queryString.parse(location.search);
  const [journal, setJournal] = useState(undefined);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (journalId) {
      fireStoreApi
        .get(`/journals/getOneJournal?journalId=${journalId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setJournal(res.data))
        .catch((err) => {
          setJournal(null);
          setError(err.response?.data.error);
        });
    } else {
      setJournal(null);
    }
  }, [journalId, token]);

  if (journal === undefined) {
    return <h1>Fetching...</h1>;
  }

  return (
    <Layout>
      <Styled.PageWrapper
        style={{ backgroundColor: "#fffaf5", height: "auto" }}
      >
        {error && <h1>{error}</h1>}
        {journal && (
          <>
            <Styled.Header>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button onClick={() => history.push("/user/dashboard")}>
                  <ArrowRight />
                </Button>
              </div>
              <Typography.Title style={{ marginLeft: "1rem" }}>
                {dayjs(journal.dateCreated).format("MM.DD.YYYY")}
              </Typography.Title>
            </Styled.Header>
            <Typography.SectionTitleUnderline style={{ marginLeft: "5%" }}>
              Catchy Title Here
            </Typography.SectionTitleUnderline>
            <Styled.ContentWrapper>{journal.content}</Styled.ContentWrapper>
          </>
        )}
      </Styled.PageWrapper>
    </Layout>
  );
};

export default EntryPage;
