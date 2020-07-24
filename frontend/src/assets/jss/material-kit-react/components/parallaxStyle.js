const parallaxStyle = {
  parallax: {
    height: "90vh",
    maxHeight: "1000px",
    overflow: "hidden",
    position: "relative",
    backgroundPosition: "center center",
    backgroundSize: "cover",
<<<<<<< HEAD
    margin: "0",
    padding: "0",
    border: "0",
    display: "flex",
    alignItems: "center"
  },
  filter: {
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
=======
    margin: "0 auto",
    padding: "0",
    border: "0",
    display: "flex",
    alignItems: "center",
  },
  filter: {
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)",
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
    },
    "&:after,&:before": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
<<<<<<< HEAD
      content: "''"
    }
  },
  small: {
    height: "380px"
  }
=======
      content: "''",
    },
  },
  small: {
    height: "380px",
  },
>>>>>>> d667e454b1feeb5182297efd9845966b57287427
};

export default parallaxStyle;
