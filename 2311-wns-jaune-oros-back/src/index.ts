import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';

import http from 'http';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import MaterialResolver from './resolvers/material.resolver';
import datasource from './lib/datasource';
import UserResolver from './resolvers/user.resolver';
import CategoryResolver from './resolvers/category.resolver';
import ReservationResolver from './resolvers/reservation.resolver';
import User from './entities/User.entity';
import Cookies from 'cookies';
import { jwtVerify } from 'jose';
import UserService from './services/user.services';
import { customAuthChecker } from './lib/authChecker';
import ReservedMaterialResolver from './resolvers/reservedMaterial.resolver';
import SessionResolver from './resolvers/session.resolvers';

export interface MyContext {
  req: express.Request;
  res: express.Response;
  user: User | null;
  sessionId: string | null;
}

export interface Payload {
  email: string;
}

const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await buildSchema({
    resolvers: [
      MaterialResolver,
      UserResolver,
      ReservationResolver,
      CategoryResolver,
      ReservedMaterialResolver,
      SessionResolver,
    ],
    validate: false,
    authChecker: customAuthChecker,
  });

  const server = new ApolloServer({
    schema,
  });

  await datasource.initialize();
  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: [
        'http://localhost:3000',
        'http://localhost:4005',
        'https://studio.apollographql.com',
        'https://1123-jaune-1.wns.wilders.dev/',
        'https://staging.1123-jaune-1.wns.wilders.dev/',
      ],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let user: User | null = null;
        const cookies = new Cookies(req, res);
        const token = cookies.get('token');
        const sessionId = cookies.get('sessionId') || null;
        console.log('Token from cookies:', token); // Log du token récupéré
        console.log('Session ID from cookies:', sessionId); // Log du sessionId récupéré

        if (token) {
          try {
            const verify = await jwtVerify<Payload>(
              token,
              new TextEncoder().encode(process.env.SECRET_KEY),
            );
            console.log('Token verified:', verify.payload); // Log du payload du token
            user = await new UserService().findUserByEmail(
              verify.payload.email,
            );
            console.log('User found:', user); // Log de l'utilisateur récupéré
          } catch (err) {
            console.log('Error verifying token:', err);
          }
        } else {
          console.log('No token found in cookies');
        }

        return { req, res, user, sessionId };
      },
    }),
  );
  //   const { url } = await startStandaloneServer(server, {
  //   listen: { port: 4000 },
  // });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );
  console.log(`🚀 Server lancé sur http://localhost:4000/`);
}

main();
