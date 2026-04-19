// Domain Entity - Task
// This is the core business object with no external dependencies

export type TaskStatus = 'pending' | 'completed';

export interface TaskProps {
  id: string;
  title: string;
  description: string | null;
  effortPoints: number;
  status: TaskStatus;
  dueDate: Date | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Task {
  private constructor(private props: TaskProps) {}

  // Factory method to create a new Task
  static create(params: {
    id: string;
    title: string;
    description?: string | null;
    effortPoints: number;
    dueDate?: Date | null;
    userId: string;
  }): Task {
    const now = new Date();
    return new Task({
      id: params.id,
      title: params.title,
      description: params.description ?? null,
      effortPoints: params.effortPoints,
      status: 'pending',
      dueDate: params.dueDate ?? null,
      userId: params.userId,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description;
  }

  get effortPoints(): number {
    return this.props.effortPoints;
  }

  get status(): TaskStatus {
    return this.props.status;
  }

  get dueDate(): Date | null {
    return this.props.dueDate;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business logic methods
  complete(): void {
    if (this.props.status === 'completed') {
      throw new Error('Task is already completed');
    }
    this.props.status = 'completed';
    this.props.updatedAt = new Date();
  }

  undoComplete(): void {
    if (this.props.status === 'pending') {
      throw new Error('Task is not completed');
    }
    this.props.status = 'pending';
    this.props.updatedAt = new Date();
  }

  // Convert to plain object
  toJSON(): TaskProps {
    return { ...this.props };
  }

  // Reconstruct from stored data
  static fromPersistence(props: TaskProps): Task {
    return new Task(props);
  }
}