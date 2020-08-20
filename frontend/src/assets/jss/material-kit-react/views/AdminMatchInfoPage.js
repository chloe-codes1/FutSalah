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
    marginBottom: "0",
  },
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
