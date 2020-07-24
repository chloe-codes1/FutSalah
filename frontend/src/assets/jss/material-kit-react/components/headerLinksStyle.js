import { defaultFont } from "assets/jss/material-kit-react.js";

import tooltip from "assets/jss/material-kit-react/tooltipsStyle.js";

<<<<<<< HEAD
const headerLinksStyle = theme => ({
=======
const headerLinksStyle = (theme) => ({
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  list: {
    ...defaultFont,
    fontSize: "14px",
    margin: 0,
    paddingLeft: "0",
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
<<<<<<< HEAD
    color: "inherit"
=======
    color: "inherit",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  listItem: {
    float: "left",
    color: "inherit",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:after": {
        width: "calc(100% - 30px)",
        content: '""',
        display: "block",
        height: "1px",
        marginLeft: "15px",
<<<<<<< HEAD
        backgroundColor: "#e5e5e5"
      }
    }
  },
  listItemText: {
    padding: "0 !important"
=======
        backgroundColor: "#e5e5e5",
      },
    },
  },
  listItemText: {
    padding: "0 !important",
  },
  ButtonNavLink: {
    width: "20px",
    marginRight: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "30%",
      marginLeft: "30px",
      marginBottom: "8px",
      marginTop: "8px",
      textAlign: "center",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover,&:focus": {
      color: "inherit",
    },
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  navLink: {
    color: "inherit",
    position: "relative",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    "&:hover,&:focus": {
      color: "inherit",
<<<<<<< HEAD
      background: "rgba(200, 200, 200, 0.2)"
=======
      background: "rgba(200, 200, 200, 0.2)",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
    },
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 30px)",
      marginLeft: "15px",
      marginBottom: "8px",
      marginTop: "8px",
      textAlign: "left",
      "& > span:first-child": {
<<<<<<< HEAD
        justifyContent: "flex-start"
      }
    }
=======
        justifyContent: "flex-start",
      },
    },
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  notificationNavLink: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
<<<<<<< HEAD
    top: "4px"
  },
  registerNavLink: {
    top: "3px",
=======
    top: "4px",
  },
  loginNavLink: {
    padding: "10% 50%",
    top: "20%",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
    position: "relative",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
<<<<<<< HEAD
    display: "inline-flex"
  },
  navLinkActive: {
    color: "inherit",
    backgroundColor: "rgba(255, 255, 255, 0.1)"
=======
    display: "inline-flex",
  },
  navLinkActive: {
    color: "inherit",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  icons: {
    width: "20px",
    height: "20px",
<<<<<<< HEAD
    marginRight: "3px"
=======
    marginRight: "3px",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  socialIcons: {
    position: "relative",
    fontSize: "20px !important",
<<<<<<< HEAD
    marginRight: "4px"
=======
    marginRight: "4px",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  dropdownLink: {
    "&,&:hover,&:focus": {
      color: "inherit",
      textDecoration: "none",
      display: "block",
<<<<<<< HEAD
      padding: "10px 20px"
    }
  },
  ...tooltip,
  marginRight5: {
    marginRight: "5px"
  }
=======
      padding: "10px 20px",
    },
  },
  ...tooltip,
  marginRight5: {
    marginRight: "5px",
  },
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
});

export default headerLinksStyle;
