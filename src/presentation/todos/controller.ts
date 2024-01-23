import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';

export class TodoController {
	constructor(private readonly todoRepository: TodoRepository) {}

	public getTodos = async (req: Request, res: Response) => {
		const todos = await this.todoRepository.getAll();
		return res.json(todos);
	};

	public getTodoById = async (req: Request, res: Response) => {
		const id = +req.params.id;
		
		try {
			const todo = await this.todoRepository.findById(id);
			return res.json(todo);
		} catch (error) {
			res.status(400).json({ message: error });
		}
	};

	public createNewTodo = async (req: Request, res: Response) => {
		const [error, createDtoTodo] = CreateTodoDto.create(req.body);
		if (error) return res.status(400).json({ message: error });

		const todo = await this.todoRepository.create(createDtoTodo!);
		return res.json(todo);
	};

	public updateTodoById = async (req: Request, res: Response) => {
		const id = +req.params.id;
		const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });
		if (error) return res.status(400).json({ message: error });

		const todo = await this.todoRepository.updateById(updateTodoDto!);
		return res.json(todo);
	};

	public deleteTodoById = async (req: Request, res: Response) => {
		const id = +req.params.id;
		
		try {
			const todo = await this.todoRepository.deleteById(id);
			return res.json(todo);
		} catch (error) {
			res.status(400).json({ message: error });
		}
	};
}
