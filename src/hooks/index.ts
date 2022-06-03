import { useState } from "react";
import { getTestNumber } from "../features/api";

interface UseTestResponse {
  getNumber: () => void;
  clear: () => void;
  number: number;
  loading: boolean;
  errorMsg: string;
}

const useTest = (): UseTestResponse => {
  const rNumber = Math.floor(Math.random() * 900) + 1;
  const [showNumber, setShowNumber] = useState<number>(rNumber);
  const [intervalNumber, setIntervalNumber] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getNumber = async () => {
    try {
      if (!loading) {
        setLoading(true);

        setTimeout(async () => {
          const number = await getTestNumber(`/v1/number`);
          setShowNumber(number);

          if (number % 2 !== 0) {
            setErrorMsg("");
          } else {
            setErrorMsg("This is even number, Try again");
            setIntervalNumber((state) => state + 1);
          }

          setLoading(false);
        }, intervalNumber * 2000);
      }
    } catch (error) {
      setLoading(false);

      if (error instanceof Error) {
        setErrorMsg(error.message);
        setShowNumber(0);
      }
    }
  };

  const clear = () => {
    setIntervalNumber(0);
    setErrorMsg("");
  };

  return {
    getNumber,
    clear,
    number: showNumber,
    loading,
    errorMsg,
  };
};

export default useTest;
