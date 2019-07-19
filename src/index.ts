import 'reflect-metadata';
import { ContainerConstants } from '../lib/framework/src/constants/ContainerConstants';
import { Logger } from '../lib/framework/src/logger/Logger';
import { Application } from './Application';
import Symbols from './constants/Symbols';
import applicationContainer from './container/container';

try {
    const application = applicationContainer.get<Application>(Symbols.APP.APPLICATION);
    application.run();
} catch (error) {
    const logger = applicationContainer.get<Logger>(ContainerConstants.LOGGING.LOGGER);
    logger.error(`An error occured: ${error}`);
}
