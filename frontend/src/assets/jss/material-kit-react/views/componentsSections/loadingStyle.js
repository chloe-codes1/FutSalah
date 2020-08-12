const loadingStyle = {
  soccer: {
    marginTop: "200px",
    background:
      "url(http://upload.wikimedia.org/wikipedia/en/e/ec/Soccer_ball.svg)",
    backgroundSize: "100px 100px",
    height: "100px",
    width: "100px",
    position: "relative",
    animation: `$roll 4.5s infinite`,
  },

  "@keyframes roll": {
    "0%": { left: "0px", transform: "rotate(-360deg)" },
    "50%": { left: "90%", transform: "rotate(360deg)" },
    "100%": { left: "0px", transform: "rotate(-360deg)" },
  },
};

export default loadingStyle;
