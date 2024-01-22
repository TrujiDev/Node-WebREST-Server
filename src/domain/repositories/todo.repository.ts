import { CreateDtoTodo, UpdateDtoTodo } from '../dtos';
import { TodoEntity } from '../entities/todo.entity';

export abstract class TodoRepository {
	abstract create(createTodoDto: CreateDtoTodo): Promise<TodoEntity>;

	abstract getAll(): Promise<TodoEntity[]>;

	abstract findById(id: number): Promise<TodoEntity | undefined>;
	abstract updateById(updateTodoDto: UpdateDtoTodo): Promise<TodoEntity>;
	abstract deleteById(id: number): Promise<TodoEntity>;
}
