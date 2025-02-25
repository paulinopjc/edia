import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

const Wrap = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const BounceBall = styled("div")(({ theme }) => ({
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
    backgroundColor: theme.palette.primary.main,
    transformOrigin: "50%",
    animation: "bounce 500ms alternate infinite ease",
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

const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: "inline-block",
  marginLeft: "5px",
}));

export default function Loader() {
  return (
    <Wrap>
      <BounceBall />
      <Text>Edia Loading...</Text>
    </Wrap>
  );
}
