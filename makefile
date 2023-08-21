DIST_DIR = dist
NODE_MODULES_DIR = node_modules
LOCKFILE = yarn.lock

dev:
	yarn start:dev

reinit-dev:
	rm -rf $(DIST_DIR)
	rm -rf $(NODE_MODULES_DIR)
	rm $(LOCKFILE)
	yarn install
	yarn start:dev

reinit-prod:
	rm -rf $(DIST_DIR)
	rm -rf $(NODE_MODULES_DIR)
	rm $(LOCKFILE)
	yarn install
	yarn build
	yarn start:prod