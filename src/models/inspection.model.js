import { pool } from "../config/database.config.js";
import { format } from "date-fns";

class InspectionModel {
  static async getBoatToday() {
    const [rows] = await pool.query("SELECT * FROM inspection_boat WHERE date = ?", [
      format(new Date(), "yyyy-MM-dd"),
    ]);

    return rows;
  }

  static async getPassengerToday() {
    const [rows] = await pool.query("SELECT * FROM inspection_passenger WHERE date = ?", [
      format(new Date(), "yyyy-MM-dd"),
    ]);

    return rows;
  }

  static async createBoat({ description, value, date }) {
    const [result] = await pool.query(
      "INSERT INTO inspection_boat (description, value, date) VALUES (?, ?, ?)",
      [description, value, date]
    );

    return { id: result.insertId, description, value, date };
  }

  static async createPassenger({ description, value }) {
    const [result] = await pool.query(
      "INSERT INTO inspection_passenger (description, value) VALUES (?, ?)",
      [description, value]
    );

    return { id: result.insertId, description, value, date };
  }

  static async createAccident({
    boat_id,
    description,
    operation,
    immediate_action,
    corrective_action,
    username,
  }) {
    const [result] = await pool.query(
      "INSERT INTO inspection_accidents (boat_id, description, operation, immediate_action, corrective_action, username) VALUES (?, ?, ?, ?, ?, ?)",
      [boat_id, description, operation, immediate_action, corrective_action, username]
    );

    return {
      id: result.insertId,
      boat_id,
      description,
      operation,
      immediate_action,
      corrective_action,
      username,
    };
  }
}

export default InspectionModel;
