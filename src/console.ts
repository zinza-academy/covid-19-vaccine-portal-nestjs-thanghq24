import { BootstrapConsole } from 'nestjs-console';
import { DivisionReaderModule } from 'src/division-reader/division-reader.module';

const bootstrap = new BootstrapConsole({
  module: DivisionReaderModule,
  useDecorators: true,
});
bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
});
