import BottomNavigation from "@material-ui/core/BottomNavigation";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as CalendarIcon } from "assets/svg/calendar-icon.svg";
import { ReactComponent as HomeIcon } from "assets/svg/home-icon.svg";
import { ReactComponent as StarIcon } from "assets/svg/star-icon.svg";
import { ReactComponent as UserIcon } from "assets/svg/user-icon.svg";
import React from "react";
import NavButton from "./ui/NavButton";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 70,
    backgroundColor: "#CBDDFF",
    position: "fixed",
    bottom: 0,
  },
});

const Navbar = () => {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.root}>
      <NavButton href="/" variant="contained" className={classes.margin}>
        <HomeIcon />
      </NavButton>

      <NavButton
        href="/entry/add"
        variant="contained"
        className={classes.margin}
      >
        <CalendarIcon />
      </NavButton>

      <NavButton href="/" variant="contained" className={classes.margin}>
        <StarIcon />
      </NavButton>

      <NavButton
        href="/user/dashboard"
        variant="contained"
        className={classes.margin}
      >
        <UserIcon />
      </NavButton>
    </BottomNavigation>
  );
};

export default Navbar;
