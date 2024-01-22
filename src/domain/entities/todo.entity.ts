export class TodoEntity {
	constructor(
		public id: number,
		public title: string,
		public completed_at?: Date | null
	) {}

	get isCompleted() {
		return !!this.completed_at;
	}

	public static fromObj(object: { [key: string]: any }): TodoEntity {
		const { id, title, completed_at } = object;

		if (!id) throw new Error('id is required');
		if (!title) throw new Error('title is required');

		let newCompletedAt;
		if (completed_at) {
			newCompletedAt = new Date(completed_at);
			if (isNaN(newCompletedAt.getTime()))
				throw new Error('completed_at must be a valid date');
		}

		return new TodoEntity(id, title, completed_at);
	}
}
