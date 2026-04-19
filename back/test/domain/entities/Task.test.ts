// Unit Tests for Task Entity
import { Task } from '../../src/domain/entities/Task';

describe('Task Entity', () => {
  describe('create', () => {
    it('should create a task with all fields', () => {
      // Arrange
      const params = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Test Task',
        description: 'Test Description',
        effortPoints: 5,
        dueDate: new Date('2026-04-25'),
        userId: 'user-123',
      };

      // Act
      const task = Task.create(params);

      // Assert
      expect(task.id).toBe(params.id);
      expect(task.title).toBe(params.title);
      expect(task.description).toBe(params.description);
      expect(task.effortPoints).toBe(params.effortPoints);
      expect(task.status).toBe('pending');
      expect(task.dueDate).toEqual(params.dueDate);
      expect(task.userId).toBe(params.userId);
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.updatedAt).toBeInstanceOf(Date);
    });

    it('should create a task with minimal fields', () => {
      // Arrange
      const params = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Minimal Task',
        effortPoints: 3,
        userId: 'user-123',
      };

      // Act
      const task = Task.create(params);

      // Assert
      expect(task.id).toBe(params.id);
      expect(task.title).toBe(params.title);
      expect(task.description).toBeNull();
      expect(task.dueDate).toBeNull();
      expect(task.status).toBe('pending');
    });

    it('should set status to pending by default', () => {
      // Arrange
      const params = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Test Task',
        effortPoints: 5,
        userId: 'user-123',
      };

      // Act
      const task = Task.create(params);

      // Assert
      expect(task.status).toBe('pending');
    });
  });

  describe('complete', () => {
    it('should mark task as completed', () => {
      // Arrange
      const task = Task.create({
        id: '123',
        title: 'Test Task',
        effortPoints: 5,
        userId: 'user-123',
      });

      // Act
      task.complete();

      // Assert
      expect(task.status).toBe('completed');
    });

    it('should throw error if task is already completed', () => {
      // Arrange
      const task = Task.create({
        id: '123',
        title: 'Test Task',
        effortPoints: 5,
        userId: 'user-123',
      });
      task.complete();

      // Act & Assert
      expect(() => task.complete()).toThrow('Task is already completed');
    });
  });

  describe('undoComplete', () => {
    it('should mark completed task back to pending', () => {
      // Arrange
      const task = Task.create({
        id: '123',
        title: 'Test Task',
        effortPoints: 5,
        userId: 'user-123',
      });
      task.complete();

      // Act
      task.undoComplete();

      // Assert
      expect(task.status).toBe('pending');
    });

    it('should throw error if task is not completed', () => {
      // Arrange
      const task = Task.create({
        id: '123',
        title: 'Test Task',
        effortPoints: 5,
        userId: 'user-123',
      });

      // Act & Assert
      expect(() => task.undoComplete()).toThrow('Task is not completed');
    });
  });

  describe('toJSON', () => {
    it('should return all task properties', () => {
      // Arrange
      const task = Task.create({
        id: '123',
        title: 'Test Task',
        description: 'Description',
        effortPoints: 5,
        dueDate: new Date('2026-04-25'),
        userId: 'user-123',
      });

      // Act
      const json = task.toJSON();

      // Assert
      expect(json.id).toBe('123');
      expect(json.title).toBe('Test Task');
      expect(json.description).toBe('Description');
      expect(json.effortPoints).toBe(5);
      expect(json.status).toBe('pending');
      expect(json.dueDate).toEqual(new Date('2026-04-25'));
      expect(json.userId).toBe('user-123');
      expect(json.createdAt).toBeInstanceOf(Date);
      expect(json.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('fromPersistence', () => {
    it('should reconstruct task from stored data', () => {
      // Arrange
      const now = new Date();
      const props = {
        id: '123',
        title: 'Test Task',
        description: null,
        effortPoints: 5,
        status: 'pending' as const,
        dueDate: null,
        userId: 'user-123',
        createdAt: now,
        updatedAt: now,
      };

      // Act
      const task = Task.fromPersistence(props);

      // Assert
      expect(task.id).toBe(props.id);
      expect(task.title).toBe(props.title);
      expect(task.status).toBe(props.status);
    });
  });
});