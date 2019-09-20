import { ContainerConstants } from '@medjaibot/framework/constants/ContainerConstants';
import { Logger } from '@medjaibot/framework/logger/Logger';
import { LogLevel } from '@medjaibot/framework/logger/LogLevel';
import { ContainerModule } from 'inversify';

export class LoggerModule extends ContainerModule {
    constructor() {
        super((bind) => {
            bind(ContainerConstants.LOGGING.STREAMS.OUT).toConstantValue(process.stdout);
            bind(ContainerConstants.LOGGING.STREAMS.ERROR).toConstantValue(process.stderr);
            bind(ContainerConstants.LOGGING.LOGLEVEL).toConstantValue(LogLevel.ALL);
            bind(ContainerConstants.LOGGING.LOGGER).to(Logger);
        });
    }
}
