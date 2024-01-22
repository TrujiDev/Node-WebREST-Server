import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';

export class TodoController {
	constructor() {}

	public getTodos = async (req: Request, res: Response) => {
		const todos = await prisma.todo.findMany();

		return res.json(todos);
	};

	public getTodoById = async (req: Request, res: Response) => {
		const id = +req.params.id;
		if (isNaN(id))
			return res.status(400).json({ message: 'ID argument is not a number' });

		const todo = await prisma.todo.findFirst({ where: { id } });

		todo
			? res.json(todo)
			: res.status(404).json({ message: `todo with ID ${id} is not found` });
	};

	public createNewTodo = async (req: Request, res: Response) => {
		const { title } = req.body;
		if (!title)
			return res.status(400).json({ message: 'Title argument is missing' });

		const todo = await prisma.todo.create({
			data: { title },
		});

		return res.json(todo);
	};

	public updateTodoById = async (req: Request, res: Response) => {
		const id = +req.params.id;
		if (isNaN(id))
			return res.status(400).json({ message: 'ID argument is not a number' });

		const todo = await prisma.todo.findUnique({ where: { id } });
		if (!todo)
			return res.status(404).json({ message: `todo with ID ${id} is not found` });

		const { title, completed_at } = req.body;

		const updatedTodo = await prisma.todo.update({
			where: { id },
			data: { title, completed_at },
		});

		return res.json(updatedTodo);
	};

	public deleteTodoById = async (req: Request, res: Response) => {
		const id = +req.params.id;
		if (isNaN(id))
			return res.status(400).json({ message: 'ID argument is not a number' });

		const todo = await prisma.todo.findUnique({ where: { id } });
		if (!todo)
			return res.status(404).json({ message: `todo with ID ${id} is not found` });

		await prisma.todo.delete({ where: { id } });

		return res.json({ message: `todo with ID ${id} is deleted` });
	};
}
