import { makeObservable, observable } from "mobx";
import { SurveyRenderItem } from "./types";

class Surveys {
  data: SurveyRenderItem[] = [];

  constructor() {
    makeObservable(this, {
      data: observable,
    });
  }
}

export default new Surveys();
