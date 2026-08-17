import { z } from 'zod'

// Business Schemas
export const createBusinessSchema = z.object({
  name: z.string().min(1, 'Business name is required').max(255),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  website: z.string().url('Valid URL is required').optional().or(z.literal('')),
  industry: z.string().optional(),
  businessType: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
})

export const updateBusinessSettingsSchema = z.object({
  workingHoursStart: z.string().optional(),
  workingHoursEnd: z.string().optional(),
  timezone: z.string().default('UTC'),
  language: z.string().default('en'),
  currency: z.string().default('USD'),
  gstNumber: z.string().optional(),
  panNumber: z.string().optional(),
  brandingColor: z.string().optional(),
})

// Lead Schemas
export const createLeadSchema = z.object({
  name: z.string().min(1, 'Lead name is required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
  source: z.string().optional(),
  status: z.string().default('new'),
  stage: z.string().default('prospect'),
  value: z.number().optional(),
  currency: z.string().default('USD'),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

export const updateLeadSchema = createLeadSchema.partial()

export const createLeadNoteSchema = z.object({
  content: z.string().min(1, 'Note content is required'),
  isInternal: z.boolean().default(false),
})

// Customer Schemas
export const createCustomerSchema = z.object({
  name: z.string().min(1, 'Customer name is required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  company: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
  customerType: z.string().default('individual'),
  tags: z.array(z.string()).default([]),
})

export const updateCustomerSchema = createCustomerSchema.partial()

// Appointment Schemas
export const createAppointmentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  customerId: z.string().uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  location: z.string().optional(),
  type: z.string().optional(),
  notes: z.string().optional(),
  reminders: z.array(z.number()).default([15, 1440]),
})

export const updateAppointmentSchema = createAppointmentSchema.partial()

// Invoice Schemas
export const createInvoiceItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unitPrice: z.number().min(0, 'Unit price must be non-negative'),
  taxPercentage: z.number().min(0).max(100).default(0),
})

export const createInvoiceSchema = z.object({
  customerId: z.string().uuid().optional(),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  invoiceDate: z.coerce.date().default(() => new Date()),
  dueDate: z.coerce.date().optional(),
  gstPercentage: z.number().min(0).max(100).default(0),
  items: z.array(createInvoiceItemSchema).min(1, 'At least one item is required'),
  notes: z.string().optional(),
  terms: z.string().optional(),
})

export const updateInvoiceSchema = z.object({
  status: z.enum(['draft', 'issued', 'paid', 'canceled']).optional(),
  notes: z.string().optional(),
  terms: z.string().optional(),
})

// Task Schemas
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  dueDate: z.coerce.date().optional(),
  assignedTo: z.string().uuid().optional(),
})

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['open', 'in-progress', 'completed']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z.coerce.date().optional(),
  assignedTo: z.string().uuid().optional(),
})

// Team Member Schemas
export const inviteTeamMemberSchema = z.object({
  email: z.string().email('Valid email is required'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['admin', 'manager', 'employee']).default('employee'),
})

export const updateTeamMemberSchema = z.object({
  role: z.enum(['admin', 'manager', 'employee']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
})

// Chat Schemas
export const sendChatMessageSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  attachments: z.array(z.string()).optional().default([]),
})

// WhatsApp Schemas
export const sendWhatsappMessageSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  messageType: z.enum(['text', 'image', 'document', 'video']).default('text'),
  mediaUrl: z.string().url().optional(),
})

// Payment Schemas
export const createPaymentSchema = z.object({
  invoiceId: z.string().uuid('Valid invoice ID is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  paymentMethod: z.enum(['credit_card', 'bank_transfer', 'upi']),
})

export const createSubscriptionSchema = z.object({
  plan: z.enum(['starter', 'professional', 'enterprise']),
  paymentMethod: z.enum(['stripe', 'razorpay']).optional(),
})

// API Key Schema
export const createApiKeySchema = z.object({
  name: z.string().min(1, 'API key name is required'),
})

// Webhook Schema
export const createWebhookSchema = z.object({
  url: z.string().url('Valid URL is required'),
  events: z.array(z.string()).min(1, 'At least one event is required'),
})

export type CreateBusinessInput = z.infer<typeof createBusinessSchema>
export type CreateLeadInput = z.infer<typeof createLeadSchema>
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>
export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>
export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>
export type SendChatMessageInput = z.infer<typeof sendChatMessageSchema>
export type SendWhatsappMessageInput = z.infer<typeof sendWhatsappMessageSchema>
