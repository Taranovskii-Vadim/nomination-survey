import React from "react";
import { observer } from "mobx-react-lite";
import { SimpleGrid } from "@chakra-ui/layout";
import { NavLink } from "react-router-dom";

import { useFetchData } from "../../utils/hooks";
import { setUrlFor } from "../../routes";

import surveysStore from "../../store/surveysStore";
import SurveyCard from "../../components/SurveyCard";

const General = (): JSX.Element => {
  useFetchData(surveysStore.fetchSurveys);

  if (surveysStore.loading) {
    return <p>loading....</p>;
  }

  return (
    <SimpleGrid columns={2} spacing={10} mt="10">
      {surveysStore.data.map(({ id, title }) => (
        <NavLink to={setUrlFor("surveys", id)}>
          <SurveyCard key={id} isActive={true} title={title} />
        </NavLink>
      ))}
    </SimpleGrid>
  );
};

export default observer(General);
