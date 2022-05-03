import { Request } from "express";
import { logger } from '../utils/logger'; 

const printRequest = (request: Request) => {
    logger.info(`Request: ${request.method} ${JSON.stringify(request.originalUrl)}`);
    logger.info(`Request: Body ${JSON.stringify(request.body)}`);
}
export default {
    printRequest
}