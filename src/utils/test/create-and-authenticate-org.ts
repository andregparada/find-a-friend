import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone_number: '21987654321',
      cep: '20200200',
      state: 'EX',
      city: 'Example City',
      neighborhood: 'Example Neighborhood',
      street: 'Example Street',
      latitude: -7.9437058,
      longitude: -14.3607169,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    org,
    token,
  }
}
