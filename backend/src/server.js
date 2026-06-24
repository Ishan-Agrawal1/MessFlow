import app from './app.js';
import config from './config/index.js';
import connectDatabase from './config/database.js';
import userRepository from './repositories/user.repository.js';
import startOverdueChecker from './jobs/overdueChecker.job.js';

/**
 * Server bootstrap:
 * 1. Connect to MongoDB
 * 2. Seed admin user
 * 3. Start cron jobs
 * 4. Listen on configured port
 */
const startServer = async () => {
  try {
    // 1. Connect to database
    await connectDatabase();

    // 2. Seed admin user from environment
    if (config.admin.email && config.admin.password) {
      await userRepository.upsertAdmin({
        name: config.admin.name,
        email: config.admin.email,
        password: config.admin.password,
      });
    } else {
      console.warn('⚠️  Admin credentials not found in environment. Skipping admin seeding.');
    }

    // 3. Start cron jobs
    startOverdueChecker();

    // 4. Start HTTP server
    app.listen(config.port, () => {
      console.log(`\n🚀 Server running on port ${config.port} in ${config.env} mode`);
      console.log(`   Health check: http://localhost:${config.port}/api/health\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION:', err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION:', err.message);
  process.exit(1);
});

startServer();
