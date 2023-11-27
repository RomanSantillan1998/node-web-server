import express, { Router } from 'express';

interface Options {
  port: number,
  publicPath?: string,
  routes: Router,
}

export class Server {

  private readonly app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor( options: Options ) {
    const { port, routes, publicPath = 'public' } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {

    //* MIDDLEWARES
    this.app.use( express.json() );
    this.app.use( express.urlencoded({ extended: true }) ) // x-www-form-urlencoded

    //* ROUTES
    this.app.use( this.routes );

    this.app.listen( this.port, () => {
      console.log(`Server running on port ${this.port}`);
    })

  }

}