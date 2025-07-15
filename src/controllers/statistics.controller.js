import StatisticsModel from "../models/statistics.model.js";

class StatisticsController {
  static async getByMonth (req, res) {
    const { boat, date } = req.body;
    const statistics = await StatisticsModel.getByMonth({ boat, date });

    if (statistics) return res.json(statistics);
    res.status(400).json({ message: "Statistics not found" });
  }

  static async getByYear (req, res) {
    const { boat, date } = req.body;
    const statistics = await StatisticsModel.getByYear({ boat, date });

    if (statistics) return res.json(statistics);
    res.status(400).json({ message: "Statistics not found" });
  }

  static async getTankingByMonth (req, res) {
    const { boat, date } = req.body;
    const statistics = await StatisticsModel.getTankingByMonth({ boat, date });

    if (statistics) return res.json(statistics);
    res.status(400).json({ message: "Statistics not found" });
  }

  static async getNavigationByMonth (req, res) {
    const { boat, date } = req.body;
    const statistics = await StatisticsModel.getNavigationByMonth({ boat, date });

    if (statistics) return res.json(statistics);
    res.status(400).json({ message: "Statistics not found" });
  }

  static async getPreventiveByMonth (req, res) {
    const { boat, date } = req.body;
    const statistics = await StatisticsModel.getPreventiveByMonth({ boat, date });

    if (statistics) return res.json(statistics);
    res.status(400).json({ message: "Statistics not found" });
  }

  static async getCorrectiveByMonth (req, res) {
    const { boat, date } = req.body;
    const statistics = await StatisticsModel.getCorrectiveByMonth({ boat, date });

    if (statistics) return res.json(statistics);
    res.status(400).json({ message: "Statistics not found" });
  }

  static async getTankingByYear (req, res) {
    const { boat, date } = req.body;
    const statistics = await StatisticsModel.getTankingByYear({ boat, date });

    if (statistics) return res.json(statistics);
    res.status(400).json({ message: "Statistics not found" });
  }

  static async getNavigationByYear (req, res) {
    const { boat, date } = req.body;
    const statistics = await StatisticsModel.getNavigationByYear({ boat, date });

    if (statistics) return res.json(statistics);
    res.status(400).json({ message: "Statistics not found" });
  }

  static async getPreventiveByYear (req, res) {
    const { boat, date } = req.body;
    const statistics = await StatisticsModel.getPreventiveByYear({ boat, date });

    if (statistics) return res.json(statistics);
    res.status(400).json({ message: "Statistics not found" });
  }

  static async getCorrectiveByYear (req, res) {
    const { boat, date } = req.body;
    const statistics = await StatisticsModel.getCorrectiveByYear({ boat, date });

    if (statistics) return res.json(statistics);
    res.status(400).json({ message: "Statistics not found" });
  }
}

export default StatisticsController;
