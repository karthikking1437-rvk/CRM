'use server'

import { db } from '@/lib/db'
import { businesses, businessSettings, subscriptions, teamMembers } from '@/lib/db/schema'
import { getCurrentUserIdRequired, checkBusinessAccess } from '@/lib/server-utils'
import { createBusinessSchema, updateBusinessSettingsSchema } from '@/lib/schemas'
import { eq, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function createBusiness(data: unknown) {
  const userId = await getCurrentUserIdRequired()
  const parsed = createBusinessSchema.parse(data)

  const business = await db
    .insert(businesses)
    .values({
      ownerId: userId,
      ...parsed,
    })
    .returning()

  // Create default subscription
  await db.insert(subscriptions).values({
    businessId: business[0].id,
    plan: 'starter',
    status: 'active',
    monthlyLimit: 1000,
    currentUsage: 0,
  })

  // Create business settings
  await db.insert(businessSettings).values({
    businessId: business[0].id,
  })

  revalidatePath('/dashboard')
  return business[0]
}

export async function updateBusinessSettings(businessId: string, data: unknown) {
  await checkBusinessAccess(await getCurrentUserIdRequired(), businessId)
  const parsed = updateBusinessSettingsSchema.parse(data)

  const settings = await db
    .update(businessSettings)
    .set(parsed)
    .where(eq(businessSettings.businessId, businessId))
    .returning()

  revalidatePath('/settings')
  return settings[0]
}

export async function getBusinessById(businessId: string) {
  const userId = await getCurrentUserIdRequired()
  await checkBusinessAccess(userId, businessId)

  const business = await db
    .select()
    .from(businesses)
    .where(eq(businesses.id, businessId))
    .limit(1)

  return business[0] || null
}

export async function getUserBusiness() {
  const userId = await getCurrentUserIdRequired()

  const business = await db
    .select()
    .from(businesses)
    .where(eq(businesses.ownerId, userId))
    .limit(1)

  return business[0] || null
}

export async function getBusinessTeamMembers(businessId: string) {
  await checkBusinessAccess(await getCurrentUserIdRequired(), businessId)

  return db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.businessId, businessId))
}

export async function inviteTeamMember(businessId: string, data: unknown) {
  const userId = await getCurrentUserIdRequired()
  await checkBusinessAccess(userId, businessId)

  const parsed = data as any
  const member = await db
    .insert(teamMembers)
    .values({
      businessId: businessId as any,
      email: parsed.email,
      name: parsed.name,
      role: parsed.role || 'employee',
      status: 'active',
      invitedAt: new Date(),
    })
    .returning()

  revalidatePath(`/settings/team`)
  return member[0]
}
