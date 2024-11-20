import { DataSource } from 'typeorm';
import Material from '../entities/Material.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  database: 'oros',
  username: 'utilisateur',
  password: 'oros',
  entities: [Material],
  synchronize: true, //à ne pas utiliser en production
  logging: ['error', 'query'], //à ne pas utiliser en production
});
