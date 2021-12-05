import { Size } from "../types";

export const getBoxSize = (size: Size): number => {
  if (size === "small") return 1;
  if (size === "large") return 10;

  return 5;
};
