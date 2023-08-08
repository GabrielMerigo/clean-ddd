import { SpyInstance } from "vitest";

import { makeAnswer } from "@/factories/make-answer";
import { makeQuestion } from "@/factories/make-question";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryNotificationRepository } from "test/repositories/in-memory-notification-repository";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { OnAnswerCreated } from "./on-answer-created";

let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswerRepository;
let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: SpyInstance;

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionRepository(
      inMemoryQuestionsAttachmentsRepository
    );

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository
    );

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository
    );

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onAnswerCreated = new OnAnswerCreated(
      inMemoryQuestionsRepository,
      sendNotificationUseCase
    );
  });

  it("should send a notification when a new answer is created", () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id });

    inMemoryQuestionsRepository.create(question);
    inMemoryAnswersRepository.create(answer);

    expect(sendNotificationExecuteSpy).toHaveBeenCalled();
  });
});
