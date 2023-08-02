import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { QuestionAttachment } from "./question-attachment";
import { Slug } from "./values-objects/slug";

export interface QuestionProps {
  title: string;
  content: string;
  attachments: QuestionAttachment[];
  slug: Slug;
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends AggregateRoot<QuestionProps> {
  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get slug() {
    return this.props.slug;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get attachments() {
    return this.props.attachments;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);

    this.touch();
  }

  set content(content: string) {
    this.touch();
    this.props.content = content;
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug" | "attachments">,
    id?: UniqueEntityID
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
        attachments: props.attachments ?? [],
      },
      id
    );

    return question;
  }
}
