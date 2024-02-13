import { SnakeNamingStrategy } from '@shared/snake-naming.strategy';
import getConfig from './src/providers/configuration';
const configuration = getConfig();

module.exports = {
  type: 'postgres',
  host: configuration.db.host,
  port: configuration.db.port,
  username: configuration.db.username,
  password: configuration.db.password,
  database: configuration.db.database,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/**/*.entity{.ts,.js}'],
};
