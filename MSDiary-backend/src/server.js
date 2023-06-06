import Hapi from '@hapi/hapi';
import routes from './routes';
import { db } from './database';
import HapiCors from 'hapi-cors';

import * as admin from 'firebase-admin';
import credentials from '../credentials.json';

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const start = async () => {
  const server = Hapi.server({
    port: 8000,
    host: 'localhost',
  });

  await server.register({
    plugin: HapiCors,
    options: {
      origins: ['http://localhost:4200'], // allow requests from this origin
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // specify allowed HTTP methods
      headers: ['Access-Control', 'Accept, Content-Type, User-Agent', 'authtoken'], // specify allowed headers
    },
  });

  routes.forEach((route) => server.route(route));

  db.connect();
  await server.start();
  console.log(`Server is listening on ${server.info.uri}`);

  process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
  });

  process.on('SIGINT', async () => {
    console.log('Stopping server....');

    await server.stop({ timeout: 10000 });

    db.end();
    console.log('Server stopped');
    process.exit(0);
  });
};

start();







