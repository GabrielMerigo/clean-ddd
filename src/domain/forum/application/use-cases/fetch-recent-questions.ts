import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface IFetchRecentQuestionsCaseProps {
  page: number;
}

interface IFetchRecentQuestionsCaseResponse {
  questions: Question[];
}

export class FetchRecentQuestionsCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: IFetchRecentQuestionsCaseProps): Promise<IFetchRecentQuestionsCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page });

    return {
      questions,
    };
  }
}
