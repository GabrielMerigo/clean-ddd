import { AnswersCommentsRepository } from "../repositories/answer-comments-repository";

interface IAnswerCommentProps {
  answerCommentId: string;
  authorId: string;
}

interface IAnswerCommentResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswersCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: IAnswerCommentProps): Promise<IAnswerCommentResponse> {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId
    );

    if (!answerComment) {
      throw new Error("Answer not found.");
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error("Not Allowed!");
    }

    await this.answerCommentsRepository.delete(answerComment);

    return {};
  }
}
