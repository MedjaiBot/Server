import { ContainerConstants } from '@medjaibot/framework/constants/ContainerConstants';
import { EventManager } from '@medjaibot/framework/event/EventManager';
import { IsNullOrUndefined } from '@medjaibot/framework/Extras';
import { Logger } from '@medjaibot/framework/logger/Logger';
import { Plugin } from '@medjaibot/framework/plugin/Plugin';
import { PluginManager } from '@medjaibot/framework/plugin/PluginManager';
import { inject, injectable } from 'inversify';

/**
 * The server application which will
 * be runned when the server starts
 *
 * @export
 * @class Application
 * @since 0.0.1
 * @version 0.0.1
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/server
 */
@injectable()
export class Application {
    /**
     * Contains the application logger
     *
     * @protected
     * @type {Logger}
     * @memberof Application
     */
    protected logger: Logger;

    /**
     * The plugin manager which will be used for all plugins
     *
     * @protected
     * @type {PluginManager}
     * @memberof Application
     */
    protected pluginManager: PluginManager;

    /**
     * The event manager to use
     *
     * @protected
     * @type {EventManager}
     * @memberof Application
     */
    protected eventManager: EventManager;

    /**
     * When is set to true the application is currently running
     *
     * @protected
     * @type {boolean}
     * @memberof Application
     */
    protected running: boolean;

    /**
     * Creates an instance of Application.
     * @param {Logger} logger The logger to use
     * @param {PluginManager} pluginManager The plugin manager for the application
     * @param {EventManager} eventManager The event manager which will be used
     * @throws When one of the parameters is null or undefined
     * @memberof Application
     */
    constructor(
        @inject(ContainerConstants.LOGGING.LOGGER)
        logger: Logger,

        @inject(ContainerConstants.SYSTEMS.PLUGIN.PLUGINMANAGER)
        pluginManager: PluginManager,

        @inject(ContainerConstants.SYSTEMS.EVENT.EVENTMANAGER)
        eventManager: EventManager,
    ) {
        if (IsNullOrUndefined(logger)) {
            throw new Error('The logger is not set');
        }
        if (IsNullOrUndefined(pluginManager)) {
            throw new Error('The plugin manager is not set');
        }
        if (IsNullOrUndefined(eventManager)) {
            throw new Error('The event manager is not set');
        }

        this.logger = logger;
        this.pluginManager = pluginManager;
        this.eventManager = eventManager;
        this.running = false;
    }

    /**
     * Runs the application and loads all the available plugins
     * from the './plugins' file directory
     *
     * @memberof Application
     */
    public async run() {
        this.running = true;
        this.logger.info(`Starting up!`);

        // Dispatch the startup event
        this.eventManager.broadcast('System.Server.Application.Run.Startup');

        // Loads all plugins from the plugins directory
        this.pluginManager.loadPlugins('./plugins');

        // Dumps the loaded plugins
        this.logger.dumpObject(`Loaded ${this.pluginManager.plugins.length} plugin(s)`, this.pluginManager.plugins);

        this.pluginManager.plugins.forEach((plugin: Plugin, index: number) => {
            if (index > 0 && index < this.pluginManager.plugins.length) {
                this.logger.info(`==========================================`);
            }

            this.logger.info(`- ${plugin.name}`);
            this.logger.info(`  ID: ${plugin.id}`);
            this.logger.info(`  From: ${plugin.author}`);
            this.logger.info(`  Version: ${plugin.version}`);
        });

        // Starts the server
        const workerId = setInterval(() => {
            if (!this.running) {
                clearInterval(workerId);
                this.logger.info('Shutting down the server!');

                return;
            }

            this.eventManager.broadcast('System.Server.Application.Run.Tick');
        }, 1000);
    }

    /**
     * Stops the server
     *
     * @memberof Application
     */
    public stop() {
        this.running = false;
    }
}
