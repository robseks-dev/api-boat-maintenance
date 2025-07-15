import { pool } from "../config/database.config.js";

class StatisticsModel {
  static async getByMonth({ boat, date }) {
    const [rows] = await pool.query(
      "WITH RECURSIVE calendar AS (SELECT DATE_FORMAT(?, '%Y-%m-01') AS `date` UNION ALL SELECT DATE_ADD(`date`, INTERVAL 1 DAY) FROM calendar WHERE MONTH(`date`) = MONTH(?) AND YEAR(`date`) = YEAR(?) AND `date` < LAST_DAY(?)) SELECT DATE_FORMAT(c.`date`, '%M, %d') AS `date`, IFNULL(SUM(CASE WHEN ? IS NULL OR t.boat_id = ? THEN t.tanking_total ELSE 0 END), 0) AS tanking_total, IFNULL(SUM(CASE WHEN ? IS NULL OR t.boat_id = ? THEN t.value_navigation ELSE 0 END), 0) AS value_navigation, IFNULL(SUM(CASE WHEN (? IS NULL OR m.boat_id = ?) AND p.type = 'Preventiva' THEN m.value ELSE 0 END), 0) AS value_maintenance_preventive, IFNULL(SUM(CASE WHEN (? IS NULL OR m.boat_id = ?) AND p.type = 'Correctiva' THEN m.value ELSE 0 END), 0) AS value_maintenance_corrective FROM calendar c LEFT JOIN consumptions t ON DATE(t.`date`) = c.`date` LEFT JOIN maintenances m ON DATE(m.`date`) = c.`date` LEFT JOIN periodicities p ON p.id = m.periodicity_id GROUP BY c.`date` ORDER BY c.`date`",
      [date, date, date, date, boat, boat, boat, boat, boat, boat, boat, boat]
    );
    return rows;
  }

  static async getByYear({ boat, date }) {
    const [rows] = await pool.query(
      "WITH RECURSIVE calendar AS (SELECT DATE_FORMAT(?, '%Y-01-01') AS `date` UNION ALL SELECT DATE_ADD(`date`, INTERVAL 1 MONTH) FROM calendar WHERE `date` < DATE_FORMAT(?, '%Y-12-01')), monthly_consumptions AS (SELECT DATE_FORMAT(`date`, '%Y-%m-01') AS month, SUM(CASE WHEN (? IS NULL OR boat_id = ?) THEN tanking_total ELSE 0 END) AS tanking_total, SUM(CASE WHEN (? IS NULL OR boat_id = ?) THEN value_navigation ELSE 0 END) AS value_navigation FROM consumptions GROUP BY month), monthly_maintenances AS (SELECT DATE_FORMAT(m.`date`, '%Y-%m-01') AS month, SUM(CASE WHEN ((? IS NULL OR m.boat_id = ?) AND p.type = 'Preventiva') THEN m.value ELSE 0 END) AS value_maintenance_preventive, SUM(CASE WHEN ((? IS NULL OR m.boat_id = ?) AND p.type = 'Correctiva') THEN m.value ELSE 0 END) AS value_maintenance_corrective FROM maintenances m LEFT JOIN periodicities p ON p.id = m.periodicity_id GROUP BY month) SELECT DATE_FORMAT(c.`date`, '%M, %Y') AS date, IFNULL(mc.tanking_total, 0) AS tanking_total, IFNULL(mc.value_navigation, 0) AS value_navigation, IFNULL(mm.value_maintenance_preventive, 0) AS value_maintenance_preventive, IFNULL(mm.value_maintenance_corrective, 0) AS value_maintenance_corrective FROM calendar c LEFT JOIN monthly_consumptions mc ON DATE_FORMAT(c.`date`, '%Y-%m-01') = mc.month LEFT JOIN monthly_maintenances mm ON DATE_FORMAT(c.`date`, '%Y-%m-01') = mm.month ORDER BY c.`date`",
      [date, date, boat, boat, boat, boat, boat, boat, boat, boat]
    );
    return rows;
  }

  static async getTankingByMonth({ boat, date }) {
    const [rows] = await pool.query(
      "WITH RECURSIVE calendar AS (SELECT DATE_FORMAT(?, '%Y-%m-01') AS `date` UNION ALL SELECT DATE_ADD(`date`, INTERVAL 1 DAY) FROM calendar WHERE MONTH(`date`) = MONTH(?) AND YEAR(`date`) = YEAR(?) AND `date` < LAST_DAY(?)) SELECT DATE_FORMAT(c.`date`, '%M, %d') AS `date`, IFNULL(SUM(CASE WHEN ? IS NULL OR t.boat_id = ? THEN t.tanking_total ELSE 0 END), 0) AS tanking_total FROM calendar c LEFT JOIN consumptions t ON DATE(t.`date`) = c.`date` GROUP BY c.`date` ORDER BY c.`date`",
      [date, date, date, date, boat, boat]
    );
    return rows;
  }

  static async getNavigationByMonth({ boat, date }) {
    const [rows] = await pool.query(
      "WITH RECURSIVE calendar AS (SELECT DATE_FORMAT(?, '%Y-%m-01') AS `date` UNION ALL SELECT DATE_ADD(`date`, INTERVAL 1 DAY) FROM calendar WHERE MONTH(`date`) = MONTH(?) AND YEAR(`date`) = YEAR(?) AND `date` < LAST_DAY(?)) SELECT DATE_FORMAT(c.`date`, '%M, %d') AS `date`, IFNULL(SUM(CASE WHEN ? IS NULL OR t.boat_id = ? THEN t.value_navigation ELSE 0 END), 0) AS value_navigation FROM calendar c LEFT JOIN consumptions t ON DATE(t.`date`) = c.`date` GROUP BY c.`date` ORDER BY c.`date`",
      [date, date, date, date, boat, boat]
    );
    return rows;
  }

  static async getPreventiveByMonth({ boat, date }) {
    const [rows] = await pool.query(
      "WITH RECURSIVE calendar AS (SELECT DATE_FORMAT(?, '%Y-%m-01') AS `date` UNION ALL SELECT DATE_ADD(`date`, INTERVAL 1 DAY) FROM calendar WHERE MONTH(`date`) = MONTH(?) AND YEAR(`date`) = YEAR(?) AND `date` < LAST_DAY(?)) SELECT DATE_FORMAT(c.`date`, '%M, %d') AS `date`, IFNULL(SUM(CASE WHEN (? IS NULL OR m.boat_id = ?) AND p.type = 'Preventiva' THEN m.value ELSE 0 END), 0) AS value_maintenance_preventive FROM calendar c LEFT JOIN maintenances m ON DATE(m.`date`) = c.`date` LEFT JOIN periodicities p ON p.id = m.periodicity_id GROUP BY c.`date` ORDER BY c.`date`",
      [date, date, date, date, boat, boat]
    );
    return rows;
  }

  static async getCorrectiveByMonth({ boat, date }) {
    const [rows] = await pool.query(
      "WITH RECURSIVE calendar AS (SELECT DATE_FORMAT(?, '%Y-%m-01') AS `date` UNION ALL SELECT DATE_ADD(`date`, INTERVAL 1 DAY) FROM calendar WHERE MONTH(`date`) = MONTH(?) AND YEAR(`date`) = YEAR(?) AND `date` < LAST_DAY(?)) SELECT DATE_FORMAT(c.`date`, '%M, %d') AS `date`, IFNULL(SUM(CASE WHEN (? IS NULL OR m.boat_id = ?) AND p.type = 'Correctiva' THEN m.value ELSE 0 END), 0) AS value_maintenance_corrective FROM calendar c LEFT JOIN maintenances m ON DATE(m.`date`) = c.`date` LEFT JOIN periodicities p ON p.id = m.periodicity_id GROUP BY c.`date` ORDER BY c.`date`",
      [date, date, date, date, boat, boat]
    );
    return rows;
  }

  static async getTankingByYear({ boat, date }) {
    const [rows] = await pool.query(
      "WITH RECURSIVE calendar AS (SELECT DATE_FORMAT(?, '%Y-01-01') AS `date`UNION ALL SELECT DATE_ADD(`date`, INTERVAL 1 MONTH) FROM calendar WHERE `date` < DATE_FORMAT(?, '%Y-12-01')), monthly_consumptions AS (SELECT DATE_FORMAT(`date`, '%Y-%m-01') AS month, SUM(CASE WHEN (? IS NULL OR boat_id = ?) THEN tanking_total ELSE 0 END) AS tanking_total FROM consumptions GROUP BY month) SELECT DATE_FORMAT(c.`date`, '%M, %Y') AS date, IFNULL(mc.tanking_total, 0) AS tanking_total FROM calendar c LEFT JOIN monthly_consumptions mc ON DATE_FORMAT(c.`date`, '%Y-%m-01') = mc.month ORDER BY c.`date`",
      [date, date, boat, boat]
    );
    return rows;
  }

  static async getNavigationByYear({ boat, date }) {
    const [rows] = await pool.query(
      "WITH RECURSIVE calendar AS (SELECT DATE_FORMAT(?, '%Y-01-01') AS `date` UNION ALL SELECT DATE_ADD(`date`, INTERVAL 1 MONTH) FROM calendar WHERE `date` < DATE_FORMAT(?, '%Y-12-01')), monthly_consumptions AS (SELECT DATE_FORMAT(`date`, '%Y-%m-01') AS month, SUM(CASE WHEN (? IS NULL OR boat_id = ?) THEN value_navigation ELSE 0 END) AS value_navigation FROM consumptions GROUP BY month) SELECT DATE_FORMAT(c.`date`, '%M, %Y') AS date, IFNULL(mc.value_navigation, 0) AS value_navigation FROM calendar c LEFT JOIN monthly_consumptions mc ON DATE_FORMAT(c.`date`, '%Y-%m-01') = mc.month ORDER BY c.`date`",
      [date, date, boat, boat]
    );
    return rows;
  }

  static async getPreventiveByYear({ boat, date }) {
    const [rows] = await pool.query(
      "WITH RECURSIVE calendar AS (SELECT DATE_FORMAT(?, '%Y-01-01') AS `date` UNION ALL SELECT DATE_ADD(`date`, INTERVAL 1 MONTH) FROM calendar WHERE `date` < DATE_FORMAT(?, '%Y-12-01')), monthly_maintenances AS (SELECT DATE_FORMAT(m.`date`, '%Y-%m-01') AS month, SUM(CASE WHEN ((? IS NULL OR m.boat_id = ?) AND p.type = 'Preventiva') THEN m.value ELSE 0 END) AS value_maintenance_preventive FROM maintenances m LEFT JOIN periodicities p ON p.id = m.periodicity_id GROUP BY month) SELECT DATE_FORMAT(c.`date`, '%M, %Y') AS date, IFNULL(mm.value_maintenance_preventive, 0) AS value_maintenance_preventive FROM calendar c LEFT JOIN monthly_maintenances mm ON DATE_FORMAT(c.`date`, '%Y-%m-01') = mm.month ORDER BY c.`date`",
      [date, date, boat, boat]
    );
    return rows;
  }

  static async getCorrectiveByYear({ boat, date }) {
    const [rows] = await pool.query(
      "WITH RECURSIVE calendar AS (SELECT DATE_FORMAT(?, '%Y-01-01') AS `date` UNION ALL SELECT DATE_ADD(`date`, INTERVAL 1 MONTH) FROM calendar WHERE `date` < DATE_FORMAT(?, '%Y-12-01')), monthly_maintenances AS (SELECT DATE_FORMAT(m.`date`, '%Y-%m-01') AS month, SUM(CASE WHEN ((? IS NULL OR m.boat_id = ?) AND p.type = 'Correctiva') THEN m.value ELSE 0 END) AS value_maintenance_corrective FROM maintenances m LEFT JOIN periodicities p ON p.id = m.periodicity_id GROUP BY month) SELECT DATE_FORMAT(c.`date`, '%M, %Y') AS date, IFNULL(mm.value_maintenance_corrective, 0) AS value_maintenance_corrective FROM calendar c LEFT JOIN monthly_maintenances mm ON DATE_FORMAT(c.`date`, '%Y-%m-01') = mm.month ORDER BY c.`date`",
      [date, date, boat, boat]
    );
    return rows;
  }
}

export default StatisticsModel;
