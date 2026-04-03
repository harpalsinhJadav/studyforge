import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { materialsRoutes } from './routes/materials.js';
import { quizzesRoutes } from './routes/quizzes.js';
import { usersRoutes } from './routes/users.js';

const server = Fastify({ logger: true });

await server.register(cors, {
  origin: process.env['ALLOWED_ORIGINS']?.split(',') ?? ['http://localhost:3000'],
});

await server.register(rateLimit, { max: 100, timeWindow: '1 minute' });

// Health check
server.get('/health', async () => ({ status: 'ok' }));

// API routes
await server.register(materialsRoutes, { prefix: '/materials' });
await server.register(quizzesRoutes,   { prefix: '/quizzes' });
await server.register(usersRoutes,     { prefix: '/users' });

const port = Number(process.env['PORT'] ?? 4000);
const host = process.env['HOST'] ?? '0.0.0.0';

await server.listen({ port, host });
