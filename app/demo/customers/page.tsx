'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, Eye, Edit, Trash2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const customers = [
    { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', phone: '+1-800-123-4567', status: 'active', ltv: '$125k', lastPurchase: '2 days ago' },
    { id: 2, name: 'TechStart Inc', email: 'hello@techstart.com', phone: '+1-555-234-5678', status: 'active', ltv: '$89k', lastPurchase: '1 week ago' },
    { id: 3, name: 'Global Solutions Ltd', email: 'info@globalsol.com', phone: '+1-888-345-6789', status: 'inactive', ltv: '$156k', lastPurchase: '2 months ago' },
    { id: 4, name: 'FastGrowth Startups', email: 'team@fastgrowth.com', phone: '+1-777-456-7890', status: 'active', ltv: '$45k', lastPurchase: '3 days ago' },
    { id: 5, name: 'Enterprise Plus', email: 'support@entplus.com', phone: '+1-666-567-8901', status: 'active', ltv: '$234k', lastPurchase: '5 hours ago' },
  ]

  const filteredCustomers = customers.filter(
    (c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage and track your customers</p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          New Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Customers</p>
          <p className="text-3xl font-bold text-foreground mt-1">248</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-3xl font-bold text-success mt-1">198</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Avg Lifetime Value</p>
          <p className="text-3xl font-bold text-accent mt-1">$87k</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-3xl font-bold text-accent mt-1">$21.6M</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search customers by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="lg" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-secondary">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">LTV</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Last Purchase</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-secondary transition-colors">
                <td className="px-6 py-4 text-foreground font-medium">{customer.name}</td>
                <td className="px-6 py-4 text-foreground">{customer.email}</td>
                <td className="px-6 py-4 text-foreground">{customer.phone}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    customer.status === 'active'
                      ? 'bg-success/10 text-success'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-accent font-semibold">{customer.ltv}</td>
                <td className="px-6 py-4 text-muted-foreground text-sm">{customer.lastPurchase}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <Link href={`/demo/customers/${customer.id}`}>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
