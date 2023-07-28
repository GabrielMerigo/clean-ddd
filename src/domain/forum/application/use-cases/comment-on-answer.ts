import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comments";
import { AnswersCommentsRepository } from "../repositories/answer-comments-repository";
import { AnswersRepository } from "../repositories/answer-repository";

interface ICommentOnAnswerUseCaseProps {
  authorId: string;
  answerId: string;
  content: string;
}

interface ICommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswersCommentsRepository
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: ICommentOnAnswerUseCaseProps): Promise<ICommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return {
      answerComment,
    };
  }
}
