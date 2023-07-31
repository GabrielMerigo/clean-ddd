import { Either, left, right } from "@/core/either";
import { QuestionsCommentsRepository } from "../repositories/questions-comments-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface DeleteQuestionCommentUseCaseProps {
  questionCommentId: string;
  authorId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>;

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: QuestionsCommentsRepository
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseProps): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(
      questionCommentId
    );

    if (!questionComment) {
      return left(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionCommentsRepository.delete(questionComment);

    return right({});
  }
}
