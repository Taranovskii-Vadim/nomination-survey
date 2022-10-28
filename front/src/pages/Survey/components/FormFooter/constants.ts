import { SurveyStatus } from 'src/store/types';

interface ButtonRender {
  label: string;
  to: SurveyStatus;
}

export const BUTTONS: { [key in SurveyStatus]: ButtonRender } = {
  finished: { label: 'Начать заново', to: 'ready' },
  chiefVote: { label: 'Завершить голосование', to: 'finished' },
  ready: { label: 'Начать голосование пользователей', to: 'userVote' },
  userVote: { label: 'Начать голосование руководителей', to: 'chiefVote' },
};
