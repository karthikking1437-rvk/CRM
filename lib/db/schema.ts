import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  uuid,
  date,
  time,
  jsonb,
  serial,
  uniqueIndex,
  index,
  smallint,
  varchar,
  real,
  inet,
} from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- Bazawada AI App Tables ------------------------------------------------

// Business Management
export const businesses = pgTable('businesses', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerId: text('owner_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  website: text('website'),
  industry: text('industry'),
  businessType: text('business_type'),
  country: text('country'),
  state: text('state'),
  city: text('city'),
  address: text('address'),
  logoUrl: text('logo_url'),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
}, (table) => ({
  ownerIdIdx: index('idx_businesses_owner_id').on(table.ownerId),
}))

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  plan: text('plan').notNull(),
  status: text('status').notNull().default('active'),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  razorpayCustomerId: text('razorpay_customer_id'),
  razorpaySubscriptionId: text('razorpay_subscription_id'),
  monthlyLimit: integer('monthly_limit').default(1000),
  currentUsage: integer('current_usage').default(0),
  pricePerMonth: decimal('price_per_month', { precision: 10, scale: 2 }),
  billingCycleStart: timestamp('billing_cycle_start'),
  billingCycleEnd: timestamp('billing_cycle_end'),
  trialEndsAt: timestamp('trial_ends_at'),
  canceledAt: timestamp('canceled_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  businessIdIdx: index('idx_subscriptions_business_id').on(table.businessId),
  statusIdx: index('idx_subscriptions_status').on(table.status),
}))

export const teamMembers = pgTable('team_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
  email: text('email').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('employee'),
  status: text('status').default('active'),
  phone: text('phone'),
  permissions: jsonb('permissions').default({}),
  invitedAt: timestamp('invited_at'),
  joinedAt: timestamp('joined_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  businessIdIdx: index('idx_team_members_business_id').on(table.businessId),
  userIdIdx: index('idx_team_members_user_id').on(table.userId),
}))

export const businessSettings = pgTable('business_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().unique().references(() => businesses.id, { onDelete: 'cascade' }),
  workingHoursStart: time('working_hours_start'),
  workingHoursEnd: time('working_hours_end'),
  timezone: text('timezone').default('UTC'),
  language: text('language').default('en'),
  currency: text('currency').default('USD'),
  gstNumber: text('gst_number'),
  panNumber: text('pan_number'),
  businessRegistration: text('business_registration'),
  brandingColor: text('branding_color'),
  logoUrl: text('logo_url'),
  faviconUrl: text('favicon_url'),
  smtpHost: text('smtp_host'),
  smtpPort: integer('smtp_port'),
  smtpUser: text('smtp_user'),
  smtpPassword: text('smtp_password'),
  fromEmail: text('from_email'),
  fromName: text('from_name'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  changes: jsonb('changes'),
  ipAddress: inet('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  businessIdIdx: index('idx_audit_logs_business_id').on(table.businessId),
  createdAtIdx: index('idx_audit_logs_created_at').on(table.createdAt),
}))

// Lead Management
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  company: text('company'),
  industry: text('industry'),
  source: text('source'),
  status: text('status').default('new'),
  stage: text('stage').default('prospect'),
  score: integer('score').default(0),
  value: decimal('value', { precision: 12, scale: 2 }),
  currency: text('currency').default('USD'),
  assignedTo: uuid('assigned_to').references(() => teamMembers.id, { onDelete: 'set null' }),
  tags: text('tags').array(),
  notes: text('notes'),
  metadata: jsonb('metadata').default({}),
  lastContactAt: timestamp('last_contact_at'),
  nextFollowUpAt: timestamp('next_follow_up_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
}, (table) => ({
  businessIdIdx: index('idx_leads_business_id').on(table.businessId),
  statusIdx: index('idx_leads_status').on(table.status),
  assignedToIdx: index('idx_leads_assigned_to').on(table.assignedTo),
  createdAtIdx: index('idx_leads_created_at').on(table.createdAt),
}))

export const leadStages = pgTable('lead_stages', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  position: integer('position').default(0),
  color: text('color'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  businessIdIdx: index('idx_lead_stages_business_id').on(table.businessId),
}))

export const leadHistory = pgTable('lead_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  leadId: uuid('lead_id').notNull().references(() => leads.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => teamMembers.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  oldValue: text('old_value'),
  newValue: text('new_value'),
  fieldName: text('field_name'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  leadIdIdx: index('idx_lead_history_lead_id').on(table.leadId),
}))

export const leadNotes = pgTable('lead_notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  leadId: uuid('lead_id').notNull().references(() => leads.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => teamMembers.id, { onDelete: 'set null' }),
  content: text('content').notNull(),
  isInternal: boolean('is_internal').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  leadIdIdx: index('idx_lead_notes_lead_id').on(table.leadId),
}))

export const leadTasks = pgTable('lead_tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  leadId: uuid('lead_id').notNull().references(() => leads.id, { onDelete: 'cascade' }),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  assignedTo: uuid('assigned_to').references(() => teamMembers.id, { onDelete: 'set null' }),
  status: text('status').default('open'),
  priority: text('priority').default('medium'),
  dueDate: date('due_date'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  leadIdIdx: index('idx_lead_tasks_lead_id').on(table.leadId),
}))

// Customer CRM
export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  company: text('company'),
  city: text('city'),
  state: text('state'),
  country: text('country'),
  address: text('address'),
  customerType: text('customer_type').default('individual'),
  status: text('status').default('active'),
  lifetimeValue: decimal('lifetime_value', { precision: 12, scale: 2 }),
  totalPurchases: integer('total_purchases').default(0),
  lastPurchaseDate: timestamp('last_purchase_date'),
  tags: text('tags').array(),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
}, (table) => ({
  businessIdIdx: index('idx_customers_business_id').on(table.businessId),
  statusIdx: index('idx_customers_status').on(table.status),
  createdAtIdx: index('idx_customers_created_at').on(table.createdAt),
}))

export const customerSegments = pgTable('customer_segments', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  criteria: jsonb('criteria'),
  customerCount: integer('customer_count').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  businessIdIdx: index('idx_customer_segments_business_id').on(table.businessId),
}))

export const purchases = pgTable('purchases', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  amount: decimal('amount', { precision: 12, scale: 2 }),
  currency: text('currency').default('USD'),
  status: text('status').default('completed'),
  purchaseDate: timestamp('purchase_date').notNull().defaultNow(),
  items: jsonb('items'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  customerIdIdx: index('idx_purchases_customer_id').on(table.customerId),
}))

export const communicationHistory = pgTable('communication_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  direction: text('direction').default('inbound'),
  channel: text('channel'),
  subject: text('subject'),
  message: text('message'),
  attachments: text('attachments').array(),
  status: text('status'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  customerIdIdx: index('idx_communication_history_customer_id').on(table.customerId),
}))

export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  documentType: text('document_type'),
  fileUrl: text('file_url'),
  fileSize: integer('file_size'),
  mimeType: text('mime_type'),
  uploadedBy: uuid('uploaded_by').references(() => teamMembers.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  customerIdIdx: index('idx_documents_customer_id').on(table.customerId),
}))

// Appointments
export const appointments = pgTable('appointments', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  customerId: uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('scheduled'),
  type: text('type'),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  location: text('location'),
  assignedTo: uuid('assigned_to').references(() => teamMembers.id, { onDelete: 'set null' }),
  color: text('color'),
  isAllDay: boolean('is_all_day').default(false),
  isRecurring: boolean('is_recurring').default(false),
  recurringPattern: jsonb('recurring_pattern'),
  reminders: integer('reminders').array().default([15, 1440]),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
}, (table) => ({
  businessIdIdx: index('idx_appointments_business_id').on(table.businessId),
  statusIdx: index('idx_appointments_status').on(table.status),
  startTimeIdx: index('idx_appointments_start_time').on(table.startTime),
}))

export const appointmentReminders = pgTable('appointment_reminders', {
  id: uuid('id').primaryKey().defaultRandom(),
  appointmentId: uuid('appointment_id').notNull().references(() => appointments.id, { onDelete: 'cascade' }),
  reminderType: text('reminder_type'),
  minutesBefore: integer('minutes_before'),
  sentAt: timestamp('sent_at'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  appointmentIdIdx: index('idx_appointment_reminders_appointment_id').on(table.appointmentId),
}))

export const calendarIntegrations = pgTable('calendar_integrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  provider: text('provider').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  calendarId: text('calendar_id'),
  isActive: boolean('is_active').default(true),
  lastSync: timestamp('last_sync'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// AI Chat & Communication
export const chatConversations = pgTable('chat_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  customerId: uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
  visitorId: text('visitor_id'),
  channel: text('channel').default('web'),
  status: text('status').default('active'),
  language: text('language').default('en'),
  sentiment: text('sentiment'),
  assignedTo: uuid('assigned_to').references(() => teamMembers.id, { onDelete: 'set null' }),
  summary: text('summary'),
  metadata: jsonb('metadata').default({}),
  startedAt: timestamp('started_at').notNull().defaultNow(),
  endedAt: timestamp('ended_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  businessIdIdx: index('idx_chat_conversations_business_id').on(table.businessId),
  statusIdx: index('idx_chat_conversations_status').on(table.status),
}))

export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull().references(() => chatConversations.id, { onDelete: 'cascade' }),
  senderType: text('sender_type').notNull(),
  senderId: uuid('sender_id'),
  message: text('message').notNull(),
  isAiGenerated: boolean('is_ai_generated').default(false),
  intent: text('intent'),
  confidence: real('confidence'),
  entities: jsonb('entities'),
  attachments: text('attachments').array(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  conversationIdIdx: index('idx_chat_messages_conversation_id').on(table.conversationId),
}))

export const aiResponses = pgTable('ai_responses', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  intent: text('intent').notNull(),
  responseText: text('response_text'),
  responseType: text('response_type'),
  variables: jsonb('variables'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  businessIdIdx: index('idx_ai_responses_business_id').on(table.businessId),
}))

export const whatsappConversations = pgTable('whatsapp_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  customerId: uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
  waPhoneNumber: text('wa_phone_number').notNull(),
  status: text('status').default('active'),
  unreadCount: integer('unread_count').default(0),
  lastMessageAt: timestamp('last_message_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  businessIdIdx: index('idx_whatsapp_conversations_business_id').on(table.businessId),
}))

export const whatsappMessages = pgTable('whatsapp_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull().references(() => whatsappConversations.id, { onDelete: 'cascade' }),
  senderType: text('sender_type').notNull(),
  phoneNumber: text('phone_number').notNull(),
  message: text('message'),
  messageType: text('message_type'),
  mediaUrl: text('media_url'),
  status: text('status').default('sent'),
  externalMessageId: text('external_message_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  conversationIdIdx: index('idx_whatsapp_messages_conversation_id').on(table.conversationId),
}))

// Invoices & Payments
export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  customerId: uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
  invoiceNumber: text('invoice_number').notNull(),
  status: text('status').default('draft'),
  totalAmount: decimal('total_amount', { precision: 12, scale: 2 }),
  taxAmount: decimal('tax_amount', { precision: 12, scale: 2 }),
  discountAmount: decimal('discount_amount', { precision: 12, scale: 2 }),
  currency: text('currency').default('USD'),
  gstPercentage: decimal('gst_percentage', { precision: 5, scale: 2 }),
  invoiceDate: date('invoice_date').defaultNow(),
  dueDate: date('due_date'),
  issuedAt: timestamp('issued_at'),
  paidAt: timestamp('paid_at'),
  notes: text('notes'),
  terms: text('terms'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
}, (table) => ({
  businessIdIdx: index('idx_invoices_business_id').on(table.businessId),
  statusIdx: index('idx_invoices_status').on(table.status),
  customerIdIdx: index('idx_invoices_customer_id').on(table.customerId),
}))

export const invoiceItems = pgTable('invoice_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceId: uuid('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),
  description: text('description').notNull(),
  quantity: integer('quantity').default(1),
  unitPrice: decimal('unit_price', { precision: 12, scale: 2 }),
  taxPercentage: decimal('tax_percentage', { precision: 5, scale: 2 }),
  totalPrice: decimal('total_price', { precision: 12, scale: 2 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  invoiceId: uuid('invoice_id').references(() => invoices.id, { onDelete: 'set null' }),
  customerId: uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
  amount: decimal('amount', { precision: 12, scale: 2 }),
  currency: text('currency').default('USD'),
  status: text('status').default('pending'),
  paymentMethod: text('payment_method'),
  provider: text('provider'),
  transactionId: text('transaction_id'),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  razorpayPaymentId: text('razorpay_payment_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  businessIdIdx: index('idx_payments_business_id').on(table.businessId),
  statusIdx: index('idx_payments_status').on(table.status),
}))

// Tasks & Projects
export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('open'),
  priority: text('priority').default('medium'),
  assignedTo: uuid('assigned_to').references(() => teamMembers.id, { onDelete: 'set null' }),
  dueDate: date('due_date'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  businessIdIdx: index('idx_tasks_business_id').on(table.businessId),
  assignedToIdx: index('idx_tasks_assigned_to').on(table.assignedTo),
}))

export const subtasks = pgTable('subtasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  taskId: uuid('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  status: text('status').default('open'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  taskIdIdx: index('idx_subtasks_task_id').on(table.taskId),
}))

export const taskComments = pgTable('task_comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  taskId: uuid('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => teamMembers.id, { onDelete: 'set null' }),
  content: text('content').notNull(),
  attachments: text('attachments').array(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Analytics & Monitoring
export const analyticsEvents = pgTable('analytics_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  eventType: text('event_type').notNull(),
  eventData: jsonb('event_data'),
  userId: uuid('user_id'),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  metadata: jsonb('metadata').default({}),
}, (table) => ({
  businessIdIdx: index('idx_analytics_events_business_id').on(table.businessId),
  timestampIdx: index('idx_analytics_events_timestamp').on(table.timestamp),
}))

export const callLogs = pgTable('call_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  customerId: uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
  callType: text('call_type').notNull(),
  direction: text('direction').default('inbound'),
  status: text('status').default('completed'),
  durationSeconds: integer('duration_seconds'),
  recordingUrl: text('recording_url'),
  transcript: text('transcript'),
  summary: text('summary'),
  assignedTo: uuid('assigned_to').references(() => teamMembers.id, { onDelete: 'set null' }),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  businessIdIdx: index('idx_call_logs_business_id').on(table.businessId),
  statusIdx: index('idx_call_logs_status').on(table.status),
}))

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => teamMembers.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: text('type').default('info'),
  read: boolean('read').default(false),
  actionUrl: text('action_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('idx_notifications_user_id').on(table.userId),
  readIdx: index('idx_notifications_read').on(table.read),
}))

export const notificationPreferences = pgTable('notification_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => teamMembers.id, { onDelete: 'cascade' }),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  notificationType: text('notification_type').notNull(),
  channel: text('channel').notNull(),
  enabled: boolean('enabled').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const apiKeys = pgTable('api_keys', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  keyHash: text('key_hash').notNull(),
  lastUsed: timestamp('last_used'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  businessIdIdx: index('idx_api_keys_business_id').on(table.businessId),
}))

export const webhooks = pgTable('webhooks', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  events: text('events').array(),
  isActive: boolean('is_active').default(true),
  secretKey: text('secret_key'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
