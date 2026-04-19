// Main Application Entry Point
import express from 'express';
import { pool } from './infrastructure/database/PostgresConnection.js';
import { PostgresTaskRepository } from './infrastructure/repositories/PostgresTaskRepository.js';
import { CreateTaskUseCase } from './application/use-cases/CreateTaskUseCase.js';
import { TaskController } from './presentation/controllers/TaskController.js';
import { createTaskRoutes } from './presentation/routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Dependency Injection Container
const taskRepository = new PostgresTaskRepository(pool);
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const taskController = new TaskController(createTaskUseCase);

// Routes
app.use('/api/tasks', createTaskRoutes(taskController));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`TaskFlow API running on port ${PORT}`);
});

export default app;