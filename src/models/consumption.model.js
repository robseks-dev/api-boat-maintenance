import { pool } from "../config/database.config.js";

class ConsumptionModel {
  static async create({
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
  }) {
    const [result] = await pool.query(
      "INSERT INTO consumptions (date, route, boat_id, hours_start, hours_end, difference, tanking, value_tanking, tanking_total, pax, value_navigation, observation, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
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
      ]
    );

    return { id: result.insertId };
  }
}

export default ConsumptionModel;
