export class CreateDtoTodo {
	private constructor(public readonly title: string) {}

	static create(props: { [key: string]: any }): [string?, CreateDtoTodo?] {
		const { title } = props;
		if (!title) return ['Title argument is missing', undefined];
		return [undefined, new CreateDtoTodo(title)];
	}
}
