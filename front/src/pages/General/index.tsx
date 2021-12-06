import React from "react";
import { observer } from "mobx-react-lite";
import { SimpleGrid, Container } from "@chakra-ui/layout";
import { NavLink } from "react-router-dom";

import { useFetchData } from "../../utils/hooks";
import { setUrlFor } from "../../routes";
import { isHaveAccess } from "../../utils";
import SurveysStore from "../../store/surveysStore";
import UserStore from "../../store/userStore";

import { Loader } from "../../components/ui";
import SurveyCard from "../../components/SurveyCard";

const surveysStore = new SurveysStore();

interface Props {
  userStore: UserStore;
}

const General = ({ userStore }: Props): JSX.Element => {
  useFetchData(surveysStore.fetchSurveys);

  if (surveysStore.loading) {
    return <Loader />;
  }

  return (
    <Container as="main" maxWidth="container.md">
      <SimpleGrid columns={2} spacing={10} mt="10">
        {surveysStore.data.map(({ id, title, status }) => (
          <NavLink key={id} to={setUrlFor("surveys", id)}>
            <SurveyCard
              isActive={isHaveAccess(userStore.data.role, status)}
              title={title}
            />
          </NavLink>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default observer(General);
