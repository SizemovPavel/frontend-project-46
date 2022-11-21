install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

jest:
	npx -n --experimental-vm-modules jest