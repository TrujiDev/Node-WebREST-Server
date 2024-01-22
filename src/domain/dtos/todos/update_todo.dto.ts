export class UpdateDtoTodo {
	private constructor(
		public readonly id: number,
		public readonly title?: string,
		public readonly completed_at?: Date
	) {}

	get values() {
		const returnObj: { [key: string]: any } = {};

		if (this.title) returnObj.title = this.title;
		if (this.completed_at) returnObj.completed_at = this.completed_at;

		return returnObj;
	}

	static update(props: { [key: string]: any }): [string?, UpdateDtoTodo?] {
		const { id, title, completed_at } = props;
		let newCompletedAt = completed_at;

		if (!id || isNaN(Number(id))) return ['id is not a number'];

		if (completed_at) {
			newCompletedAt = new Date(completed_at);
			if (newCompletedAt.toString() === 'Invalid Date')
				return ['completed_at is not a valid date', undefined];
		}

		return [undefined, new UpdateDtoTodo(id, title, newCompletedAt)];
	}
}
