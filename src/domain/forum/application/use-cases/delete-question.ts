import { QuestionsRepository } from "../repositories/questions-repository";

interface IDeleteQuestionUseCaseProps {
  questionId: string;
  authorId: string;
}

interface IDeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: IDeleteQuestionUseCaseProps): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not Allowed.");
    }

    await this.questionsRepository.delete(question);

    return {};
  }
}
