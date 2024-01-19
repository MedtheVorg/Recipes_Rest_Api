import chalk from 'chalk';

// Logger is a custom class that uses the Console API
// specifically the log function and adds styles to it
// with the help of chalk library
export default class Logger {
  public static info(...args: any) {
    console.log(
      chalk.blue(
        `[${new Date().toDateString()}] - INFO - ${chalk.blueBright(...args)}`
      )
    );
  }
  public static warn(...args: any) {
    console.log(
      chalk.hex('#FAA61A')(
        `[${new Date().toDateString()}] - WARNING - ${chalk.hex('#FAA61A')(
          ...args
        )}`
      )
    );
  }
  public static success(...args: any) {
    console.log(
      chalk.hex('#45e945')(`[${new Date().toDateString()}] - SUCCESS - ${args}`)
    );
  }
  public static error(...args: any) {
    console.log(
      chalk.red(
        `[${new Date().toDateString()}] - ERROR - ${chalk.redBright(...args)}`
      )
    );
  }
}
