import { nativeLogger } from '../../logging';

export class ProcessErrorHandling {
  static shutDownGracefully = (signal: string, error: any) => {
    this.LogError(signal, error);
    const exitType = signal === 'SIGTERM' ? 0 : 1;
    process.exit(exitType);
  };

  static LogError(signal: string, error: any) {
    let errorMessage = '\n**************************\n\n';
    errorMessage += `Received ${signal}. Shutting down gracefully\n`;
    const commonErrorsMessage = this.composeCommonErrorsMessage(error);
    if (commonErrorsMessage) {
      errorMessage += commonErrorsMessage;
    } else {
      errorMessage += '\nPROCESS ERROR HANDLING - ERROR NOT IDENTIFIED, THIS IS THE NATIVE ERROR: \n\n';
      errorMessage += `ERROR.MESSAGE: ${error.message} \n\n`;
      errorMessage += `ERROR.STACK: ${error.stack} \n\n`;
    }
    errorMessage += '\n**************************';
    nativeLogger.info('\x1b[33m%s\x1b[0m', errorMessage);
  }

  static setEventListeners() {
    process.on('uncaughtException', (err) => this.shutDownGracefully('uncaughtException', err));
    process.on('unhandledRejection', (err) => this.shutDownGracefully('unhandledRejection', err));
    process.on('SIGINT', () => this.shutDownGracefully('SIGINT', null));
    process.on('SIGTERM', () => this.shutDownGracefully('SIGTERM', null));
    process.on('SIGQUIT', () => this.shutDownGracefully('SIGQUIT', null));
  }

  static composeCommonErrorsMessage = (error: any) => {
    let errorLog = '\nPROCESS ERROR HANDLING - ERROR IDENTIFIED: \n';
    if (!error) {
      errorLog += "description: the process wasn't stop by an error but by SIG command \n";
      return errorLog;
    }
    switch (error.message) {
      case 'Operation `jobs-development.createIndex()` buffering timed out after 10000ms':
        errorLog += 'NAME: mongodb connection timeout \n';
        errorLog += 'DESCRIPTION: check the mongo connection string and mongodb demon is running if you run it locally \n';
        break;
      case 'CONFIG_VALIDATION_ERROR':
        errorLog += 'NAME: config validation error \n';
        errorLog += 'DESCRIPTION: check the config file and \n';
        errorLog += `DETAILS: ${JSON.stringify(error.errorData)} \n`;
        break;
      default:
        return null;
    }
    return errorLog;
  };
}
