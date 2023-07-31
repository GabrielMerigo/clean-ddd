import { Either, left, right } from "@/core/either";
import { AnswersRepository } from "../repositories/answer-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface DeleteAnswerUseCaseProps {
  answerId: string;
  authorId: string;
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>;

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseProps): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.answersRepository.delete(answer);

    return right({});
  }
}
