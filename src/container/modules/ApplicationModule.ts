import { ContainerModule } from 'inversify';
import { Application } from '../../Application';
import Symbols from '../../constants/Symbols';

export class ApplicationModule extends ContainerModule {
    constructor() {
        super((bind) => {
            bind(Symbols.APP.APPLICATION).to(Application).inSingletonScope();
        });
    }
}
