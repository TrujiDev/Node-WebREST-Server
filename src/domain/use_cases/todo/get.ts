import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface GetTodosUseCase {
	exececute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {
	constructor(private readonly repository: TodoRepository) {}

	exececute(): Promise<TodoEntity[]> {
		return this.repository.getAll();
	}
}
