import { Request, Response } from 'express';

export class TodosController {
	constructor() {}

	public getTodos(req: Request, res: Response) {
		return res.json([
			{ id: 1, title: 'Buy Milk', created_at: new Date() },
			{ id: 2, title: 'Buy Bread', created_at: null },
			{ id: 3, title: 'Buy Eggs', created_at: new Date() },
		]);
	}
}
