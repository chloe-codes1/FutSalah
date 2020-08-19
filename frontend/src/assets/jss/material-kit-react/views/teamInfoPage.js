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
  infoContainer: {
    backgroundColor: "rgba( 17, 18, 26, 0.8 )",
    borderRadius: "15px",
    minHeight: "700px",
  },
  teamRegion: {
    height: "40px",
    fontSize: "1.2rem",
  },
  teamName: {
    height: "40px",
    fontSize: "2rem",
    fontWeight: 600,
    cursor: "pointer",
    "@media (max-width: 960px)": {
      width: "100%",
    },
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
    width: "90%",
    minHeight: "500px",
  },
  hiddenTable: {
    display: "none",
  },
  hiddenRecord: {
    display: "none",
  },
  header: {
    marginTop: "4%",
    display: "flex",
    lineHeight: "100%",
    marginBottom: "0",
    whiteSpace: "nowrap",
    overflow: "hidden",
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
    fontSize: "1rem",
    fontWeight: 500,
  },
  removeButton: {
    width: "5vw",
    "@media (max-width: 960px)": {
      width: "10vw",
    },
  },
  table: {
    maxWidth: "100%",
    backgroundColor: "#edf2f4",
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
    backgroundColor: "#edf2f4",
  },
  management: {
    minHeight: "500px",
  },
};

export default teamInfoStyle;
