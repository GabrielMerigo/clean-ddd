import { Either, left, right } from "@/core/either";
import { AnswersCommentsRepository } from "../repositories/answer-comments-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface AnswerCommentProps {
  answerCommentId: string;
  authorId: string;
}

type AnswerCommentResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswersCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: AnswerCommentProps): Promise<AnswerCommentResponse> {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId
    );

    if (!answerComment) {
      return left(new ResourceNotFoundError());
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answerCommentsRepository.delete(answerComment);

    return right({});
  }
}
