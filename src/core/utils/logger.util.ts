/** biome-ignore-all lint/suspicious/noConsole: <Logger File> */
import __ENV__ from '@constant/env.const.ts'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'
type LogColor = '\x1b[36m' | '\x1b[32m' | '\x1b[33m' | '\x1b[31m'

interface LoggerOptions {
  prefix?: string
  environment?: string
  isServer?: boolean
}

interface LogConfig {
  level: LogLevel
  color: LogColor
  method: LogLevel
}

class LoggerUtil {
  private readonly prefix: string
  private readonly environment: string
  private readonly isServer: boolean

  private readonly logConfigs: Record<LogLevel, LogConfig> = {
    debug: { level: 'debug', color: '\x1b[36m', method: 'debug' },
    info: { level: 'info', color: '\x1b[32m', method: 'info' },
    warn: { level: 'warn', color: '\x1b[33m', method: 'warn' },
    error: { level: 'error', color: '\x1b[31m', method: 'error' },
  }

  constructor(options: LoggerOptions = {}) {
    this.prefix = options.prefix ?? __ENV__.APP.PREFIX
    this.environment = options.environment ?? __ENV__.CONFIG.ENV
    this.isServer = options.isServer ?? typeof window === 'undefined'
  }

  private getTime(): string {
    try {
      return new Date().toLocaleString('en-US', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: __ENV__.CONFIG.TIMEZONE,
      })
    } catch (error: unknown) {
      console.warn('Failed to format time with locale:', error)
      return new Date().toISOString()
    }
  }

  private shouldLog(): boolean {
    return ['development', 'staging'].includes(this.environment.toLowerCase())
  }

  private formatMessage(level: LogLevel, message: unknown): string {
    const formattedMessage = typeof message === 'string' ? message : JSON.stringify(message, null, 2)
    return `[${level.toUpperCase()}][${this.getTime()}] - ${formattedMessage}`
  }

  private formatArgs(args: unknown[]): string {
    return args.length > 0 ? `\nArguments: ${JSON.stringify(args, null, 2)}` : ''
  }

  private mapColorToCSS(color: LogColor): string {
    switch (color) {
      case '\x1b[36m':
        return '#00CED1' // Cyan
      case '\x1b[32m':
        return '#32CD32' // LimeGreen
      case '\x1b[33m':
        return '#FFD700' // Gold
      case '\x1b[31m':
        return '#FF4500' // OrangeRed
      default:
        return '#000000' // Fallback
    }
  }

  private log(level: LogLevel, message: unknown, ...args: unknown[]): void {
    try {
      if (!this.shouldLog() && level !== 'error') return

      const config = this.logConfigs[level]
      const formattedMessage = this.formatMessage(level, message)
      const formattedArgs = this.formatArgs(args)

      if (this.isServer) {
        console[config.method](`${config.color}%s\x1b[0m`, formattedMessage + formattedArgs)
      } else {
        const css = `color: ${this.mapColorToCSS(config.color)}; font-weight: bold;`
        console[config.method](`%c${formattedMessage}${formattedArgs}`, css)
      }
    } catch (error) {
      console.error('LoggerUtil error:', error)
    }
  }

  debug(message: unknown, ...args: unknown[]): void {
    this.log('debug', message, ...args)
  }

  info(message: unknown, ...args: unknown[]): void {
    this.log('info', message, ...args)
  }

  warn(message: unknown, ...args: unknown[]): void {
    this.log('warn', message, ...args)
  }

  error(message: unknown, error?: unknown, ...args: unknown[]): void {
    try {
      const errorDetails = error instanceof Error ? `\nError: ${error.message}\nStack: ${error.stack}` : error
      this.log('error', message, ...args)
      if (error) {
        if (this.isServer) {
          console.error(errorDetails)
        } else {
          console.error('%c' + errorDetails, 'color: #FF4500; font-weight: bold;')
        }
      }
    } catch (err) {
      console.error('LoggerUtil error:', err)
    }
  }

  time(label: string): void {
    if (!this.shouldLog()) return
    try {
      console.time(`${this.prefix} - ${label}`)
    } catch (error) {
      console.error('LoggerUtil time error:', error)
    }
  }

  timeEnd(label: string): void {
    if (!this.shouldLog()) return
    try {
      console.timeEnd(`${this.prefix} - ${label}`)
    } catch (error) {
      console.error('LoggerUtil timeEnd error:', error)
    }
  }

  table(data: unknown, columns?: string[]): void {
    if (!this.shouldLog()) return
    try {
      console.table(data, columns)
    } catch (error) {
      console.error('LoggerUtil table error:', error)
      console.log(data) // Fallback
    }
  }
}

// Tạo instance mặc định
const logger = new LoggerUtil()

// Export singleton instance
export default logger

// Export class để có thể tạo instance với config khác
export { LoggerUtil, type LoggerOptions }
