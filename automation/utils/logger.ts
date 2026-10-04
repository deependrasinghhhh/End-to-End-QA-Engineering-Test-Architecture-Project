export class Logger {
  static info(message: string, context?: any) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [INFO] ${message}`, context !== undefined ? context : '');
  }

  static warn(message: string, context?: any) {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] [WARN] ${message}`, context !== undefined ? context : '');
  }

  static error(message: string, error?: any) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [ERROR] ${message}`, error !== undefined ? error : '');
  }
}
