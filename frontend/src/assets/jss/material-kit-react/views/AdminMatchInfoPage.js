import { container } from "assets/jss/material-kit-react.js";
import { defaultFont } from "assets/jss/material-kit-react.js";

const AdminMatchInfoStyle = {
  container: {
    ...container,
    paddingTop: 100,
    color: "white",
    zIndex: 2,
    textAlign: "center",
  },
  matchInfoContainer: {
    marginBottom: 0,
    padding: 0,
  },
  matchInfoContent: {
    display: "inline-block",
  },
  // list: {
  //   ...defaultFont,
  //   fontSize: "14px",
  //   margin: 0,
  //   paddingLeft: "0",
  //   listStyle: "none",
  //   paddingTop: "0",
  //   paddingBottom: "0",
  // },
  // leftListItem: {
  //   position: "relative",
  //   display: "inline-block",
  //   width: "auto",
  //   marginRight: "10%",
  //   padding: "0",
  //   textAlign: "center",
  // },
  // rightListItem: {
  //   position: "relative",
  //   display: "inline-block",
  //   width: "auto",
  //   marginLeft: "10%",
  //   padding: "0",
  //   textAlign: "center",
  // },
  // centerListItem: {
  //   position: "relative",
  //   display: "inline-block",
  //   width: "auto",
  //   margin: "0",
  //   padding: "0",
  //   textAlign: "center",
  // },
  arriveInfoContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    margin: "30px 0 0 0",
    padding: "0",
  },
  bottomButtonSet: {
    justifyContent: "center",
  },
  bottomButton: {
    margin: "5px",
  },
};
export default AdminMatchInfoStyle;
