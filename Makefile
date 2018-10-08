install: 
	npm install

run:
	npx babel-node -- 'src/bin/gendiff.js' 10
start:
	npm run babel-node -- src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

publish:
	npm publish

