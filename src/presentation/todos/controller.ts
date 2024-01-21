import { Request, Response } from 'express';

const todos = [
	{ id: 1, title: 'Buy Milk', created_at: new Date() },
	{ id: 2, title: 'Buy Bread', created_at: null },
	{ id: 3, title: 'Buy Eggs', created_at: new Date() },
	{ id: 4, title: 'Buy Butter', created_at: new Date() },
	{ id: 5, title: 'Buy Cheese', created_at: null },
	{ id: 6, title: 'Buy Water', created_at: new Date() },
];

export class TodoController {
	constructor() {}

	public getTodos(req: Request, res: Response) {
		return res.json(todos);
	}

	public getTodoById(req: Request, res: Response) {
		const id = +req.params.id;
		if (isNaN(id))
			return res.status(400).json({ message: 'ID argument is not a number' });

		const todo = todos.find(todo => todo.id === id);
		todo
			? res.json(todo)
			: res.status(404).json({ message: `todo with ID ${id} is not found` });
	}
}
