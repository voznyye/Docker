pip:
	pip install -r ./requirements.txt

nf: 
	flask --app run init-db

run:
	flask --app run run --debug

ni:
	npm install

ns:
	npm i

nb:
	npm run start
