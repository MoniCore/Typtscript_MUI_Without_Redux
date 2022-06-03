import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import { createTheme, styled } from "@mui/material/styles";

export const useAppStyles = makeStyles({
  redText: {
    fontSize: 20,
    color: "red",
  },
  layout: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: "hidden",
    background: "white",
    width: "100%",
    height: "100vh",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));