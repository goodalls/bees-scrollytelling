/* eslint-disable */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const path = require('path');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));
app.set('port', process.env.PORT || 3001);
app.locals.title = 'bees-scrollytelling';

app.get('/', (request, response) => {});

app.get('/api/v1/answers', (request, response) => {
  database('bees')
    .select()
    .then(answers => {
      return response.status(200).send(answers);
    })
    .catch(error => {
      return response.status(500).send({ error: 'something went wrong!' });
    });
});

app.post('/api/v1/users', async (request, response) => {
  const requiredArr = ['concern', 'age', 'location'];
  for (let param of requiredArr) {
    if (!request.body[param]) {
      return response.status(422).send({
        error: `Expected request body to have format {concern: <string>, age: <string>, location: <object>}, missing ${param}`
      });
    }
  }
  try {
    const { concern, age, location } = request.body;
    const id = await database('users').insert({ concern, age, location }, 'id');
    return response.status(201).send({ id: id[0] });
  } catch (error) {
    return response.status(500).error({ error: 'something went wrong!' });
  }
});

app.post('/api/v1/answers', async (request, response) => {
  const requiredArr = ['users_id', 'user_answer', 'question'];
  for (let param of requiredArr) {
    if (!request.body[param]) {
      return response.status(422).send({
        error: `Expected request body to have format {users_id: <number>, user_answer: <string>, question: <string>}, missing ${param}`
      });
    }
  }
  try {
    const { users_id, user_answer, question } = request.body;
    const id = await database('bees').insert(
      { users_id, user_answer, question },
      'id'
    );
    return response.status(201).send({ id: id[0] });
  } catch (error) {
    return response.status(500).send({ error: 'something went wrong! ' });
  }
});

app.use((request, response) => {
  response.status(404).send('Sorry can\'t find that!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
