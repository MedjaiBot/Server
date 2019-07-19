import 'reflect-metadata';

import { ContainerConstants } from '@medjaibot/framework/constants/ContainerConstants';
import { Logger } from '@medjaibot/framework/logger/Logger';
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
