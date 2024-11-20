import { DataSource } from 'typeorm';
import Material from '../entities/Material.entity';
import User from '../entities/User.entity';
import Reservation from '../entities/Reservation.entity';
import Category from '../entities/Category.entity';
import ReservedMaterial from '../entities/ReservedMaterial.entity';
import Session from '../entities/Session.entity';

export default new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [Material, User, Reservation, Category, ReservedMaterial, Session],
  synchronize: true, //à ne pas utiliser en production
  logging: ['error', 'query'], //à ne pas utiliser en production
});
