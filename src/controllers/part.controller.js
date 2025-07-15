import PartModel from "../models/part.model.js";

class PartController {
  static async getAll(req, res) {
    const parts = await PartModel.getAll();
    if (parts) return res.json(parts);
    res.status(400).json({ message: "Parts not found" });
  }

  static async getGroup(req, res) {
    const parts = await PartModel.getGroup();
    if (parts) return res.json(parts);
    res.status(400).json({ message: "Parts not found" });
  }

  static async getByBoat(req, res) {
    const { id } = req.params;
    const parts = await PartModel.getByBoat({ id });

    if (parts) return res.json(parts);
    res.status(400).json({ message: "Parts not found" });
  }

  static async getKeysByBoat(req, res) {
    const { id } = req.params;
    const parts = await PartModel.getKeysByBoat({ id });

    if (parts) return res.json(parts);
    res.status(400).json({ message: "Parts not found" });
  }

  static async create(req, res) {
    const { name, description, serial_number, boat_id } = req.body;
    const part = await PartModel.create({ name, description, serial_number, boat_id });

    if (part) return res.json(part);
    res.status(400).json({ message: "Part not created" });
  }

  static async update(req, res) {
    const { name, description, serial_number } = req.body;
    const { id } = req.params;
    const result = await PartModel.update({ name, description, serial_number, id });

    if (result) return res.json(result);
    res.status(400).json({ message: "Part not created" });
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await PartModel.delete({ id });

    if (result) return res.json(result);
    res.status(400).json({ message: "Part not found" });
  }
}

export default PartController;
