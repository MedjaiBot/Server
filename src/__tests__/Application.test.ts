import 'reflect-metadata';

import { EventManager } from '@medjaibot/framework/event/EventManager';
import { Logger } from '@medjaibot/framework/logger/Logger';
import { PluginManager } from '@medjaibot/framework/plugin/PluginManager';
import { Container } from 'inversify';
import { Application } from '../Application';

const pluginManagerPath = '@medjaibot/framework/plugin/PluginManager';
const eventManagerPath = '@medjaibot/framework/event/EventManager';
const loggerPath = '@medjaibot/framework/logger/Logger';

jest.mock(pluginManagerPath);
jest.mock(eventManagerPath);
jest.mock(loggerPath);

describe('Application', () => {
    let application: Application;
    let loggerMock: Logger;
    let pluginManagerMock: PluginManager;
    let eventManager: EventManager;
    let container: Container;

    beforeEach(() => {
        loggerMock = jest.genMockFromModule<Logger>(loggerPath);
        loggerMock.info = jest.fn();

        eventManager = new EventManager();

        pluginManagerMock = jest.genMockFromModule<PluginManager>(pluginManagerPath);
        pluginManagerMock.plugins = [];
        pluginManagerMock.loadPlugins = async (directory: string) => {
            // Nothing to do!
        };

        container = jest.genMockFromModule<Container>('inversify');

        application = new Application(
            loggerMock,
            pluginManagerMock,
            eventManager,
            container,
        );
    });

    it('should be instantiable', () => {
        expect(application).toBeInstanceOf(Application);
    });

    it('should run without errors', () => {
        expect(() => application.run).not.toThrow();
    });
});
