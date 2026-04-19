// Unit Tests for CreateTaskUseCase
import { CreateTaskUseCase } from '../../src/application/use-cases/CreateTaskUseCase';
import { ITaskRepository } from '../../src/domain/repositories/ITaskRepository';
import { TaskProps } from '../../src/domain/entities/Task';

// Mock repository implementation
class MockTaskRepository implements ITaskRepository {
  private tasks: Map<string, TaskProps> = new Map();

  async save(task: { toJSON: () => TaskProps }): Promise<TaskProps> {
    const data = task.toJSON();
    this.tasks.set(data.id, data);
    return data;
  }

  async findById(id: string): Promise<TaskProps | null> {
    return this.tasks.get(id) || null;
  }

  async findByUserId(userId: string): Promise<TaskProps[]> {
    return Array.from(this.tasks.values()).filter((t) => t.userId === userId);
  }

  async update(task: { toJSON: () => TaskProps }): Promise<TaskProps> {
    const data = task.toJSON();
    this.tasks.set(data.id, data);
    return data;
  }

  async delete(id: string): Promise<void> {
    this.tasks.delete(id);
  }
}

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let mockRepository: MockTaskRepository;

  beforeEach(() => {
    mockRepository = new MockTaskRepository();
    useCase = new CreateTaskUseCase(mockRepository);
  });

  describe('execute', () => {
    it('should create a task with all fields', async () => {
      // Arrange
      const input = {
        title: 'Complete project report',
        description: 'Write the final Q1 report',
        effortPoints: 5,
        dueDate: '2026-04-25',
        userId: '123e4567-e89b-12d3-a456-426614174000',
      };

      // Act
      const result = await useCase.execute(input);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.title).toBe('Complete project report');
      expect(result.description).toBe('Write the final Q1 report');
      expect(result.effortPoints).toBe(5);
      expect(result.status).toBe('pending');
      expect(result.dueDate).toBe('2026-04-25');
      expect(result.userId).toBe(input.userId);
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });

    it('should create a task with minimal fields (title and effort only)', async () => {
      // Arrange
      const input = {
        title: 'Buy groceries',
        effortPoints: 2,
        userId: '123e4567-e89b-12d3-a456-426614174000',
      };

      // Act
      const result = await useCase.execute(input);

      // Assert
      expect(result).toBeDefined();
      expect(result.title).toBe('Buy groceries');
      expect(result.effortPoints).toBe(2);
      expect(result.description).toBeNull();
      expect(result.dueDate).toBeNull();
      expect(result.status).toBe('pending');
    });

    it('should throw error when title is missing', async () => {
      // Arrange
      const input = {
        title: '',
        effortPoints: 5,
        userId: '123e4567-e89b-12d3-a456-426614174000',
      };

      // Act & Assert
      await expect(useCase.execute(input)).rejects.toThrow();
    });

    it('should throw error when title exceeds 200 characters', async () => {
      // Arrange
      const input = {
        title: 'A'.repeat(201),
        effortPoints: 5,
        userId: '123e4567-e89b-12d3-a456-426614174000',
      };

      // Act & Assert
      await expect(useCase.execute(input)).rejects.toThrow();
    });

    it('should throw error when effort points is less than 1', async () => {
      // Arrange
      const input = {
        title: 'Test task',
        effortPoints: 0,
        userId: '123e4567-e89b-12d3-a456-426614174000',
      };

      // Act & Assert
      await expect(useCase.execute(input)).rejects.toThrow();
    });

    it('should throw error when effort points exceeds 100', async () => {
      // Arrange
      const input = {
        title: 'Test task',
        effortPoints: 101,
        userId: '123e4567-e89b-12d3-a456-426614174000',
      };

      // Act & Assert
      await expect(useCase.execute(input)).rejects.toThrow();
    });

    it('should throw error when userId is invalid UUID', async () => {
      // Arrange
      const input = {
        title: 'Test task',
        effortPoints: 5,
        userId: 'not-a-valid-uuid',
      };

      // Act & Assert
      await expect(useCase.execute(input)).rejects.toThrow();
    });
  });
});