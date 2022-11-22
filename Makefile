install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	npm test -s -- --watch