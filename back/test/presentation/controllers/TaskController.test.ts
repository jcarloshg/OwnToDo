// Integration Tests for Task Controller
import { TaskController } from '../../src/presentation/controllers/TaskController';
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

// Mock Express request and response
function createMockRequest(body: unknown): { body: unknown } {
  return { body };
}

function createMockResponse(): {
  status: number;
  jsonData: unknown;
  statusCode: (code: number) => { json: (data: unknown) => void };
  json: (data: unknown) => void;
} {
  const res: ReturnType<typeof createMockResponse> = {
    status: 200,
    jsonData: null,
    statusCode: function (code: number) {
      res.status = code;
      return { json: (data: unknown) => {
        res.jsonData = data;
      }};
    },
    json: function (data: unknown) {
      res.jsonData = data;
    },
  };
  return res;
}

describe('TaskController - createTask', () => {
  let controller: TaskController;
  let useCase: CreateTaskUseCase;
  let mockRepository: MockTaskRepository;

  beforeEach(() => {
    mockRepository = new MockTaskRepository();
    useCase = new CreateTaskUseCase(mockRepository);
    controller = new TaskController(useCase);
  });

  describe('HTTP Response Scenarios', () => {
    it('should return 201 when task is created successfully', async () => {
      // Arrange
      const req = createMockRequest({
        title: 'Complete project report',
        description: 'Write the final Q1 report',
        effortPoints: 5,
        dueDate: '2026-04-25',
        userId: '123e4567-e89b-12d3-a456-426614174000',
      });
      const res = createMockResponse();

      // Act
      await controller.createTask(req as any, res as any);

      // Assert
      expect(res.status).toBe(201);
      expect(res.jsonData).toHaveProperty('id');
      expect(res.jsonData).toHaveProperty('title', 'Complete project report');
      expect(res.jsonData).toHaveProperty('status', 'pending');
    });

    it('should return 201 with minimal fields', async () => {
      // Arrange
      const req = createMockRequest({
        title: 'Buy groceries',
        effortPoints: 2,
        userId: '123e4567-e89b-12d3-a456-426614174000',
      });
      const res = createMockResponse();

      // Act
      await controller.createTask(req as any, res as any);

      // Assert
      expect(res.status).toBe(201);
      expect(res.jsonData).toHaveProperty('title', 'Buy groceries');
    });

    it('should return 400 when title is missing', async () => {
      // Arrange
      const req = createMockRequest({
        effortPoints: 5,
        userId: '123e4567-e89b-12d3-a456-426614174000',
      });
      const res = createMockResponse();

      // Act
      await controller.createTask(req as any, res as any);

      // Assert
      expect(res.status).toBe(400);
      expect(res.jsonData).toHaveProperty('error', 'Validation failed');
    });

    it('should return 400 when title is empty', async () => {
      // Arrange
      const req = createMockRequest({
        title: '',
        effortPoints: 5,
        userId: '123e4567-e89b-12d3-a456-426614174000',
      });
      const res = createMockResponse();

      // Act
      await controller.createTask(req as any, res as any);

      // Assert
      expect(res.status).toBe(400);
    });

    it('should return 400 when effort points exceeds 100', async () => {
      // Arrange
      const req = createMockRequest({
        title: 'Test task',
        effortPoints: 101,
        userId: '123e4567-e89b-12d3-a456-426614174000',
      });
      const res = createMockResponse();

      // Act
      await controller.createTask(req as any, res as any);

      // Assert
      expect(res.status).toBe(400);
    });

    it('should return 400 when effort points is less than 1', async () => {
      // Arrange
      const req = createMockRequest({
        title: 'Test task',
        effortPoints: 0,
        userId: '123e4567-e89b-12d3-a456-426614174000',
      });
      const res = createMockResponse();

      // Act
      await controller.createTask(req as any, res as any);

      // Assert
      expect(res.status).toBe(400);
    });

    it('should return 400 when userId is invalid UUID', async () => {
      // Arrange
      const req = createMockRequest({
        title: 'Test task',
        effortPoints: 5,
        userId: 'invalid-uuid',
      });
      const res = createMockResponse();

      // Act
      await controller.createTask(req as any, res as any);

      // Assert
      expect(res.status).toBe(400);
    });

    it('should return 500 on unexpected error', async () => {
      // Arrange
      const invalidUseCase = {} as CreateTaskUseCase;
      const errorController = new TaskController(invalidUseCase);
      const req = createMockRequest({
        title: 'Test task',
        effortPoints: 5,
        userId: '123e4567-e89b-12d3-a456-426614174000',
      });
      const res = createMockResponse();

      // Act
      await errorController.createTask(req as any, res as any);

      // Assert
      expect(res.status).toBe(500);
      expect(res.jsonData).toHaveProperty('error', 'Internal server error');
    });
  });
});