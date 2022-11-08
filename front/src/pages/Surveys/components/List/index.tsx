import React from 'react';
import { NavLink } from 'react-router-dom';

import userStore from 'src/store/user';
import { setUrlForSurvey } from 'src/routes';
import SurveysStore from 'src/store/surveys';
import { isHaveAccess } from 'src/pages/helpers';

import SurveyCard from '../Card';

interface Props {
  store: SurveysStore;
}

const List = ({ store }: Props): JSX.Element => (
  <>
    {store.data.map(({ id, title, status }) => {
      const isActive = isHaveAccess(userStore.data.role, status);

      if (isActive) {
        return (
          <NavLink key={id} to={setUrlForSurvey(id)}>
            <SurveyCard title={title} isActive={isActive} />
          </NavLink>
        );
      }

      return <SurveyCard key={id} title={title} isActive={isActive} />;
    })}
  </>
);

export default List;
