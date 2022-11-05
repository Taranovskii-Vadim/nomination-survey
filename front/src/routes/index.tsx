import React, { lazy } from 'react';

import { RouteData, RouteItems } from './types';

const Survey = lazy(() => import('../pages/Survey'));
const Surveys = lazy(() => import('../pages/General'));

const ROOT_PAGE = process.env.PREFIX || '/';

const ROUTE_ITEMS: RouteItems = {
  surveys: { path: ROOT_PAGE, element: <Surveys /> },
  survey: { path: `${ROOT_PAGE}:id`, element: <Survey /> },
};

export const getRouteData = () => Object.keys(ROUTE_ITEMS).map<RouteData>((id) => ({ id, ...ROUTE_ITEMS[id] }));

export const setUrlForSurveys = () => ROOT_PAGE;
export const setUrlForSurvey = (id: string | number) => `${ROOT_PAGE}${id}`;
