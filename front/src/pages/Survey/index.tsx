import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useFetchData } from "../../utils/hooks";
import surveyStore from "../../store/surveyStore";

const Survey = (): JSX.Element => {
  const { surveyId }: { surveyId: string } = useParams();

  useFetchData(() => surveyStore.fetchSurveyById(surveyId));

  if (surveyStore.loading || !surveyStore.data) {
    return <p>loading...</p>;
  }

  return <div>{surveyStore.data.title}</div>;
};

export default observer(Survey);
