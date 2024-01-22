import { Router } from 'express';
import { TodoController } from './controller';

export class TodoRoutes {
	static get routes(): Router {
		const router = Router();
		const todoController = new TodoController();

		router.get('/', todoController.getTodos);
		router.get('/:id', todoController.getTodoById);

		router.post('/new-todo', todoController.createNewTodo);

		router.put('/:id', todoController.updateTodoById);

		return router;
	}
}
