import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const StyledNavButton = withStyles({
  root: {
    boxShadow: "none",
    border: "1.2px solid",
    borderRadius: "11px",
    backgroundColor: "#CBDDFF",
    borderColor: "#FFFFFF",
    margin: "auto 4vw",
    width: "49px",
    height: "49px",
    disableRipple: true,
    "&:hover": {
      backgroundColor: "#FFFFFF",
      borderColor: "#5F99FF",
      border: "1.2px solid",
      borderRadius: "11px",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#FFFFFF",
      borderColor: "#5F99FF",
      border: "1.2px solid",
      borderRadius: "11px",
    },
    "&:focus": {
      boxShadow: "none",
      backgroundColor: "#FFFFFF",
      borderColor: "#5F99FF",
      border: "1.2px solid",
      borderRadius: "11px",
    },
  },
})(Button);

function NavButton({ href, children }) {
  return (
    <StyledNavButton>
      <Link to={href}>{children}</Link>
    </StyledNavButton>
  );
}

export default NavButton;
