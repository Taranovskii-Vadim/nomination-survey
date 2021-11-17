import { NAVIGATION_ITEMS } from "./constants";
import { TargetPage } from "./types";

const PREFIX = process.env.PREFIX;

export const getUrlFor = (page: TargetPage, id?: string): string => {
  const { path } = NAVIGATION_ITEMS[page];
  const pathId = id ? `:${id}` : "";
  return `${PREFIX}${path}${pathId}`;
};

export const getTitleFor = (page: TargetPage): string => {
  const { title } = NAVIGATION_ITEMS[page];
  return title;
};

export const setUrlFor = (page: TargetPage, id?: number): string => {
  const { path } = NAVIGATION_ITEMS[page];
  let resultPath = path;

  if (id && resultPath.includes(":")) {
    resultPath = resultPath.replace(/\:.*/, id.toString());
  }

  return `${PREFIX}${resultPath}`;
};
