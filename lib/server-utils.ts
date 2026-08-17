'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { businesses, teamMembers } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session.user
}

export async function getCurrentUserIdRequired() {
  const user = await getCurrentUser()
  return user.id
}

export async function getUserBusiness(userId: string) {
  const business = await db
    .select()
    .from(businesses)
    .where(eq(businesses.ownerId, userId))
    .limit(1)

  return business[0] || null
}

export async function getUserRole(userId: string, businessId: string) {
  const teamMember = await db
    .select()
    .from(teamMembers)
    .where(
      and(
        eq(teamMembers.userId, userId),
        eq(teamMembers.businessId, businessId)
      )
    )
    .limit(1)

  return teamMember[0]?.role || null
}

export async function checkBusinessAccess(userId: string, businessId: string) {
  const business = await db
    .select()
    .from(businesses)
    .where(eq(businesses.id, businessId))
    .limit(1)

  if (!business[0]) {
    throw new Error('Business not found')
  }

  // Check if user is owner or team member
  if (business[0].ownerId === userId) {
    return true
  }

  const teamMember = await db
    .select()
    .from(teamMembers)
    .where(
      and(
        eq(teamMembers.userId, userId),
        eq(teamMembers.businessId, businessId)
      )
    )
    .limit(1)

  if (!teamMember[0]) {
    throw new Error('Unauthorized')
  }

  return true
}
