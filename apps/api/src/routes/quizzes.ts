import type { FastifyPluginAsync } from 'fastify';
import type { ApiResponse, Quiz, QuizResult } from '@studyforge/types';

export const quizzesRoutes: FastifyPluginAsync = async (fastify) => {
  // POST /quizzes — generate quiz
  fastify.post('/', async (_req, reply): Promise<ApiResponse<Quiz>> => {
    // TODO: validate QuizConfig, check cache, call AI pipeline
    return reply.code(201).send({ data: null as unknown as Quiz, error: null });
  });

  // GET /quizzes/:id
  fastify.get<{ Params: { id: string } }>('/:id', async (req, reply): Promise<ApiResponse<Quiz>> => {
    void req.params.id;
    return reply.code(404).send({ data: null, error: { code: 'NOT_FOUND', message: 'Quiz not found' } });
  });

  // POST /quizzes/:id/submit
  fastify.post<{ Params: { id: string } }>('/:id/submit', async (req, reply): Promise<ApiResponse<QuizResult>> => {
    void req.params.id;
    // TODO: score attempt, award XP, update streak
    return reply.send({ data: null as unknown as QuizResult, error: null });
  });
};
