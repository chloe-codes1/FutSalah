import { container } from "assets/jss/material-kit-react.js";
import { defaultFont } from "assets/jss/material-kit-react.js";

const AdminStyle = {
  container: {
    ...container,
    paddingTop: 100,
    color: "white",
    zIndex: 2,
    textAlign: "center",
  },
  adminInfo: {
    position: "relative",
    display: "inline-block",
  },
};
export default AdminStyle;
