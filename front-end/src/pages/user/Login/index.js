import { ReactComponent as LoginHero } from "assets/svg/login-hero.svg";
import { ReactComponent as PasswordIcon } from "assets/svg/password.svg";
import { ReactComponent as ProfileIcon } from "assets/svg/profile.svg";
import Input from "components/Input/index";
import Link from "components/ui/Link";
import * as Typography from "components/ui/Typography";
import * as Wrapper from "components/ui/Wrapper";
import { useAuth } from "context/AuthContext";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import * as Styled from "../User.styled";

const UserLogin = () => {
  return (
    <Wrapper.Page>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <header>
        <LoginHero />

        <Typography.PageTitle>Welcome Back</Typography.PageTitle>

        <p>Glad you&apos;re back with us</p>
      </header>

      <Styled.Section>
        <LoginForm />

        <Styled.Footer>
          New here? <Link to="/user/signup">Sign up</Link>
        </Styled.Footer>
      </Styled.Section>
    </Wrapper.Page>
  );
};

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, error } = useAuth();

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    login(formData);
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Input
        required
        autocomplete="email"
        name="email"
        icon={<ProfileIcon />}
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        required
        name="password"
        autocomplete="password"
        type="password"
        icon={<PasswordIcon />}
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />
      {error ? <Styled.Error>{error}</Styled.Error> : null}
      <Styled.Button contained>Sign In</Styled.Button>
    </Styled.Form>
  );
};

export default UserLogin;
