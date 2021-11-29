import { useEffect } from "react";

export const useFetchData = (callback: () => Promise<void>): void => {
  useEffect(() => {
    callback();
  }, []);
};
