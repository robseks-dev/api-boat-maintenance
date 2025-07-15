import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import BoatRoutes from "./routes/boat.routes.js";
import PartRoutes from "./routes/part.routes.js";
import ConsumptionRoutes from "./routes/consumption.routes.js";
import StatisticsRoutes from "./routes/statistics.routes.js";
import PeriodicityRoutes from "./routes/periodicity.routes.js";
import MaintenanceRoutes from "./routes/maintenance.routes.js";
import InspectionRoutes from "./routes/inspection.route.js";
import UserRoutes from "./routes/user.routes.js";
import AuthRoutes from "./routes/auth.routes.js";

import handleGlobalError from "./middlewares/error.controller.js";

const app = express();

const whitelist = ["https://boraboraboat.app", "https://boraboraboat.app/"];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(`INTENTO DE ACCESO DESDE ORIGEN: ${origin}`);
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.log("CORS ERROR: Origen no permitido ->", origin);
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/boats", BoatRoutes);
app.use("/api/v1/parts", PartRoutes);
app.use("/api/v1/consumptions", ConsumptionRoutes);
app.use("/api/v1/statistics", StatisticsRoutes);
app.use("/api/v1/periodicities", PeriodicityRoutes);
app.use("/api/v1/maintenances", MaintenanceRoutes);
app.use("/api/v1/inspection", InspectionRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/auth", AuthRoutes);

app.use(handleGlobalError);

try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  console.error(err);
}
