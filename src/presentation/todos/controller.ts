import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

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
		const [error, createDtoTodo] = CreateTodoDto.create(req.body);
		if (error) return res.status(400).json({ message: error });

		const todo = await prisma.todo.create({
			data: createDtoTodo!,
		});

		return res.json(todo);
	};

	public updateTodoById = async (req: Request, res: Response) => {
		const id = +req.params.id;
		const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });
		if (error) return res.status(400).json({ message: error });

		const todo = await prisma.todo.findFirst({ where: { id } });
		if (!todo)
			return res.status(404).json({ message: `todo with ID ${id} is not found` });

		const updatedTodo = await prisma.todo.update({
			where: { id },
			data: updateTodoDto!.values,
		});

		return res.json(updatedTodo);
	};

	public deleteTodoById = async (req: Request, res: Response) => {
		const id = +req.params.id;
		if (isNaN(id))
			return res.status(400).json({ message: 'ID argument is not a number' });

		const todo = await prisma.todo.findFirst({ where: { id } });
		if (!todo)
			return res.status(404).json({ message: `todo with ID ${id} is not found` });

		const deleted = await prisma.todo.delete({ where: { id } });

		deleted
			? res.json({ message: `todo with ID ${id} is deleted` })
			: res.status(404).json({ message: `todo with ID ${id} is not found` });
	};
}
