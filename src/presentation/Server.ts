import express, { Router } from 'express';
import path from 'path';
import compression from 'compression';

interface Options {
	port: number;
	routes: Router;
	public_path?: string;
}

export class Server {
	private app = express();
	private readonly port: number;
	private readonly routes: Router;
	private readonly publicPath: string;

	constructor(options: Options) {
		const { port, routes, public_path = 'public' } = options;

		this.port = port;
		this.routes = routes;
		this.publicPath = public_path;
	}

	async start() {
		// Body parser
		this.app.use(express.json()); // for parsing application/json
		this.app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
		this.app.use(compression());

		// Public folder
		this.app.use(express.static(this.publicPath));

		// Routes
		this.app.use(this.routes);

		// SPA
		this.app.get('*', (req, res) => {
			const indexPath = path.join(
				__dirname,
				`../../${this.publicPath}/index.html`
			);
			res.sendFile(indexPath);
			return;
		});

		this.app.listen(this.port, () => {
			console.log(`Server started on port ${this.port}`);
		});
	}
}
