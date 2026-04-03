import type { FastifyPluginAsync } from 'fastify';
import type { ApiResponse, User, UserStats } from '@studyforge/types';

export const usersRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /users/me
  fastify.get('/me', async (_req, reply): Promise<ApiResponse<User>> => {
    // TODO: extract JWT, fetch user from DB
    return reply.code(401).send({ data: null, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } });
  });

  // GET /users/me/stats
  fastify.get('/me/stats', async (_req, reply): Promise<ApiResponse<UserStats>> => {
    return reply.code(401).send({ data: null, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } });
  });

  // PATCH /users/me
  fastify.patch('/me', async (_req, reply) => {
    // TODO: update profile
    return reply.send({ data: null, error: null });
  });
};
