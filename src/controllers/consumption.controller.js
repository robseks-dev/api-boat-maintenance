import ConsumptionModel from "../models/consumption.model.js";

class ConsumptionController {
  static async create(req, res) {
    const {
      date,
      route,
      boat_id,
      hours_start,
      hours_end,
      difference,
      tanking,
      value_tanking,
      tanking_total,
      pax,
      value_navigation,
      observation,
    } = req.body;
    const image =  req?.file?.buffer ? req.file.buffer : null;

    const boat = await ConsumptionModel.create({
      date,
      route,
      boat_id,
      hours_start,
      hours_end,
      difference,
      tanking,
      value_tanking,
      tanking_total,
      pax,
      value_navigation,
      observation,
      image,
    });

    if (boat) return res.json(boat);
    res.status(400).json({ message: "Consumption not created" });
  }
}

export default ConsumptionController;
