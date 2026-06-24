import FeeCycle from '../models/FeeCycle.model.js';

/**
 * FeeCycle Repository — encapsulates all DB operations for fee cycles.
 */
class FeeCycleRepository {
  /**
   * Create a new fee cycle.
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const feeCycle = new FeeCycle(data);
    return feeCycle.save();
  }

  /**
   * Find fee cycle by ID.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    return FeeCycle.findById(id).populate('createdBy', 'name email').exec();
  }

  /**
   * Find fee cycle by month, year, and batch.
   * @param {number} month
   * @param {number} year
   * @param {number|null} batch
   * @returns {Promise<Object|null>}
   */
  async findByMonthYear(month, year, batch = null) {
    return FeeCycle.findOne({ month, year, batch }).exec();
  }

  /**
   * Get all fee cycles, sorted by most recent first.
   * @returns {Promise<Array>}
   */
  async findAll() {
    return FeeCycle.find()
      .populate('createdBy', 'name email')
      .sort({ year: -1, month: -1 })
      .exec();
  }

  /**
   * Get the current month's fee cycle(s).
   * @returns {Promise<Object|null>}
   */
  async findCurrentCycle() {
    const now = new Date();
    return FeeCycle.findOne({
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    }).exec();
  }

  /**
   * Get the current month's fee cycle for a specific batch.
   * Tries batch-specific first, then falls back to batch=null (all batches).
   * @param {number|null} batch
   * @returns {Promise<Object|null>}
   */
  async findCurrentCycleForBatch(batch) {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // Try batch-specific cycle first
    if (batch) {
      const batchCycle = await FeeCycle.findOne({ month, year, batch }).exec();
      if (batchCycle) return batchCycle;
    }

    // Fall back to general cycle (batch = null)
    return FeeCycle.findOne({ month, year, batch: null }).exec();
  }
}

export default new FeeCycleRepository();
