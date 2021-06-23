import express, { Application, NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { useContainer, useExpressServer } from 'routing-controllers';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import controllers from './controllers';
import { Container } from 'typedi';

dotenv.config();

export default class App {
    private readonly app: Application;

    constructor() {
        this.app = express();
        this.app.set('port', process.env.PORT || 3001);

        this.initializeMiddleware();
        this.initializeControllers();
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Find the server at: http://localhost:${this.app.get('port')}/`); // eslint-disable-line no-console
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddleware() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        useContainer(Container);
        this.app.all('/*', (req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', process.env.APP_BASE_URL);
            res.header('Access-Control-Allow-Headers', 'X-Requested-With');
            next();
        });
        if (process.env.NODE_ENV === 'production') {
            this.app.use(express.static('client/build'));
        }
    }

    private initializeControllers() {
        useExpressServer(this.app, {
            controllers,
        });
    }
}
