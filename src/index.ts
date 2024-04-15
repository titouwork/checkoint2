import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { CountryResolver } from './resolvers/CountryResolver';
import { DataSource } from 'typeorm';
import { startStandaloneServer } from '@apollo/server/standalone';

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entity/*.{js,ts}"],
});

async function main() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
  });

  // Démarrer le serveur avec startStandaloneServer si tu utilises Apollo Server v4.x
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server is running, GraphQL Playground available at ${url}`);
}

main().catch((error) => {
  console.error('Error starting the server', error);
});
