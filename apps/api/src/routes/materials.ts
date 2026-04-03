import type { FastifyPluginAsync } from 'fastify';
import type { ApiResponse, PaginatedResponse, Material } from '@studyforge/types';

export const materialsRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /materials
  fastify.get('/', async (_req, reply): Promise<PaginatedResponse<Material>> => {
    // TODO: query DB, apply cursor pagination
    return reply.send({ data: [], error: null, meta: { hasMore: false } });
  });

  // GET /materials/:id
  fastify.get<{ Params: { id: string } }>('/:id', async (req, reply): Promise<ApiResponse<Material>> => {
    const { id } = req.params;
    // TODO: fetch material by id
    void id;
    return reply.code(404).send({ data: null, error: { code: 'NOT_FOUND', message: 'Material not found' } });
  });

  // POST /materials
  fastify.post('/', async (_req, reply) => {
    // TODO: handle file upload, trigger AI pipeline
    return reply.code(201).send({ data: null, error: null });
  });

  // PATCH /materials/:id
  fastify.patch<{ Params: { id: string } }>('/:id', async (req, reply) => {
    void req.params.id;
    // TODO: update material metadata
    return reply.send({ data: null, error: null });
  });

  // DELETE /materials/:id
  fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
    void req.params.id;
    // TODO: soft-delete material
    return reply.code(204).send();
  });
};
