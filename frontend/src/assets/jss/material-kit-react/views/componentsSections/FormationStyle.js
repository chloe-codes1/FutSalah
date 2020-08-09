import image from "assets/img/backgroundFormation.jpg";

const FormationStyle = {
  formation: {
    margin: 0,
    width: "100%",
    height: "49.5vw",
    backgroundImage: `url(${image})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundColor: "green",
    // border: "2px solid white",
    "@media (min-width: 960px)": {
      maxWidth: "960px",
      height: "24.2vw",
    },
  },
};

export default FormationStyle;
