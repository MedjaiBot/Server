import { ContainerConstants } from '@medjaibot/framework/constants/ContainerConstants';
import { Container } from 'inversify';
import { ApplicationModule } from './modules/ApplicationModule';
import { EventModule } from './modules/EventModule';
import { LoggerModule } from './modules/LoggerModule';
import { PluginModule } from './modules/PluginModule';

const applicationContainer = new Container();

applicationContainer.load(new LoggerModule());
applicationContainer.load(new PluginModule());
applicationContainer.load(new EventModule());
applicationContainer.load(new ApplicationModule());

// Bind the container to itself
applicationContainer.bind(ContainerConstants.DI.CONTAINER).toConstantValue(applicationContainer);

export default applicationContainer;
