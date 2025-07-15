import MaintenanceModel from "../models/maintenance.model.js";

class MaintenanceController {
  static async getAll(req, res) {
    const maintenances = await MaintenanceModel.getAll();
    if (maintenances) return res.json(maintenances);
    res.status(400).json({ message: "Maintenances not found" });
  }

  static async getByPart(req, res) {
    const { id } = req.params;
    const maintenances = await MaintenanceModel.getByPart({ id });

    if (maintenances) return res.json(maintenances);
    res.status(400).json({ message: "Maintenances not found" });
  }

  static async getCountByPart(req, res) {
    const { id } = req.params;
    const maintenances = await MaintenanceModel.getCountByPart({ id });

    if (maintenances) return res.json(maintenances);
    res.status(400).json({ message: "Maintenances not found" });
  }

  static async create(req, res) {
    const {
      date,
      hours_navigation,
      description,
      report,
      periodicity_id,
      value,
      result,
      part_id,
      boat_id,
    } = req.body;
    const evidence = req?.file?.buffer ? req.file.buffer : null;

    const maintenance = await MaintenanceModel.create({
      date,
      hours_navigation,
      description,
      report,
      result,
      value,
      periodicity_id,
      part_id,
      boat_id,
      evidence,
    });

    if (maintenance) return res.json(maintenance);
    res.status(400).json({ message: "Maintenance not created" });
  }

  static async generateInvoice(req, res) {
    const { part, date_start, date_end } = req.body;
    const maintenances = await MaintenanceModel.generateInvoice({ part, date_start, date_end });

    if (maintenances) return res.json(maintenances);
    res.status(400).json({ message: "Maintenances not found" });
  }
}

export default MaintenanceController;
