DIST_DIR = dist
NODE_MODULES_DIR = node_modules
LOCKFILE = yarn.lock

clean:
	rm -rf $(DIST_DIR)
	rm -rf $(NODE_MODULES_DIR)
	yarn install
	yarn run build

dev:
	yarn run start:dev

prod:
	yarn build
	yarn start:prod

dp:
	docker build -t twitcher-api:0.0.1 .
	docker compose up

du:
	docker-compose up

reinit-dev:
	rm -rf $(DIST_DIR)
	rm -rf $(NODE_MODULES_DIR)
	yarn install
	make dev

reinit-prod:
	rm -rf $(DIST_DIR)
	rm -rf $(NODE_MODULES_DIR)
	rm $(LOCKFILE)
	yarn install
	yarn build
	yarn start:prod