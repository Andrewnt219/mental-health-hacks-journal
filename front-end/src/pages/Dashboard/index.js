import { ReactComponent as SettingIcon } from "assets/svg/setting-icon.svg";
import JournalPosts from "components/JournalPosts";
import Layout from "components/Layout";
import MoodChart from "components/MoodChart";
import * as Typography from "components/ui/Typography";
import * as Wrapper from "components/ui/Wrapper";
import { useAuth } from "context/AuthContext";
import React from "react";
import { Helmet } from "react-helmet";
import ProfilePicture from "../../assets/profile-picture.png";
import * as Styled from "./Dashboard.styled";

const Dashboard = (props) => {
  const { logout } = useAuth();

  return (
    <Layout>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Wrapper.Page>
        <Styled.Header>
          <Typography.PageTitle>DashBoard</Typography.PageTitle>
        </Styled.Header>

        <Styled.SectionsWrapper>
          <section>
            <img src={ProfilePicture} alt="profile" />
          </section>
          <section>
            <Styled.FullName>Zaved Nair</Styled.FullName>
            <Styled.Email>junbinjaved@gmail.com</Styled.Email>
          </section>
        </Styled.SectionsWrapper>

        <Styled.SectionsWrapper style={{ flexDirection: "column" }}>
          <section>
            <Typography.SectionTitleUnderline>
              Your Mood Chart
            </Typography.SectionTitleUnderline>
          </section>

          <section>
            <MoodChart />
          </section>
        </Styled.SectionsWrapper>

        <Styled.SettingWrapper>
          <section>
            <Styled.SettingHeader>
              <SettingIcon />
              Account Settings
            </Styled.SettingHeader>
          </section>
          <section>
            <Styled.SettingBody>
              <Styled.SettingButton>Account Details</Styled.SettingButton>
              <Styled.SettingButton onClick={logout}>
                Log Out
              </Styled.SettingButton>
            </Styled.SettingBody>
          </section>
        </Styled.SettingWrapper>
      </Wrapper.Page>
    </Layout>
  );
};

export default Dashboard;
