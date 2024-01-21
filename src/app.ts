import { envs } from './config/envs';
import { Server } from './presentation/Server';
import { AppRouter } from './presentation/routes';

(async () => {
	main();
})();

function main() {
	const server = new Server({
		port: envs.PORT,
		routes: AppRouter.routes,
		public_path: envs.PUBLIC_PATH,
	});
	server.start();
}
