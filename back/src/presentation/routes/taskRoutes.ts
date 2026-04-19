// Task Routes - Presentation Layer
// Defines API endpoints for task operations

import { Router } from 'express';
import { TaskController } from '../controllers/TaskController.js';

export function createTaskRoutes(controller: TaskController): Router {
  const router = Router();

  // POST /api/tasks - Create a new task
  router.post('/', (req, res) => controller.createTask(req, res));

  return router;
}