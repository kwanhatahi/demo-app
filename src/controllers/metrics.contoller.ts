import { Request, Response } from "express";
import { logger } from "../utils/logger";
import loggerHelper from "../utils/logger-helper";
const promClient = require('prom-client');

const handleError = (axiosError: any, response: Response) => {
    if (axiosError.response) {
        logger.error(JSON.stringify(axiosError.response.data));
        response.status(axiosError.response.status).json(axiosError.response.data);
    } else {
        logger.error(JSON.stringify(axiosError.message));
        const result = {
            resultCode: "50000",
            resultDescription: "Internal Server Error",
            diagnosticMessage: "Internal Server Error",
        };
        logger.error(JSON.stringify(result, null, 2));
        response.status(500).json(result);
    }
};

/*
const counter = new Counter({
    key: 'demo_app_http_requests_total',
    name: 'demo_app_http_requests_total',
    help: 'Total number of http requests',
    labelNames: ['method'],
});
*/

const registry = new promClient.Registry();

const counter = new promClient.Counter({
    name: 'demo_app_http_requests_total',
    help: 'Total number of http requests'
    //labelNames: ['method'],
});

const multiple: any = (num1: number, num2: number) => {
    return num1 * num2;
}

const getMetrics = async (request: Request, response: Response) => {
    try {
        loggerHelper.printRequest(request);
        response.set('Content-Type', registry.contentType);
       // response.send(await registry.metrics());
        logger.info(`all: ${await registry.metrics()}`);
        response.send(await registry.metrics());
        //response.end(await promClient.register.getSingleMetricAsString('demo_app_http_requests_total'));
        // logger.info(`Get metrics :  ${await promClient.register.getSingleMetricAsString('demo_app_http_requests_total')}`);
        // response.send(promClient.register.metrics());
    } catch (err) {
        handleError(err, response);
    }
};

const calulate = async (request: Request, response: Response) => {
    try {
        loggerHelper.printRequest(request);
        const resultNumber = multiple(request.body.number1, request.body.number2);
        // counter.inc({ method: 'POST' })

        counter.inc();
        response.send(`Result is ${resultNumber}!\n`);
    } catch (err) {
        handleError(err, response);
    }
};

const registerMetrics = async (request: Request, response: Response) => {
    try {
        loggerHelper.printRequest(request);
        registry.registerMetric(counter);
        response.set('Content-Type', registry.contentType);
        response.send(await registry.metrics());
    } catch (err) {
        handleError(err, response);
    }
};

export default {
    getMetrics,
    calulate,
    registerMetrics
}