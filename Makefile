
# for init database, only once
run: 
	flask --app run init-db
# for init api 
run:
	flask --app run run --debug
# for init package.json, but only for once.
ni:
	npm install
# for download js plugins, but only once
ns:
	npm i
# start working webpack
nb:
	npm run build
