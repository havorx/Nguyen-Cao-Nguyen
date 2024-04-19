import { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';
import { appConfiguration } from '../../config';
import { logger } from '../../logger';

export const sequelizeClient = new Sequelize(
  appConfiguration.postgres.connectionString,
);

export async function validateConnection() {
  try {
    await sequelizeClient.authenticate();
  } catch (error) {
    logger.error(error, 'Database connection failed');
    throw new Error('DB connection failed');
  }
}

export async function migrateSchema() {
  const umzug = new Umzug({
    storage: new SequelizeStorage({ sequelize: sequelizeClient }),
    context: sequelizeClient.getQueryInterface(),
    migrations: {
      glob: `${__dirname}/../../migrations/*.js`,
    },
    logger: {
      info: (msg) => {
        logger.info(msg);
      },
      warn: (msg) => {
        logger.warn(msg);
      },
      error: (msg) => {
        logger.error(msg);
      },
      debug: (msg: never) => {
        logger.debug(msg);
      },
    },
  });

  await umzug.up();
}
