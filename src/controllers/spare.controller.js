import SpareModel from "../models/spare.model.js";

class SpareController {
  static async getAll(req, res) {
    const spares = await SpareModel.getAll();
    if (spares) return res.json(spares);
    res.status(400).json({ message: "Spares not found" });
  }

  static async create(req, res) {
    const { name, description, type, quantity, location, value, entry_date, status } = req.body;
    const spare = await SpareModel.create({
      name,
      description,
      type,
      quantity,
      location,
      value,
      entry_date,
      status,
    });

    if (spare) return res.json(spare);
    res.status(400).json({ message: "Spare not created" });
  }

  static async update(req, res) {
    const { name, description, type, quantity, location, value, entry_date, status } = req.body;
    const { id } = req.params;
    const result = await SpareModel.update({
      name,
      description,
      type,
      quantity,
      location,
      value,
      entry_date,
      status,
      id,
    });

    if (result) return res.json(result);
    res.status(400).json({ message: "Spare not found" });
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await SpareModel.delete({ id });

    if (result) return res.json(result);
    res.status(400).json({ message: "Spare not found" });
  }
}

export default SpareController;
