import { Router } from 'express';

export class AppRouter {
	static get routes(): Router {
		const router = Router();

		router.get('/api/todos', (req, res) => {
			return res.json([
				{ id: 1, title: 'Buy Milk', created_at: new Date() },
				{ id: 2, title: 'Buy Bread', created_at: null },
				{ id: 3, title: 'Buy Eggs', created_at: new Date() },
			]);
		});

		return router;
	}
}
