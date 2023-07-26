import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answer-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface IChooseQuestionBestAnswerUseCaseProps {
  answerId: string;
  authorId: string;
}

interface IChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    answerId,
    authorId,
  }: IChooseQuestionBestAnswerUseCaseProps): Promise<IChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );

    if (!question) {
      throw new Error("Question not found.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not Allowed.");
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return {
      question,
    };
  }
}
