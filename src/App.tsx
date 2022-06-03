import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import useTest from "./hooks";
import { lightTheme, useAppStyles } from "./app.styles";

const App: React.FC = () => {
  const classes = useAppStyles();
  const { getNumber, clear, number, loading, errorMsg } = useTest();
  const [listNumber, setListNumber] = useState<Array<number>>([]);

  useMemo(() => {
    setListNumber((prevState) => [...prevState, number]);
  }, [number]);

  useEffect(() => {
    if (number % 2 === 0) {
      getNumber();
    } else {
      clear();
    }
  }, [clear, getNumber, number]);

  const getColoredText = (value: number) => {
    if (value >= 1 && value < 300) {
      return "green";
    }

    if (value >= 300 && value < 600) {
      return "red";
    }

    if (value >= 600 && value <= 900) {
      return "blue";
    }
  };

  const getButtonColor = (value: number) => {
    if (value >= 1 && value < 300) {
      return "success";
    }

    if (value >= 300 && value < 600) {
      return "error";
    }

    if (value >= 600 && value <= 900) {
      return "primary";
    }
  };

  const handleRemoveList = () => {
    setListNumber([]);
    clear();
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <div className={classes.layout}>
        <div className="app">
          <div className="button-container">
            <Button
              variant="contained"
              color={getButtonColor(number)}
              disabled={loading}
              onClick={getNumber}
            >
              Get number
            </Button>

            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: blue[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </div>
          <div>
            {listNumber.map((list, index) => (
              <p style={{ color: getColoredText(list) }} key={index}>
                {list}
              </p>
            ))}
            <Typography fontSize={14} className={classes.redText}>
              {errorMsg}
            </Typography>
            {listNumber.length > 0 && (
              <Button
                variant="contained"
                color="error"
                onClick={handleRemoveList}
              >
                Clear List
              </Button>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
