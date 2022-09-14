import React from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { SimpleGrid, Container } from "@chakra-ui/layout";

import { setUrlFor } from "src/routes";
import UserStore from "src/store/user";
import SurveysStore from "src/store/surveys";
import { getLoadingMessage } from "src/utils";
import { useFetchData } from "src/utils/hooks";

import { Loader } from "src/components/ui";
import SurveyCard from "src/components/SurveyCard";

import { isHaveAccess } from "../helpers";

const surveysStore = new SurveysStore();

interface Props {
  userStore: UserStore;
}

const General = ({ userStore }: Props): JSX.Element => {
  useFetchData(surveysStore.fetchSurveys);

  if (surveysStore.loading) {
    return <Loader text={getLoadingMessage("опросов")} />;
  }

  return (
    <Container as="main" maxWidth="container.md">
      <SimpleGrid columns={2} spacing={10} mt="10">
        {surveysStore.data.map(({ id, title, status }) => {
          const isActive = isHaveAccess(userStore.data.role, status);
          // TODO think how to exclude link from dom
          return (
            <NavLink key={id} to={setUrlFor("surveys", id)}>
              <SurveyCard
                id={id}
                title={title}
                isActive={isActive}
                unActiveMessage="Голосование временно недоступно"
              />
            </NavLink>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default observer(General);
