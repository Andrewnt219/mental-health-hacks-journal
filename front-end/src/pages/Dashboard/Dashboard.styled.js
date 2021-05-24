import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SettingWrapper = styled.div`
  background: #ecf3fa;
  color: #204553;
  display: flex;
  flex-direction: column;
  border-radius: ${(p) => p.theme.rounded.default};
  margin-bottom: ${(p) => p.theme.spacing[6]};
  width: 100%;
`;

export const SettingHeader = styled.div`
  background: #98bdfd;
  color: #204553;
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: ${(p) => p.theme.rounded.default};
  padding: ${(p) => p.theme.spacing[2]} ${(p) => p.theme.spacing[3]};
  margin-top: 0;
  margin-bottom: ${(p) => p.theme.spacing[4]};
  width: 100%;
  height: 49px;

  > svg {
    margin-right: ${(p) => p.theme.spacing[2]};
  }
`;

export const SettingBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SettingButton = styled.button`
  background: #fbfdfe;
  color: #204553;
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: ${(p) => p.theme.rounded.default};
  padding: ${(p) => p.theme.spacing[2]} ${(p) => p.theme.spacing[3]};
  margin-left: ${(p) => p.theme.spacing[3]};
  margin-right: ${(p) => p.theme.spacing[3]};
  margin-bottom: ${(p) => p.theme.spacing[3]};
  width: 94%;
  height: 42px;

  > svg {
    margin-right: ${(p) => p.theme.spacing[2]};
  }
`;

export const SectionsWrapper = styled.div`
  margin-top: ${(p) => p.theme.spacing[3]};
  margin-bottom: ${(p) => p.theme.spacing[3]};
  display: flex;

  > * + * {
    margin-top: ${(p) => p.theme.spacing[4]};
  }
`;

export const SectionTitle = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;

  ::after {
    width: 4rem;
    height: 0.5rem;
    margin-top: ${(p) => p.theme.spacing[1]};
    content: "";
    display: block;
    background: linear-gradient(
      262.83deg,
      #a9c8ff -9.45%,
      ${(p) => p.theme.colors.blue.default} 88.41%
    );
  }
`;

export const FullName = styled.h2`
  font-weight: bold;
  font-size: 1.6rem;
  color: #5d6669;
  margin-bottom: ${(p) => p.theme.spacing[2]};
  }
`;

export const Email = styled.h2`
  font-weight: 500;
  font-size: 1.2rem;
  color: #7e8689;
  margin-bottom: ${(p) => p.theme.spacing[2]};
  }
`;
