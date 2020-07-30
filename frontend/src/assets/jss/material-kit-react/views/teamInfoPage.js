import { container } from "assets/jss/material-kit-react.js";
import { defaultFont } from "assets/jss/material-kit-react.js";
import { Table } from "@material-ui/core";

const teamInfoStyle = {
  container: {
    ...container,
    paddingTop: 100,
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
  },
  listItem: {
    float: "left",
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
    opacity: "0.5",
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
    width: "80%",
    height: "300px",
    backgroundColor: "white",
  },
  table: {
    backgroundColor: "white",
  },
  hiddenTable: {
    display: "none",
  },
  record: {
    marginTop: "50px",
  },
  hiddenRecord: {
    display: "none",
  },
};

export default teamInfoStyle;
