import {
  roseColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
} from "assets/jss/material-kit-react.js";

const navPillsStyle = (theme) => ({
  root: {
    marginTop: "20px",
    paddingLeft: "0",
    marginBottom: "0",
    overflow: "visible !important",
    lineHeight: "24px",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "500",
    position: "relative",
    display: "block",
    color: "inherit",
    opacity: "0.9",
  },
  flexContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
  displayNone: {
    display: "none !important",
  },
  fixed: {
    overflow: "visible !important",
  },
  horizontalDisplay: {
    display: "block",
  },
  pills: {
    float: "left",
    position: "relative",
    display: "block",
    minWidth: "20%",
    maxWidth: "100%",
    textAlign: "center",
    transition: "all .3s",
    padding: "10px 15px",
    color: "white",
    height: "auto",
    opacity: "1",
    margin: "0 5px",
    fontSize: 20,
  },
  pillsWithIcons: {
    borderRadius: "4px",
  },
  tabIcon: {
    width: "30px",
    height: "30px",
    display: "block",
    margin: "15px 0 !important",
    "&, & *": {
      letterSpacing: "normal !important",
    },
  },
  horizontalPills: {
    minWidth: "100%",
    width: "100%",
    float: "none !important",
  },
  contentWrapper: {
    marginTop: "20px",
  },
  primary: {
    "&,&:hover": {
      color: "#FFFFFF",
      backgroundColor: primaryColor,
      boxShadow:
        "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(156, 39, 176, 0.4)",
    },
  },
  info: {
    "&,&:hover": {
      color: "#FFFFFF",
      backgroundColor: infoColor,
      boxShadow:
        "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(76, 175, 80, 0.4)",
    },
  },
  success: {
    "&,&:hover": {
      color: "#FFFFFF",
      backgroundColor: successColor,
      boxShadow:
        "0 2px 2px 0 rgba(76, 175, 80, 0.14), 0 3px 1px -2px rgba(76, 175, 80, 0.2), 0 1px 5px 0 rgba(76, 175, 80, 0.12)",
    },
  },
  warning: {
    "&,&:hover": {
      color: "#FFFFFF",
      backgroundColor: warningColor,
      boxShadow:
        "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4)",
    },
  },
  danger: {
    "&,&:hover": {
      color: "#FFFFFF",
      backgroundColor: dangerColor,
      boxShadow:
        "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4)",
    },
  },
  rose: {
    "&,&:hover": {
      color: "#FFFFFF",
      backgroundColor: roseColor,
      boxShadow:
        "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)",
    },
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabWrapper: {
    color: "inherit",
    position: "relative",
    fontSize: "12px",
    lineHeight: "24px",
    fontWeight: "500",
    textTransform: "uppercase",
    "&,& *": {
      letterSpacing: "normal",
    },
  },
});

export default navPillsStyle;
