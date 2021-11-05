export interface Question {
  readonly id: string;
  // TODO lookup fields
  surveyId: string;
  title: string;
  description: string;
  images?: string[];
}
