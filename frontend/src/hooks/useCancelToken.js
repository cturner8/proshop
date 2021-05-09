import { useMemo, useEffect } from "react";
import axios from "axios";

export const useCancelToken = () => {
  const cancelToken = useMemo(() => axios.CancelToken, []);
  const source = useMemo(() => cancelToken.source(), [cancelToken]);
  useEffect(() => {
    console.log("initialising");
    return () => {
      console.log("cancelling");
      source.cancel();
    };
  }, [source]);
  return source.token;
};
