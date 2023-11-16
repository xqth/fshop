import sequelize from './config/sequelize';
import app from './app';
import { APP_PORT } from './config/app';
import logger from './utils/logger';
import './utils/associations';

try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
    app.listen(APP_PORT, () => logger.info(`Server is running on port ${APP_PORT}`));
} catch (error) {
    logger.error('Unable to connect to the database:' + error);
    process.exit(1);
}
