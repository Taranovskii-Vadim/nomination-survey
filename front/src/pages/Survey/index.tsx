import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useFetchData } from "../../utils/hooks";
import { isHaveAccess } from "../../utils";
import SurveyStore from "../../store/surveyStore";
import UserStore from "../../store/userStore";

import { Loader } from "../../components/ui";
import AccessDenied from "../../components/AccessDenied";

const surveyStore = new SurveyStore();

interface Props {
  userStore: UserStore;
}

const Survey = ({ userStore }: Props): JSX.Element => {
  const { surveyId }: { surveyId: string } = useParams();

  useFetchData(() => surveyStore.fetchSurveyById(surveyId));

  if (surveyStore.loading || !surveyStore.data) {
    return <Loader />;
  }

  if (!isHaveAccess(userStore.data.role, surveyStore.data.status)) {
    return <AccessDenied />;
  }

  return <div>{JSON.stringify(surveyStore.data)}</div>;
};

export default observer(Survey);
