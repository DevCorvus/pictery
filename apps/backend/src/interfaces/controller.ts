import { Router } from '@core/router';

export interface Controller {
  router: Router;
  initializeRoutes(): void;
}
