import { QuestionsCommentsRepository } from "../repositories/questions-comments-repository";

interface IDeleteQuestionCommentUseCaseProps {
  questionCommentId: string;
  authorId: string;
}

interface IDeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: QuestionsCommentsRepository
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: IDeleteQuestionCommentUseCaseProps): Promise<IDeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(
      questionCommentId
    );

    if (!questionComment) {
      throw new Error("Question not found.");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("Not Allowed!");
    }

    await this.questionCommentsRepository.delete(questionComment);

    return {};
  }
}
