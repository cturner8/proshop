import { useEffect, useMemo } from "react";

export const useAbortController = () => {
  const controller = useMemo(() => new AbortController(), []);
  useEffect(() => {
    console.log("hello");
    return () => {
      console.log("aborting");
      controller.abort();
    };
  }, [controller]);
  return controller;
};
