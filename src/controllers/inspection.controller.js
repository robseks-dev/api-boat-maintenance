import InspectionModel from "../models/inspection.model.js";

class InspectionController {
  static async getBoatToday(req, res) {
    const inspection = await InspectionModel.getBoatToday();
    if (inspection) return res.json(inspection);
    res.status(400).json({ message: "Inspections not found" });
  }

  static async getBoatByDate(req, res) {
    const { date } = req.body;
    const inspection = await InspectionModel.getBoatByDate({ date });

    if (inspection) return res.json(inspection);
    res.status(400).json({ message: "Inspections not found" });
  }

  static async getPassengerToday(req, res) {
    const inspection = await InspectionModel.getPassengerToday();
    if (inspection) return res.json(inspection);
    res.status(400).json({ message: "Inspections not found" });
  }

  static async getPassengerByDate(req, res) {
    const { date } = req.body;
    const inspection = await InspectionModel.getPassengerByDate({ date });

    if (inspection) return res.json(inspection);
    res.status(400).json({ message: "Inspections not found" });
  }

  static async createBoat(req, res) {
    const { title, description, value, date } = req.body;
    const inspection = await InspectionModel.createBoat({ title, description, value, date });

    if (inspection) return res.json(inspection);
    res.status(400).json({ message: "Inspection not created" });
  }

  static async createPassenger(req, res) {
    const { title, description, value } = req.body;
    const inspection = await InspectionModel.createPassenger({ title, description, value });

    if (inspection) return res.json(inspection);
    res.status(400).json({ message: "Inspection not created" });
  }

  static async createAccident(req, res) {
    const { boat_id, description, operation, immediate_action, corrective_action, username } =
      req.body;
    const inspection = await InspectionModel.createAccident({
      boat_id,
      description,
      operation,
      immediate_action,
      corrective_action,
      username,
    });

    if (inspection) return res.json(inspection);
    res.status(400).json({ message: "Inspection not created" });
  }
}

export default InspectionController;
