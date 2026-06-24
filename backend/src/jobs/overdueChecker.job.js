import cron from 'node-cron';
import StudentDue from '../models/StudentDue.model.js';
import FeeCycle from '../models/FeeCycle.model.js';
import { DUE_STATUS } from '../constants/index.js';

/**
 * Overdue Checker Cron Job.
 *
 * Runs daily at midnight (00:00) to mark PENDING dues
 * whose fee cycle dueDate has passed as OVERDUE.
 */
const startOverdueChecker = () => {
  // Schedule: every day at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      console.log('⏰ Running overdue checker job...');

      const now = new Date();

      // Find all fee cycles whose dueDate has passed
      const expiredCycles = await FeeCycle.find({
        dueDate: { $lt: now },
      }).select('_id');

      if (expiredCycles.length === 0) {
        console.log('✅ No expired fee cycles found');
        return;
      }

      const expiredCycleIds = expiredCycles.map((c) => c._id);

      // Update all PENDING dues for expired cycles to OVERDUE
      const result = await StudentDue.updateMany(
        {
          feeCycle: { $in: expiredCycleIds },
          status: DUE_STATUS.PENDING,
        },
        {
          status: DUE_STATUS.OVERDUE,
        }
      );

      console.log(
        `✅ Overdue checker complete: ${result.modifiedCount} dues marked as OVERDUE`
      );
    } catch (error) {
      console.error('❌ Overdue checker job failed:', error.message);
    }
  });

  console.log('⏰ Overdue checker cron job scheduled (daily at midnight)');
};

export default startOverdueChecker;
