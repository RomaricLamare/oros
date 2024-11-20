//backend/__tests/books-store.test.ts

import assert from 'assert';
import {
  IMockStore,
  addMocksToSchema,
  createMockStore,
} from '@graphql-tools/mock';
import { ApolloServer } from '@apollo/server';
import { buildSchemaSync } from 'type-graphql';
import { printSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import MaterialResolver from '../src/resolvers/material.resolver';
import Material from '../src/entities/Material.entity';

const materialsData: Material[] = [
  {
    id: '1',
    name: 'My Material 1',
    category: {
      id: 1,
      name: 'Category 1',
      materials: [],
      slug: 'category-1',
    },
    description: 'Description 1',
    image: 'image1.jpg',
    initial_stock: 10,
    price: 10.5,
    slug: 'my-material-1',
  },
  {
    id: '2',
    name: 'My Material 2',
    category: {
      id: 2,
      name: 'Category 2',
      materials: [],
      slug: 'category-2',
    },
    description: 'Description 2',
    image: 'image2.jpg',
    initial_stock: 20,
    price: 20.5,
    slug: 'my-material-2',
  },
];

export const LIST_MATERIALS = `#graphql
query ListMaterials {
  listMaterials {
    id
  }
}
`;
type ResponseData = {
  books: Material[];
};

let server: ApolloServer;

const baseSchema = buildSchemaSync({
  resolvers: [MaterialResolver],
  authChecker: () => true,
});

const schemaString = printSchema(baseSchema);
const schema = makeExecutableSchema({ typeDefs: schemaString });

const resolvers = (store: IMockStore) => ({
  //resolvers est une fonction qui reçoit le store en argument!
  Query: {
    listMaterials() {
      return store.get('Query', 'ROOT', 'listMaterials');
    },
  },
});

beforeAll(async () => {
  const store = createMockStore({ schema });
  server = new ApolloServer({
    schema: addMocksToSchema({
      schema: baseSchema,
      store,
      resolvers,
    }),
  });

  store.set('Query', 'ROOT', 'listMaterials', materialsData);
});

describe('Test sur les matériels', () => {
  it('Récupération des matériels depuis le store', async () => {
    const response = await server.executeOperation<ResponseData>({
      query: LIST_MATERIALS,
    });

    assert(response.body.kind === 'single');
    expect(response.body.singleResult.data).toEqual({
      listMaterials: [{ id: '1' }, { id: '2' }],
    });
  });
});
