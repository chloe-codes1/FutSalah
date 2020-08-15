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
  list: {
    ...defaultFont,
    fontSize: "14px",
    margin: 0,
    paddingLeft: "0",
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
  },
  leftListItem: {
    position: "relative",
    display: "inline-block",
    width: "auto",
    marginRight: "10%",
    padding: "0",
    textAlign: "center",
  },
  rightListItem: {
    position: "relative",
    display: "inline-block",
    width: "auto",
    marginLeft: "10%",
    padding: "0",
    textAlign: "center",
  },
  centerListItem: {
    position: "relative",
    display: "inline-block",
    width: "auto",
    margin: "0",
    padding: "0",
    textAlign: "center",
  },
  arriveInfoContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0",
  },
  // arriveInfo: {
  //   position: "relative",
  //   display: "inline-block",
  // },
  // arriveContents: {
  //   position: "relative",
  //   display: "inline-block",
  // },
  // arriveContent: {
  //   position: "relative",
  //   display: "inline-block",
  //   padding: "0",
  //   margin: "0",
  // },
  // arriveContentTeam: {
  //   position: "relative",
  //   display: "inline-block",
  //   padding: "0",
  //   margin: "0",
  // },
  // arriveContentTime: {
  //   position: "relative",
  //   display: "inline-block",
  //   padding: "0",
  //   margin: "0",
  // },
  bottomButtonSet: {
    justifyContent: "center",
  },
  bottomButton: {
    margin: "5px",
  },
};
export default AdminMatchInfoStyle;
