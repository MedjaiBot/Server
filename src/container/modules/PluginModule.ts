import { ContainerConstants } from '@medjaibot/framework/constants/ContainerConstants';
import { PluginManager } from '@medjaibot/framework/plugin/PluginManager';
import { ContainerModule } from 'inversify';

export class PluginModule extends ContainerModule {
    constructor() {
        super((bind) => {
            bind(ContainerConstants.SYSTEMS.PLUGIN.PLUGINMANAGER).to(PluginManager).inSingletonScope();
        });
    }
}
