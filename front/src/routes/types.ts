enum RouteKeys {
  surveys = 'surveys',
  survey = 'survey',
}

export type RouteData = {
  id: RouteKeys;
  path: string;
  element: JSX.Element;
};

export type RouteItems = Record<RouteKeys, Omit<RouteData, 'id'>>;
