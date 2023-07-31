import { left, right } from "@/core/either";
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
      return left("Answer comment not found!");
    }

    if (authorId !== answer.authorId.toString()) {
      return left("Answer comment not found!");
    }

    await this.answersRepository.delete(answer);

    return right({});
  }
}
