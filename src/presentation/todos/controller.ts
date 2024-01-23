import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import {
	CreateTodo,
	DeleteTodo,
	GetSingleTodo,
	GetTodos,
	TodoRepository,
	UpdateTodo,
} from '../../domain';

export class TodoController {
	constructor(private readonly todoRepository: TodoRepository) {}

	public getTodos = (req: Request, res: Response) => {
		new GetTodos(this.todoRepository)
			.exececute()
			.then(todos => res.json(todos))
			.catch(error => res.status(400).json({ message: error }));
	};

	public getTodoById = (req: Request, res: Response) => {
		const id = +req.params.id;

		new GetSingleTodo(this.todoRepository)
			.exececute(id)
			.then(todo => res.json(todo))
			.catch(error => res.status(400).json({ message: error }));
	};

	public createNewTodo = (req: Request, res: Response) => {
		const [error, createDtoTodo] = CreateTodoDto.create(req.body);
		if (error) return res.status(400).json({ message: error });

		new CreateTodo(this.todoRepository)
			.exececute(createDtoTodo!)
			.then(todo => res.json(todo))
			.catch(error => res.status(400).json({ message: error }));
	};

	public updateTodoById = (req: Request, res: Response) => {
		const id = +req.params.id;
		const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });
		if (error) return res.status(400).json({ message: error });

		new UpdateTodo(this.todoRepository)
			.exececute(updateTodoDto!)
			.then(todo => res.json(todo))
			.catch(error => res.status(400).json({ message: error }));
	};

	public deleteTodoById = (req: Request, res: Response) => {
		const id = +req.params.id;

		new DeleteTodo(this.todoRepository)
			.exececute(id)
			.then(todo => res.json(todo))
			.catch(error => res.status(400).json({ message: error }));
	};
}
