'use client'

import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, DollarSign, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customers: any = {
    '1': {
      id: 1,
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '+1-800-123-4567',
      company: 'Acme Corp Inc',
      city: 'San Francisco, CA',
      country: 'USA',
      status: 'active',
      ltv: '$125,400',
      totalPurchases: 34,
      lastPurchase: '2 days ago',
      joinedDate: 'January 15, 2023',
      notes: 'Enterprise customer. Requires dedicated support.',
      purchases: [
        { date: '2 days ago', amount: '$12,500', items: 'Annual License x2' },
        { date: '1 month ago', amount: '$8,900', items: 'Professional Setup' },
        { date: '2 months ago', amount: '$15,200', items: 'Premium Support' },
      ]
    }
  }

  const customer = customers[params.id] || customers['1']

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/demo/customers">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{customer.name}</h1>
          <p className="text-muted-foreground mt-1">{customer.company}</p>
        </div>
      </div>

      {/* Customer Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Mail className="w-4 h-4" />
            <span className="text-sm">Email</span>
          </div>
          <p className="text-foreground font-medium">{customer.email}</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Phone className="w-4 h-4" />
            <span className="text-sm">Phone</span>
          </div>
          <p className="text-foreground font-medium">{customer.phone}</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Location</span>
          </div>
          <p className="text-foreground font-medium">{customer.city}</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Joined</span>
          </div>
          <p className="text-foreground font-medium">{customer.joinedDate}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Lifetime Value</p>
          <p className="text-3xl font-bold text-accent mt-2">{customer.ltv}</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Purchases</p>
          <p className="text-3xl font-bold text-foreground mt-2">{customer.totalPurchases}</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Last Purchase</p>
          <p className="text-lg font-semibold text-foreground mt-2">{customer.lastPurchase}</p>
        </div>
      </div>

      {/* Purchase History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Purchase History</h2>
        <div className="space-y-3">
          {customer.purchases.map((purchase: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <p className="text-foreground font-medium">{purchase.items}</p>
                <p className="text-sm text-muted-foreground">{purchase.date}</p>
              </div>
              <p className="text-lg font-semibold text-accent">{purchase.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-3">Notes</h2>
        <p className="text-foreground">{customer.notes}</p>
      </div>
    </div>
  )
}
