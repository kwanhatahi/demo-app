import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import { logger } from './utils/logger';
import metricsRoutes from './routes/metrics.routes'; 


const port = 3000;

const app = express();
app.use(cors());
app.use(
  bodyParser.json({
    limit: '50mb',
  })
);
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  })
);
app.set('case sensitive routing', true);

const server = app.listen(port, () =>
  logger.info(`Demo app listening on local port ${port}!`)
); 
 
app.use('/metrics', metricsRoutes);

