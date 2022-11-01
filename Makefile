create-app:
	docker-compose up -d --force-recreate app

create-db:
	docker-compose up -d --force-recreate db

prisma-push:
		docker-compose run --rm app "npx prisma db push && npm i"

prisma-format:
		docker-compose run --rm app "npx prisma format"

create: create-app create-db

up:
	docker-compose up

up-production:
	docker compose -f docker-compose.yml -f production.yml up

up-production-detached:
	docker compose -f docker-compose.yml -f production.yml up -d

restart:
	docker-compose up -d

down:
	docker-compose down

clean:
	docker-compose down --remove-orphans
	rm -rf .next

clean-modules:
	rm -rf .next
	rm -rf /node_modules

build:
	docker-compose run --rm app "npm run build"

install:
	docker-compose run --rm app "npm install"

install-production:
	docker-compose run --rm app "npm install --omit=dev"

goto-app:
	docker-compose exec app /bin/bash

goto-db:
	docker-compose exec db /bin/bash

logs:
	docker-compose logs -f

reset-db:
	docker volume rm hypertube-data

fclean: clean reset-db
