'use server'

import prisma from '@/lib/prisma'

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return users
  } catch (error) {
    console.error('Failed to fetch users:', error)
    throw new Error('Failed to fetch users')
  }
}
