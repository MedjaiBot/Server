import { ContainerConstants } from '@medjaibot/framework/constants/ContainerConstants';
import { EventManager } from '@medjaibot/framework/event/EventManager';
import { ContainerModule } from 'inversify';

export class EventModule extends ContainerModule {
    constructor() {
        super((bind) => {
            bind(ContainerConstants.SYSTEMS.EVENT.EVENTMANAGER).to(EventManager).inSingletonScope();
        });
    }
}
