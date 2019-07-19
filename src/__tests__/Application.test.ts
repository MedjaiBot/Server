import 'reflect-metadata';
import { EventManager } from '../../lib/framework/src/event/EventManager';
import { Logger } from '../../lib/framework/src/logger/Logger';
import { PluginManager } from '../../lib/framework/src/plugin/PluginManager';
import { Application } from '../Application';

const pluginManagerPath = '../../lib/framework/src/plugin/PluginManager';
const eventManagerPath = '../../lib/framework/src/event/EventManager';
const loggerPath = '../../lib/framework/src/logger/Logger';

jest.mock(pluginManagerPath);
jest.mock(eventManagerPath);
jest.mock(loggerPath);

describe('Application', () => {
    let application: Application;
    let loggerMock: Logger;
    let pluginManagerMock: PluginManager;
    let eventManager: EventManager;

    beforeEach(() => {
        loggerMock = jest.genMockFromModule<Logger>(loggerPath);
        eventManager = new EventManager();
        pluginManagerMock = jest.genMockFromModule<PluginManager>(pluginManagerPath);
        pluginManagerMock.loadPlugins = async (directory: string) => {
            // Nothing to do!
        };

        application = new Application(
            loggerMock,
            pluginManagerMock,
            eventManager,
        );
    });

    it('should be instantiable', () => {
        expect(application).toBeInstanceOf(Application);
    });

    it('should run without errors', () => {
        expect(() => {
            application.run();
        }).not.toThrow();
    });

    it('should have called the loadPlugins method on the plugin manager', () => {
        const loadPluginsSpy = jest.spyOn(pluginManagerMock, 'loadPlugins');

        expect(() => {
            application.run();
        }).not.toThrow();
        expect(loadPluginsSpy).toHaveBeenCalled();
    });
});
