import { makeStyles, useTheme } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  "@global": {
    "@import": "url(https://fonts.googleapis.com/css?family=Montserrat)",
    body: {
      position: "relative",
      width: "100%",
      height: "100vh",
      fontFamily: "Montserrat",
    },
    "@keyframes bounce": {
      "0%": {
        top: "30px",
        height: "5px",
        borderRadius: "60px 60px 20px 20px",
        transform: "scaleX(2)",
      },
      "35%": {
        height: "15px",
        borderRadius: "50%",
        transform: "scaleX(1)",
      },
      "100%": {
        top: 0,
      },
    },
  },
  wrap: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  text: {
    color: `${theme.palette.text.secondary}`,
    display: "inline-block",
    marginLeft: "5px",
  },
  bounceball: {
    position: "relative",
    display: "inline-block",
    height: "37px",
    width: "15px",
    "&:before": {
      position: "absolute",
      content: '""',
      display: "block",
      top: 0,
      width: "15px",
      height: "15px",
      borderRadius: "50%",
      backgroundColor: `${theme.palette.primary.main}`,
      transformOrigin: "50%",
      animation: "$bounce 500ms alternate infinite ease",
    },
  },
  "@keyframes bounce": {
    "0%": {
      top: "30px",
      height: "5px",
      borderRadius: "60px 60px 20px 20px",
      transform: "scaleX(2)",
    },
    "35%": {
      height: "15px",
      borderRadius: "50%",
      transform: "scaleX(1)",
    },
    "100%": {
      top: 0,
    },
  },
}));

export default function Loader() {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.wrap}>
      <div className={classes.bounceball}></div>
      <span className={classes.text}>Edia Loading...</span>
    </div>
  );
}
