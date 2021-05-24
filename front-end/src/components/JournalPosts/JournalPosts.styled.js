import styled from "styled-components";

export const SectionWrapper = styled.div`
  background: #fff5e8;
  color: #204553;
  border: 2px solid;
  border-color: rgba(255, 176, 84, 0.4);
  border-radius: ${(p) => p.theme.rounded.default};
  display: flex;
  margin-bottom: ${(p) => p.theme.spacing[2]};
  width: 100%;
  height: 60px;
`;

export const ContentWrapper = styled.div`
  color: #797877;
  justify-content: left;
  align-items: center;
  border-radius: 6px;
  padding: ${(p) => p.theme.spacing[2]} ${(p) => p.theme.spacing[3]};
  padding-left: 0;
  margin: auto ${(p) => p.theme.spacing[2]};
  margin-left: 0;
  line-height: 1.3em;
`;

export const DateWrapper = styled.div`
  background: #ffcd93;
  color: #4d6060;
  font-weight: bold;
  font-size: 0.8em;
  justify-content: left;
  align-items: center;
  border-radius: ${(p) => p.theme.rounded.default};
  padding: 7px;
  margin: ${(p) => p.theme.spacing[2]} ${(p) => p.theme.spacing[3]};
  width: 39px;
  height: 39px;
`;
