import React from "react";
import { observer } from "mobx-react-lite";
import { SimpleGrid } from "@chakra-ui/layout";

import { useFetchData } from "../../utils/hooks";

import surveysStore from "../../store/surveysStore";
import SurveyCard from "../../components/SurveyCard";

const General = (): JSX.Element => {
  useFetchData(surveysStore.fetchSurveys);

  if (surveysStore.loading) {
    return <p>loading....</p>;
  }

  return (
    <SimpleGrid columns={2} spacing={10} mt="10">
      {surveysStore.data.map((item) => (
        <SurveyCard key={item.id} {...item} />
      ))}
    </SimpleGrid>
  );
};

export default observer(General);
