export class TodoEntity {
	constructor(
		public id: number,
		public title: string,
		public completed_at?: Date | null
	) {}

	get isCompleted() {
		return !!this.completed_at;
	}
}
