import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoSanitize from './middlewares/mongoSanitize.middleware.js';
import morgan from 'morgan';
import config from './config/index.js';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import notFoundHandler from './middlewares/notFoundHandler.middleware.js';
import { globalLimiter } from './middlewares/rateLimiter.middleware.js';

const app = express();

// Trust proxy — required for rate limiting behind Nginx / load balancers
app.set('trust proxy', 1);

// ─── Security Middleware ────────────────────────────────────
app.use(helmet());

// ─── Compression ────────────────────────────────────────────
app.use(compression());

// ─── CORS ───────────────────────────────────────────────────
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Rate Limiting ──────────────────────────────────────────
app.use(globalLimiter);

// ─── Body Parsers ───────────────────────────────────────────
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// ─── Cookie Parser ──────────────────────────────────────────
app.use(cookieParser());

// ─── Mongo Sanitization (NoSQL injection prevention) ────────
app.use(mongoSanitize);

// ─── HTTP Request Logging ───────────────────────────────────
if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ─── Static Files ───────────────────────────────────────────
app.use(express.static('public'));

// ─── API Routes ─────────────────────────────────────────────
app.use('/api', routes);

// ─── 404 Handler ────────────────────────────────────────────
app.use(notFoundHandler);

// ─── Global Error Handler ───────────────────────────────────
app.use(errorHandler);

export default app;
