declare namespace Express {
  interface Middleware {
    (req: Request, res: Response, next: NextFunction): void
  }
  export interface Application extends Express.Application {
    use: (...middlewares: Middleware[]) => Application
    set: (name: string, value: any) => Application
    disable: (name: string) => Application
    get: (path: string, ...middlewares: Middleware[]) => any
  }
}
