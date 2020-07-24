import {
  container,
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  transition,
  boxShadow,
<<<<<<< HEAD
  drawerWidth
=======
  drawerWidth,
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
} from "assets/jss/material-kit-react.js";

const headerStyle = {
  appBar: {
    display: "flex",
    border: "0",
    borderRadius: "3px",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    width: "100%",
    backgroundColor: "#fff",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
<<<<<<< HEAD
    zIndex: "unset"
  },
  absolute: {
    position: "absolute",
    zIndex: "1100"
  },
  fixed: {
    position: "fixed",
    zIndex: "1100"
  },
  container: {
    ...container,
=======
    zIndex: "unset",
  },
  absolute: {
    position: "absolute",
    zIndex: "1100",
  },
  fixed: {
    position: "fixed",
    zIndex: "1100",
  },
  container: {
    ...container,
    "@media (min-width: 1200px)": {
      maxWidth: "1400px",
    },
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
    minHeight: "50px",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
<<<<<<< HEAD
    flexWrap: "nowrap"
  },
  flex: {
    flex: 1
=======
    flexWrap: "nowrap",
  },
  flex: {
    flex: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover,&:focus": {
      color: "inherit",
    },
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    padding: "8px 16px",
    letterSpacing: "unset",
    "&:hover,&:focus": {
      color: "inherit",
<<<<<<< HEAD
      background: "transparent"
    }
  },
  appResponsive: {
    margin: "20px 10px"
=======
      background: "transparent",
    },
  },
  appResponsive: {
    margin: "20px 10px",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    boxShadow:
<<<<<<< HEAD
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(156, 39, 176, 0.46)"
=======
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(156, 39, 176, 0.46)",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    boxShadow:
<<<<<<< HEAD
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(0, 188, 212, 0.46)"
=======
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(0, 188, 212, 0.46)",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    boxShadow:
<<<<<<< HEAD
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(76, 175, 80, 0.46)"
=======
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(76, 175, 80, 0.46)",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    boxShadow:
<<<<<<< HEAD
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(255, 152, 0, 0.46)"
=======
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(255, 152, 0, 0.46)",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    boxShadow:
<<<<<<< HEAD
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(244, 67, 54, 0.46)"
=======
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(244, 67, 54, 0.46)",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  rose: {
    backgroundColor: roseColor,
    color: "#FFFFFF",
    boxShadow:
<<<<<<< HEAD
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)"
=======
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    paddingTop: "25px",
<<<<<<< HEAD
    color: "#FFFFFF"
=======
    color: "#FFFFFF",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  dark: {
    color: "#FFFFFF",
    backgroundColor: "#212121 !important",
    boxShadow:
<<<<<<< HEAD
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)"
=======
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  white: {
    border: "0",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    backgroundColor: "#fff !important",
    boxShadow:
<<<<<<< HEAD
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"
=======
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: drawerWidth,
    ...boxShadow,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
<<<<<<< HEAD
    ...transition
  }
=======
    ...transition,
  },
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
};

export default headerStyle;
