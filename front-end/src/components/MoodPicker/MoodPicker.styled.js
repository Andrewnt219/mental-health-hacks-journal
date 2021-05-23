import { ReactComponent as AvatarIcon } from "assets/svg/avatar.svg";
import styled from "styled-components";
export const Wrapper = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  border-radius: 50%;
  overflow: hidden;
  height: 20rem;
  width: 20rem;

  & > button:nth-child(odd) {
    justify-content: flex-end;
  }
`;

export const MoodButton = styled.button`
  display: flex;
  background: ${(p) => p.theme.colors.blue[100]};
  padding: 2rem;
`;

export const Avatar = styled(AvatarIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
