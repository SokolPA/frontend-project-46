install:
	npm ci

test:
	npm test

test-coverage:
	npm test --coverage

run:
	node bin/gendiff.js __fixtures__/file1.json	__fixtures__/file2.json

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .