# Bazawada AI - Production-Grade SaaS Platform

> AI-Powered Business Automation for Local Businesses  
> Replace your receptionist, CRM, WhatsApp operator, and appointment manager with one unified platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Built with Next.js](https://img.shields.io/badge/built%20with-Next.js%2016-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)](https://www.postgresql.org/)

## Overview

Bazawada AI is a comprehensive SaaS platform designed to automate business operations for local businesses including:
- Clinics & Hospitals
- Salons & Spas  
- Gyms & Fitness Centers
- Restaurants & Cafes
- Schools & Educational Institutes
- Retail Shops
- Interior Design Agencies
- Real Estate Agencies
- Corporate Gifting Companies
- Manufacturing Businesses

### Core Features

- **AI Chat Assistant** - Answer customer questions, generate quotes, book appointments
- **Lead Management** - Pipeline tracking, Kanban board, lead scoring, import/export
- **Customer CRM** - Comprehensive customer profiles, purchase history, communication tracking
- **Appointment Calendar** - Multi-view calendar, Google Calendar sync, reminders
- **Invoice Management** - Create invoices, GST support, payment tracking
- **Analytics Dashboard** - Revenue charts, conversion funnels, team performance metrics
- **Call Management** - Call recording, transcription, sentiment analysis
- **WhatsApp Integration** - Shared inbox, AI replies, broadcast campaigns
- **Team Collaboration** - Task management, team permissions, activity logs
- **Admin Panel** - User management, settings, integrations, monitoring

---

## Quick Start

### Prerequisites
- Node.js 18+ / pnpm
- PostgreSQL 14+ (Neon)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/bazawada/bazawada-ai.git
cd bazawada-ai

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local

# Edit .env.local with your database URL and secrets
# Generate BETTER_AUTH_SECRET: openssl rand -base64 32

# Run development server
pnpm dev

# Open http://localhost:3000
```

### Demo Pages (No Auth Required)

Try features without logging in:
- `/demo/leads` - Lead pipeline and Kanban board
- `/demo/customers` - Customer CRM interface
- `/demo/appointments` - Calendar and scheduling
- `/demo/invoices` - Invoice management
- `/demo/ai-chat` - AI assistant interface
- `/demo/calls` - Call management system
- `/demo/analytics` - Business analytics
- `/demo/reports` - Custom reports
- `/demo/team` - Team performance
- `/demo/admin` - Admin dashboard

---

## Technology Stack

### Frontend
- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **State**: SWR for client-side data
- **Components**: shadcn/ui + custom components
- **Charts**: Recharts for analytics
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 18+
- **API**: REST with server actions
- **ORM**: Drizzle ORM with full type safety
- **Database**: PostgreSQL (Neon)
- **Auth**: Better Auth + JWT
- **Validation**: Zod schemas

### Infrastructure
- **Hosting**: Vercel (serverless)
- **Database**: Neon PostgreSQL
- **Caching**: Redis (optional)
- **Email**: SendGrid
- **Payments**: Stripe + Razorpay
- **Monitoring**: Sentry
- **CI/CD**: GitHub Actions

---

## Architecture

### Multi-Tenant Design

```
┌─────────────────────────────────┐
│    Bazawada AI Platform          │
├─────────────────────────────────┤
│ Business 1 │ Business 2 │ ...   │
│ (Data)     │ (Data)     │       │
├─────────────────────────────────┤
│   PostgreSQL Database (Neon)    │
│   - 50+ Tables with Indexing    │
│   - User Scoped Queries         │
│   - Soft Deletes & Audit Logs   │
└─────────────────────────────────┘
```

### Security Model

- **Authentication**: JWT tokens with secure cookies
- **Authorization**: Role-Based Access Control (RBAC)
- **Data Isolation**: All queries scoped by userId
- **Encryption**: SSL/TLS in transit, hashed passwords
- **Protection**: CSRF, XSS, SQL injection prevention

---

## Project Structure

```
bazawada-ai/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── dashboard/
│   │   ├── leads/
│   │   ├── customers/
│   │   ├── appointments/
│   │   ├── invoices/
│   │   └── analytics/
│   ├── demo/
│   │   ├── leads/
│   │   ├── customers/
│   │   ├── admin/
│   │   └── [all feature demos]
│   ├── api/auth/
│   └── actions/
│
├── components/
│   ├── dashboard/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── [layout components]
│   ├── leads/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── [shadcn components]
│   └── [feature components]
│
├── lib/
│   ├── db/
│   │   ├── schema.ts (Drizzle)
│   │   └── index.ts
│   ├── auth.ts (Better Auth)
│   ├── auth-client.ts
│   ├── server-utils.ts
│   └── schemas.ts (Zod)
│
└── public/
    └── [assets]
```

---

## Database Schema

### Core Tables
- `users` (Better Auth)
- `businesses`
- `team_members`
- `subscriptions`
- `leads`
- `customers`
- `appointments`
- `invoices`
- `chat_conversations`
- `payments`
- `call_logs`
- And 30+ more specialized tables

All tables include:
- Proper indexing for performance
- Soft deletes for data recovery
- Audit logging for compliance
- Timestamps for tracking
- JSONB fields for flexibility

---

## API Endpoints

### Authentication
```
POST   /api/auth/sign-up
POST   /api/auth/sign-in
POST   /api/auth/sign-out
GET    /api/auth/session
```

### Leads
```
GET    /api/leads
POST   /api/leads
GET    /api/leads/:id
PUT    /api/leads/:id
DELETE /api/leads/:id
```

### Other Resources
- `/api/customers`
- `/api/appointments`
- `/api/invoices`
- `/api/analytics`
- `/api/call-logs`
- And more...

---

## Server Actions

All mutations use secure server actions with authorization:

```typescript
// Example: Create a lead
'use server'

export async function createLead(data: LeadInput) {
  const userId = await getUserId() // Validates session
  
  return db.insert(leads).values({
    ...data,
    businessId: await getUserBusiness(userId),
  })
}
```

---

## Development

### Running Tests
```bash
pnpm test
```

### Building for Production
```bash
pnpm build
```

### Type Checking
```bash
pnpm type-check
```

### Linting
```bash
pnpm lint
```

### Formatting
```bash
pnpm format
```

---

## Deployment

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bazawada/bazawada-ai)

### Manual Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment guide including:
- Environment setup
- Database configuration
- Performance optimization
- Security checklist
- Monitoring setup
- Scaling strategy

---

## Configuration

### Environment Variables

```env
# Required
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=<random-32-chars>

# Optional
STRIPE_PUBLIC_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
SENDGRID_API_KEY=...
WHATSAPP_BUSINESS_PHONE_ID=...
```

See [.env.example](.env.example) for all options.

---

## Performance

### Metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- API Response Time: < 200ms

### Optimizations
- Server-side rendering (SSR)
- Incremental Static Regeneration (ISR)
- Image optimization with Next.js Image
- Lazy loading below the fold
- Database query optimization
- Redis caching (optional)

---

## Security

- [x] HTTPS/SSL enforced
- [x] JWT authentication
- [x] RBAC implementation
- [x] CSRF protection
- [x] XSS prevention
- [x] SQL injection prevention
- [x] Rate limiting ready
- [x] Audit logging schema
- [ ] Two-factor authentication (ready to implement)

---

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Component-based architecture
- Proper error handling
- Comprehensive logging

---

## Roadmap

### Phase 1-7: Complete ✅
All core features implemented and tested

### Planned Features
- [ ] Mobile app (React Native)
- [ ] SMS notifications
- [ ] Video conferencing
- [ ] Advanced AI training
- [ ] Custom workflows
- [ ] White-label options

---

## Support

- **Documentation**: [docs.bazawada.ai](https://docs.bazawada.ai)
- **Issues**: [GitHub Issues](https://github.com/bazawada/bazawada-ai/issues)
- **Email**: support@bazawada.ai
- **Status**: [status.bazawada.ai](https://status.bazawada.ai)

---

## License

MIT License - see [LICENSE](LICENSE) file for details

---

## Acknowledgments

Built with:
- Next.js & React team
- Vercel infrastructure
- Neon PostgreSQL
- The amazing open-source community

---

**Made with ❤️ by the Bazawada Team**

**Version**: 1.0.0  
**Last Updated**: July 2024
