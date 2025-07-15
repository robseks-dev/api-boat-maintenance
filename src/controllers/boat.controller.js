import BoatModel from "../models/boat.model.js";

class BoatController {
  static async getAll(req, res) {
    const boats = await BoatModel.getAll();
    if (boats) return res.json(boats);
    res.status(400).json({ message: "Boats not found" });
  }

  static async getGroup(req, res) {
    const boats = await BoatModel.getGroup();
    if (boats) return res.json(boats);
    res.status(400).json({ message: "Boats not found" });
  }

  static async create(req, res) {
    const { name, registration_number, brand, model, year, plate } = req.body;
    const boat = await BoatModel.create({ name, registration_number, brand, model, year, plate });

    if (boat) return res.json(boat);
    res.status(400).json({ message: "Boat not created" });
  }

  static async update(req, res) {
    const { name, registration_number, brand, model, year, plate } = req.body;
    const { id } = req.params;
    const result = await BoatModel.update({
      name,
      registration_number,
      brand,
      model,
      year,
      plate,
      id,
    });

    if (result) return res.json(result);
    res.status(400).json({ message: "Boat not found" });
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await BoatModel.delete({ id });

    if (result) return res.json(result);
    res.status(400).json({ message: "Boat not found" });
  }
}

export default BoatController;
