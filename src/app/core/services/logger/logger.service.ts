import { Injectable } from '@angular/core';
import { LoggerType } from '../../enums/logger.enums';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  // We can use this logger service to send context to our monitoring tools such as example Sentry
  constructor() {}

  info(message: string): void {
    console.log(`[${LoggerType.INFO}] ${message}`);
  }

  success(message: string): void {
    console.log(`[${LoggerType.SUCCESS}] ${message}`);
  }

  error(message: string): void {
    console.error(`[${LoggerType.ERROR}] ${message}`);
  }
}
