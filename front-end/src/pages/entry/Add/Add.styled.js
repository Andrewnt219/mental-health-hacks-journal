import Button from "components/ui/Button";
import * as Wrapper from "components/ui/Wrapper";
import { Link as BaseLink } from "react-router-dom";
import styled from "styled-components";

export const BodyWrapper = styled.section`
  height: 100%;
  margin-top: ${(p) => p.theme.spacing[5]};
`;

export const MoodPickWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.8rem;
`;

export const Date = styled.time`
  background-color: #fff7ee;
  padding: ${(p) => p.theme.spacing[2]} ${(p) => p.theme.spacing[4]};
  border-radius: ${(p) => p.theme.rounded.default};
  color: (10, 10, 10, 0.6);
  font-weight: 500;
`;

export const PageWrapper = styled(Wrapper.Page)`
  padding-top: ${(p) => p.theme.spacing[4]};
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: ${(p) => p.theme.spacing[3]};
  }
`;
export const TextArea = styled.textarea`
  background-color: rgba(255, 192, 118, 0.2);
  border: none;
  resize: none;
  border-radius: ${(p) => p.theme.rounded.default};
  color: #5f5e5e;
  padding: ${(p) => p.theme.spacing[4]};
`;

export const TitleInput = styled.input`
  border: none;
  padding: 0;
`;

export const CheckboxLabel = styled.input`
  display: flex;
  align-items: center;
`;

export const EmojiWrapper = styled.div`
  background: #afccff;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 12rem;
    height: 12rem;
  }
`;

export const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.2rem;
`;

export const SubmitButton = styled(Button)`
  padding: 1.3rem 1.8rem;
  border-radius: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4.8rem;

  & > * + * {
    display: block;
    margin-left: 0.8rem;
  }
`;

export const Link = styled(BaseLink)`
  margin-top: 1.7rem;
  font-weight: 600;
`;

// Entry Styles

export const ContentWrapper = styled.section`
  height: auto;
  line-height: 1.5em;
  margin: 0 5%;
  margin-top: ${(p) => p.theme.spacing[5]};
  margin-bottom: ${(p) => p.theme.spacing[6]};
`;
