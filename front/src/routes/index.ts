import { NAVIGATION_ITEMS } from "./constants";
import { TargetPage } from "./types";

export const getUrlFor = (page: TargetPage, id?: string): string => {
  const { path } = NAVIGATION_ITEMS[page];
  const tail = id ? `:${id}` : "";
  return `${path}${tail}`;
};

export const getTitleFor = (page: TargetPage): string => {
  const { title } = NAVIGATION_ITEMS[page];
  return title;
};

export const setUrlFor = (page: TargetPage, id?: string): string => {
  const { path } = NAVIGATION_ITEMS[page];
  const tail = id || "";
  return `${path}${tail}`;
};

export const redirectToCompletedPage = (): void => {
  // @ts-ignore
  window.location = getUrlFor("completed");
};
