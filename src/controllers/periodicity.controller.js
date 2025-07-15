import PeriodicityModel from "../models/periodicity.model.js";

class PeriodicityController {
  static async getAll(req, res) {
    const maintenances = await PeriodicityModel.getAll();
    if (maintenances) return res.json(maintenances);
    res.status(400).json({ message: "Maintenances not found" });
  }
  
  static async create(req, res) {
    const { description, date, periodicity, type, parts } = req.body;
    const maintenance = await PeriodicityModel.create({
      description,
      date,
      periodicity,
      type,
      parts,
    });

    if (maintenance) return res.json(maintenance);
    res.status(400).json({ message: "Maintenance not created" });
  }
}

export default PeriodicityController;
