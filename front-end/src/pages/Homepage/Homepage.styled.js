import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SectionsWrapper = styled.div`
  margin-top: ${(p) => p.theme.spacing[3]};
  margin-bottom: ${(p) => p.theme.spacing[3]};

  > * + * {
    margin-top: ${(p) => p.theme.spacing[2]};
  }
`;

export const EditButton = styled.button`
  background: #ffc076;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(p) => p.theme.rounded.default};
  padding: ${(p) => p.theme.spacing[2]} ${(p) => p.theme.spacing[3]};
  margin-left: ${(p) => p.theme.spacing[2]};
  margin-bottom: ${(p) => p.theme.spacing[3]};
  width: 100%;

  > svg {
    margin-right: ${(p) => p.theme.spacing[2]};
  }
`;

export const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(p) => p.theme.spacing[4]};
`;
