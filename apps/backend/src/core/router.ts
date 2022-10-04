import { RequestHandler, Router as ExpressRouter } from 'express';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'ALL';
type HttpMethodLower = 'get' | 'post' | 'put' | 'delete' | 'all';

interface RouteProps {
  method: HttpMethod;
  suffix?: string;
  middlewares?: RequestHandler[];
  handler: RequestHandler | RequestHandler[];
}

export class Router {
  private router: ExpressRouter;

  constructor(private path: string = '') {
    this.router = ExpressRouter();
  }

  setMiddlewares(...middlewares: RequestHandler[]) {
    this.router.use(middlewares);
  }

  setRoute(props: RouteProps) {
    this.router[props.method.toLowerCase() as HttpMethodLower](
      this.path + (props.suffix || ''),
      props.middlewares || [],
      props.handler
    );
  }

  getRoutes(): ExpressRouter {
    return this.router;
  }
}
