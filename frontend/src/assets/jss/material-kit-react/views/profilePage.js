import { container, title } from "assets/jss/material-kit-react.js";
<<<<<<< HEAD
=======
import { defaultFont } from "assets/jss/material-kit-react.js";
>>>>>>> d667e454b1feeb5182297efd9845966b57287427

import imagesStyle from "assets/jss/material-kit-react/imagesStyles.js";

const profilePageStyle = {
  container,
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
<<<<<<< HEAD
      transform: "translate3d(0, -50%, 0)"
    }
=======
      transform: "translate3d(0, -50%, 0)",
    },
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
<<<<<<< HEAD
    textAlign: "center !important"
  },
  name: {
    marginTop: "-80px"
  },
  ...imagesStyle,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
=======
    textAlign: "center !important",
  },
  name: {
    marginTop: "-80px",
  },
  ...imagesStyle,
  main: {
    margin: "0 auto",
    width: "60%",
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px auto 0px auto",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
<<<<<<< HEAD
    textDecoration: "none"
=======
    textDecoration: "none",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
<<<<<<< HEAD
    color: "#999"
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center"
  }
=======
    color: "#999",
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center",
  },
  buttonTitle: {
    ...defaultFont,
    textAlign: "left",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "1.42857",
    letterSpacing: "unset",
    "& + $underline": {
      marginTop: "0px",
    },
  },
  buttonList: {
    margin: "0 2%",
    opacity: 0.5,
    "&:hover": {
      opacity: 1,
    },
  },
  withdrawal: {
    margin: "20px auto 50px auto",
    textAlign: "right",
  },
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
};

export default profilePageStyle;
