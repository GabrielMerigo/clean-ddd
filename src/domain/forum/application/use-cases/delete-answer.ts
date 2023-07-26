import { AnswersRepository } from "../repositories/answer-repository";

interface IDeleteAnswerUseCaseProps {
  answerId: string;
  authorId: string;
}

interface IDeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: IDeleteAnswerUseCaseProps): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not Allowed.");
    }

    await this.answersRepository.delete(answer);

    return {};
  }
}
