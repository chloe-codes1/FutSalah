import { container } from "assets/jss/material-kit-react.js";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

const SearchTeamPageStyle = {
  container: {
    zIndex: "2",
    top: "180px",
    position: "relative",
    color: "#FFFFFF",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    ...container,
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  background: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.7)",
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""',
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF",
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
    },
  },
  cardHeader: {
    width: "50%",
    textAlign: "center",
    margin: "0 auto",
    padding: "20px 0",
    marginBottom: "15px",
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important",
  },
  cardBody: {
    height: "50%",
  },
  img: {
    width: "120px",
    height: "auto",
    overflow: "hidden",
    // borderTopLeftRadius: "calc(.25rem - 1px)",
    // borderTopRightRadius: "calc(.25rem - 1px)",
  },
  ...imagesStyles,
};

export default SearchTeamPageStyle;
