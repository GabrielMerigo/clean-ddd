import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "../../enterprise/entities/question-comments";
import { QuestionsCommentsRepository } from "../repositories/questions-comments-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ICommentOnQuestionUseCaseProps {
  authorId: string;
  questionId: string;
  content: string;
}

interface ICommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionsCommentsRepository
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: ICommentOnQuestionUseCaseProps): Promise<ICommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      content,
      questionId: new UniqueEntityID(authorId),
    });

    await this.questionCommentsRepository.create(questionComment);

    return {
      questionComment,
    };
  }
}
