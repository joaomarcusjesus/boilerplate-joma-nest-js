export abstract class Logger {
  abstract log(message: any, ...optionalParams: any[]): any;
  abstract error(message: any, ...optionalParams: any[]): any;
  abstract warn(message: any, ...optionalParams: any[]): any;
  abstract debug?(message: any, ...optionalParams: any[]): any;
  abstract verbose?(message: any, ...optionalParams: any[]): any;
}
