import 'reflect-metadata';

import { ContainerConstants } from '@medjaibot/framework/constants/ContainerConstants';
import { Logger } from '@medjaibot/framework/logger/Logger';
import { InitializationSide } from '@medjaibot/framework/plugin/InitializationSide';
import { Application } from './Application';
import Symbols from './constants/Symbols';
import applicationContainer from './container/container';

// Bind the initialization side
applicationContainer.bind<InitializationSide>(
    ContainerConstants.SYSTEMS.PLUGIN.INITIALIZATIONSIDE,
).toConstantValue(
    InitializationSide.SERVER,
);

try {
    const application = applicationContainer.get<Application>(Symbols.APP.APPLICATION);
    application.run();
} catch (error) {
    const logger = applicationContainer.get<Logger>(ContainerConstants.LOGGING.LOGGER);
    logger.error(`An error occured: ${error}`);
}
