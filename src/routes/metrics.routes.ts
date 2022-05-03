import * as express from "express";
import metrics from "../controllers/metrics.contoller";

const router = express.Router({ caseSensitive: true });

router.get("/", metrics.getMetrics);
router.get("/register", metrics.registerMetrics)
router.post("/calculate", metrics.calulate); 


export default router;
