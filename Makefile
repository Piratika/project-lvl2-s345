install: 
	npm install

run:
	npx babel-node -- 'src/bin/gendiff.js' ${arg}

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

publish:
	npm publish

test:
	npm test
