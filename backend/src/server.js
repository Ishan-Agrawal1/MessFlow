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

    // 4. Start HTTP server — tuned for 1000 concurrent users
    const server = app.listen(config.port, () => {
      console.log(`\n🚀 Server running on port ${config.port} in ${config.env} mode`);
      console.log(`   Health check: http://localhost:${config.port}/api/health\n`);
    });

    // Raise connection limits for high concurrency
    server.maxConnections = 2000;
    server.keepAliveTimeout = 65 * 1000;     // 65 seconds
    server.headersTimeout = 70 * 1000;       // slightly above keepAlive
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
