import { container } from "assets/jss/material-kit-react.js";
import { defaultFont } from "assets/jss/material-kit-react.js";
import popoverStyles from "assets/jss/material-kit-react/popoverStyles.js";
import tooltipsStyle from "assets/jss/material-kit-react/tooltipsStyle.js";

const teamInfoStyle = {
  ...tooltipsStyle,
  ...popoverStyles,
  container: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "80%",
    paddingTop: "120px",
    paddingBottom: "120px",
    color: "white",
    zIndex: 2,
  },
  list: {
    ...defaultFont,
    fontSize: "14px",
    margin: 0,
    paddingLeft: "0",
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
    color: "inherit",
  },
  listItem: {
    float: "left",
    color: "inherit",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0",
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    //   "&:after": {
    //     width: "calc(100% - 30px)",
    //     content: '""',
    //     display: "block",
    //     height: "1px",
    //     marginLeft: "15px",
    //     backgroundColor: "#e5e5e5",
    //   },
    // },
  },
  button: {
    opacity: "0.6",
    boxShadow: "none",
    "&:hover,&:focus": {
      boxShadow: "none",
    },
  },
  selected: {
    boxShadow: "none",
    "&:hover,&:focus": {
      boxShadow: "none",
    },
  },
  formation: {
    margin: "auto",
    width: "90%",
    height: "300px",
    backgroundColor: "white",
    // border: "2px solid #FF9800",
  },
  hiddenTable: {
    display: "none",
  },
  hiddenRecord: {
    display: "none",
  },
  title: {
    marginTop: "4%",
    display: "flex",
    lineHeight: "100%",
    marginBottom: "0",
  },
  logo: {
    borderRadius: "70%",
    width: "85px",
    height: "85px",
    margin: "auto 0 auto 5%",
  },
  modifyButton: {
    margin: "auto 1%",
    height: "40px",
  },
  table: {
    maxWidth: "100%",
    backgroundColor: "white",
    color: "white",
    height: "350px",
    overflow: "auto",
    borderRadius: "5px",
  },
  memberImg: {
    borderRadius: "70%",
    width: "50px",
    height: "50px",
    margin: "auto 0 auto 5%",
    // border: "4px solid black",
  },
  formation: {
    minHeight: "500px",
  },
  management: {
    minHeight: "500px",
  },
};

export default teamInfoStyle;
