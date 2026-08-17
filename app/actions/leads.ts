'use server'

import { db } from '@/lib/db'
import { leads, leadNotes, leadHistory } from '@/lib/db/schema'
import { getCurrentUserIdRequired, checkBusinessAccess } from '@/lib/server-utils'
import { createLeadSchema, createLeadNoteSchema } from '@/lib/schemas'
import { eq, and, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function createLead(businessId: string, data: unknown) {
  const userId = await getCurrentUserIdRequired()
  await checkBusinessAccess(userId, businessId)

  const parsed = createLeadSchema.parse(data)

  const lead = await db
    .insert(leads)
    .values({
      businessId: businessId as any,
      ...parsed,
    })
    .returning()

  revalidatePath('/leads')
  return lead[0]
}

export async function updateLead(leadId: string, businessId: string, data: unknown) {
  const userId = await getCurrentUserIdRequired()
  await checkBusinessAccess(userId, businessId)

  const lead = await db
    .select()
    .from(leads)
    .where(and(eq(leads.id, leadId as any), eq(leads.businessId, businessId as any)))
    .limit(1)

  if (!lead[0]) {
    throw new Error('Lead not found')
  }

  const updated = await db
    .update(leads)
    .set(data as any)
    .where(eq(leads.id, leadId as any))
    .returning()

  revalidatePath(`/leads/${leadId}`)
  return updated[0]
}

export async function deleteLead(leadId: string, businessId: string) {
  const userId = await getCurrentUserIdRequired()
  await checkBusinessAccess(userId, businessId)

  await db
    .update(leads)
    .set({ deletedAt: new Date() })
    .where(eq(leads.id, leadId as any))

  revalidatePath('/leads')
}

export async function getLeads(businessId: string, filters?: any) {
  const userId = await getCurrentUserIdRequired()
  await checkBusinessAccess(userId, businessId)

  let query = db
    .select()
    .from(leads)
    .where(and(eq(leads.businessId, businessId as any), eq(leads.deletedAt, null)))

  if (filters?.status) {
    query = query.where(eq(leads.status, filters.status))
  }

  if (filters?.stage) {
    query = query.where(eq(leads.stage, filters.stage))
  }

  return query.orderBy(desc(leads.createdAt))
}

export async function getLeadById(leadId: string, businessId: string) {
  const userId = await getCurrentUserIdRequired()
  await checkBusinessAccess(userId, businessId)

  const lead = await db
    .select()
    .from(leads)
    .where(and(eq(leads.id, leadId as any), eq(leads.businessId, businessId as any)))
    .limit(1)

  return lead[0] || null
}

export async function addLeadNote(leadId: string, businessId: string, data: unknown) {
  const userId = await getCurrentUserIdRequired()
  await checkBusinessAccess(userId, businessId)

  const parsed = createLeadNoteSchema.parse(data)

  const note = await db
    .insert(leadNotes)
    .values({
      leadId: leadId as any,
      userId: userId as any,
      ...parsed,
    })
    .returning()

  revalidatePath(`/leads/${leadId}`)
  return note[0]
}

export async function getLeadNotes(leadId: string, businessId: string) {
  const userId = await getCurrentUserIdRequired()
  await checkBusinessAccess(userId, businessId)

  return db
    .select()
    .from(leadNotes)
    .where(eq(leadNotes.leadId, leadId as any))
    .orderBy(desc(leadNotes.createdAt))
}
