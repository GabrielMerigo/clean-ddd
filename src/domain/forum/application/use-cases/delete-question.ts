import { QuestionsRepository } from "../repositories/questions-repository";

interface IDeleteQuestionUseCaseProps {
  questionId: string;
}

interface IDeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
  }: IDeleteQuestionUseCaseProps): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    await this.questionsRepository.delete(question);

    return {};
  }
}
