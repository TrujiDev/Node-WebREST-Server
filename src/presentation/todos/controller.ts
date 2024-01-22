import { Request, Response } from 'express';

const todos = [
	{ id: 1, title: 'Buy Milk', completed_at: new Date() },
	{ id: 2, title: 'Buy Bread', completed_at: null },
	{ id: 3, title: 'Buy Eggs', completed_at: new Date() },
	{ id: 4, title: 'Buy Butter', completed_at: new Date() },
	{ id: 5, title: 'Buy Cheese', completed_at: null },
	{ id: 6, title: 'Buy Water', completed_at: new Date() },
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

	public createNewTodo(req: Request, res: Response) {
		const { title } = req.body;
		if (!title)
			return res.status(400).json({ message: 'Title argument is missing' });

		const newTodo = { id: todos.length + 1, title, completed_at: new Date() };
		todos.push(newTodo);
		return res.json(newTodo);
	}

	public updateTodoById(req: Request, res: Response) {
		const id = +req.params.id;
		if (isNaN(id))
			return res.status(400).json({ message: 'ID argument is not a number' });

		const todo = todos.find(todo => todo.id === id);
		if (!todo)
			return res.status(404).json({ message: `todo with ID ${id} is not found` });

		const { title, completed_at } = req.body;

		todo.title = title || todo.title;
		completed_at === null
			? (todo.completed_at = null)
			: (todo.completed_at = new Date(completed_at || todo.completed_at));

		return res.json(todo);
	}
}
