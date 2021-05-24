import { Link as RRLink } from "react-router-dom";
import styled from "styled-components";

const Link = styled(RRLink)`
  font-weight: 500;
  color: ${(p) => p.theme.colors.blue.default} !important;
  text-decoration: none;
`;

export default Link;
