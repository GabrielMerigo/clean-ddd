import { Answer } from "../entities/answer";

interface IAnswerQuestionUseCaseProps {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: IAnswerQuestionUseCaseProps) {
    const answer = new Answer({
      authorId: instructorId,
      content,
      questionId,
    });

    return answer;
  }
}
