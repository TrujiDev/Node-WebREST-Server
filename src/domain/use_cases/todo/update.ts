import { UpdateTodoDto } from '../../dtos';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface UpdateTodoUseCase {
	exececute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
	constructor(private readonly repository: TodoRepository) {}

	exececute(dto: UpdateTodoDto): Promise<TodoEntity> {
		return this.repository.updateById(dto);
	}
}
