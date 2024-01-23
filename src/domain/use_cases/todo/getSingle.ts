import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface GetTodoUseCase {
	exececute(id: number): Promise<TodoEntity>;
}

export class GetSingleTodo implements GetTodoUseCase {
	constructor(private readonly repository: TodoRepository) {}

	exececute(id: number): Promise<TodoEntity> {
		return this.repository.findById(id);
	}
}
