# Bazawada AI - Deployment Guide

## Production-Ready SaaS Platform

This comprehensive guide covers deploying Bazawada AI to production on Vercel with full infrastructure setup.

---

## Quick Start Deployment

### Prerequisites
- GitHub account with repository access
- Vercel account
- Neon PostgreSQL database (configured)
- Domain name (optional but recommended)

### 1-Click Deployment

```bash
# Clone the repository
git clone <your-repo-url>
cd bazawada-ai

# Install dependencies
pnpm install

# Create environment variables
cp .env.example .env.local

# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Add environment variables:
   ```
   DATABASE_URL=postgresql://...
   BETTER_AUTH_SECRET=<random-32-char-string>
   NODE_ENV=production
   ```
5. Click "Deploy"

---

## Environment Configuration

### Production Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host/bazawada

# Authentication
BETTER_AUTH_SECRET=your-32-char-random-secret
BETTER_AUTH_URL=https://yourdomain.com

# Vercel
VERCEL_PROJECT_PRODUCTION_URL=yourdomain.com

# Email Service (SendGrid)
SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# Stripe Payments
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# WhatsApp Integration
WHATSAPP_BUSINESS_PHONE_ID=your-phone-id
WHATSAPP_ACCESS_TOKEN=your-access-token

# Analytics
SENTRY_DSN=your-sentry-dsn
```

---

## Database Setup

### Neon PostgreSQL

1. Create a Neon project at [console.neon.tech](https://console.neon.tech)
2. Create a database named `bazawada`
3. Get the connection string
4. Run migrations:

```bash
# Using Vercel integration
pnpm build

# Database is automatically initialized on first connection
```

### Database Schema

The schema is automatically created via Drizzle migrations on first deployment:
- 50+ tables with proper indexing
- Multi-tenant support
- Audit logging
- Soft deletes

---

## Performance Optimization

### Caching Strategy

```
- Static pages: Cached for 1 year
- Dashboard: Cached for 60 seconds (ISR)
- Real-time data: No cache
- API responses: 5-minute cache with revalidation
```

### Database Optimization

```sql
-- Ensure all indexes are created
-- Verify query performance
-- Monitor slow queries in Neon dashboard
-- Set up automated backups
```

### Image Optimization

- All images are automatically optimized by Next.js
- Use the `Image` component instead of `<img>`
- Lazy load images below the fold
- Serve WebP format when possible

---

## Monitoring & Observability

### Error Tracking with Sentry

```bash
# Install Sentry
pnpm add @sentry/nextjs

# Configure in next.config.mjs
```

### Performance Monitoring

```
- Core Web Vitals: Monitor with NextJS Analytics
- Database performance: Check Neon dashboard
- API response times: View Vercel Analytics
- Error rates: Track in Sentry
```

### Logging

```javascript
// Use structured logging
console.log("[API]", "Action", { userId, data })
console.error("[ERROR]", message, error)
```

---

## Security Checklist

- [x] HTTPS enforced on all routes
- [x] CSRF protection enabled
- [x] XSS protection via React
- [x] SQL injection prevention (Drizzle)
- [x] Rate limiting configured
- [x] JWT tokens secure
- [x] Passwords hashed (Better Auth)
- [ ] Two-factor authentication (ready to implement)
- [ ] API key management (schema ready)
- [ ] Audit logging (schema ready)

### Enable Additional Security

```typescript
// Rate limiting
import Ratelimit from "@upstash/ratelimit"

// API key management
// Implement API key schema
```

---

## Backup & Disaster Recovery

### Automated Backups

Neon provides:
- Automated daily backups (7-day retention)
- Point-in-time recovery
- High availability with replication

### Manual Backup

```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Restore from backup
psql $DATABASE_URL < backup.sql
```

---

## Scaling Strategy

### Horizontal Scaling

Vercel automatically scales:
- Serverless functions scale automatically
- Static pages cached on edge
- Database connections pooled

### Vertical Scaling

As load increases:
1. Upgrade Neon plan (higher CPU/RAM)
2. Enable database replicas
3. Increase connection pool size
4. Implement caching layer (Redis)

### Database Scaling

For 100,000+ businesses:
- Neon handle millions of connections
- Implement sharding if needed
- Use read replicas for analytics

---

## Continuous Deployment

### GitHub Actions

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
```

### Staging Environment

1. Create staging branch
2. Deploy to staging URL
3. Run tests
4. Manual review
5. Merge to main for production

---

## Post-Deployment Checklist

- [ ] Test all authentication flows
- [ ] Verify database connections
- [ ] Check email delivery (SendGrid)
- [ ] Test payment processing (Stripe)
- [ ] Verify WhatsApp integration
- [ ] Monitor error tracking (Sentry)
- [ ] Load test with simulated users
- [ ] Check SSL certificate
- [ ] Set up domain name
- [ ] Configure DNS records
- [ ] Set up email SPF/DKIM records
- [ ] Enable monitoring dashboards
- [ ] Configure alerting
- [ ] Document admin procedures
- [ ] Train support team

---

## Troubleshooting

### Database Connection Issues

```
Error: ECONNREFUSED
Solution: Check DATABASE_URL in Vercel environment
```

### Authentication Errors

```
Error: BETTER_AUTH_SECRET not set
Solution: Generate with: openssl rand -base64 32
```

### Build Failures

```
Error: Dependency not found
Solution: Run pnpm install locally, commit package.json
```

### Performance Issues

```
Check:
1. Database query performance (Neon dashboard)
2. API response times (Vercel Analytics)
3. Image optimization (Next.js Image)
4. Bundle size (npm bundle analyzer)
```

---

## Cost Estimation

### Monthly Costs (at scale)

| Service | Cost | Notes |
|---------|------|-------|
| Vercel Pro | $20 | Unlimited deployments |
| Neon (Pro) | $50-200 | Depends on storage/compute |
| SendGrid | $25-100 | Based on email volume |
| Stripe | 2.9% + $0.30 | Per transaction |
| Sentry | $29 | Error tracking |
| Domain | $12 | Annual |
| **Total** | **$150-400/mo** | For 10K-100K users |

---

## Maintenance

### Weekly Tasks
- Monitor error rates
- Check database performance
- Review access logs

### Monthly Tasks
- Review security logs
- Check backup integrity
- Update dependencies
- Performance analysis

### Quarterly Tasks
- Security audit
- Capacity planning
- Disaster recovery test
- Team training

---

## Support & Resources

- **Documentation**: [docs.bazawada.ai](https://docs.bazawada.ai)
- **Status Page**: [status.bazawada.ai](https://status.bazawada.ai)
- **Support Email**: support@bazawada.ai
- **GitHub Issues**: [github.com/bazawada/issues](https://github.com/bazawada/issues)

---

**Version**: 1.0  
**Last Updated**: July 2024  
**Maintained By**: Bazawada Team
