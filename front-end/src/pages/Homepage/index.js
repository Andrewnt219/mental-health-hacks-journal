import { ReactComponent as BellIcon } from "assets/svg/bell-icon.svg";
import { ReactComponent as EditIcon } from "assets/svg/edit-icon.svg";
import { ReactComponent as PencilButton } from "assets/svg/pencil-button.svg";
import Layout from "components/Layout";
import JournalPosts from "components/JournalPosts";
import MoodPicker from "components/MoodPicker";
import * as Typography from "components/ui/Typography";
import * as Wrapper from "components/ui/Wrapper";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import * as Styled from "./Homepage.styled";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const history = useHistory();
  return (
    <Layout>
      <Helmet>
        <title>Homepage</title>
      </Helmet>

      <Wrapper.Page>
        <Styled.Header>
          <div>
            <p>Welcome to</p>
            <Typography.PageTitle>Zaved’s Journal</Typography.PageTitle>
          </div>

          <BellIcon />
        </Styled.Header>

        <Styled.SectionsWrapper>
          <section>
            <Styled.SectionBody>
              <Link to="/entry/add">
                <Styled.EditButton>
                  <EditIcon />
                  How are you feeling today?
                </Styled.EditButton>
              </Link>
            </Styled.SectionBody>
          </section>
        </Styled.SectionsWrapper>

        <Styled.SectionBody style={{ flexDirection: "row" }}>
          <MoodPicker />
          <PencilButton
            style={{ marginLeft: "10%" }}
            onClick={() => history.push("/entry/add")}
          />
        </Styled.SectionBody>

        <Styled.SectionsWrapper
          style={{ display: "flex", flexDirection: "column" }}
        >
          <section>

            <Typography.SectionTitleUnderline>
              Your Journals
            </Typography.SectionTitleUnderline>
          </section>

          <section>
            <JournalPosts />
          </section>
        </Styled.SectionsWrapper>
      </Wrapper.Page>
    </Layout>
  );
};

export default Homepage;
