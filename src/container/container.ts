import { Container } from 'inversify';
import { ContainerConstants } from '../../lib/framework/src/constants/ContainerConstants';
import { EventManager } from '../../lib/framework/src/event/EventManager';
import { Logger } from '../../lib/framework/src/logger/Logger';
import { LogLevel } from '../../lib/framework/src/logger/LogLevel';
import { PluginManager } from '../../lib/framework/src/plugin/PluginManager';
import { Application } from '../Application';
import Symbols from '../constants/Symbols';

export const bindApplication = (container: Container) => {
    container.bind(Symbols.APP.APPLICATION).to(Application);
};

export const bindLogger = (container: Container) => {
    container.bind(ContainerConstants.LOGGING.STREAMS.OUT).toConstantValue(process.stdout);
    container.bind(ContainerConstants.LOGGING.STREAMS.ERROR).toConstantValue(process.stderr);
    container.bind(ContainerConstants.LOGGING.LOGLEVEL).toConstantValue(LogLevel.ALL);
    container.bind(ContainerConstants.LOGGING.LOGGER).to(Logger);
};

export const bindPluginManager = (container: Container) => {
    container.bind(ContainerConstants.SYSTEMS.PLUGIN.PLUGINMANAGER).to(PluginManager);
};

export const bindEventManager = (container: Container) => {
    container.bind(ContainerConstants.SYSTEMS.EVENT.EVENTMANAGER).toConstantValue(eventManager);
};

const applicationContainer = new Container();
const eventManager = new EventManager();

bindApplication(applicationContainer);
bindLogger(applicationContainer);
bindPluginManager(applicationContainer);
bindEventManager(applicationContainer);

// Bind the container to itself
applicationContainer.bind(ContainerConstants.DI.CONTAINER).toConstantValue(applicationContainer);

export default applicationContainer;
