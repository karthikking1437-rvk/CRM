'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Download, Eye, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const invoices = [
    { id: 'INV-001', customer: 'Acme Corporation', amount: '$12,500', status: 'paid', date: '2024-01-15', dueDate: '2024-02-15' },
    { id: 'INV-002', customer: 'TechStart Inc', amount: '$8,900', status: 'pending', date: '2024-01-10', dueDate: '2024-02-10' },
    { id: 'INV-003', customer: 'Global Solutions', amount: '$15,200', status: 'overdue', date: '2024-01-01', dueDate: '2024-01-31' },
    { id: 'INV-004', customer: 'FastGrowth Startups', amount: '$5,600', status: 'paid', date: '2024-01-20', dueDate: '2024-02-20' },
    { id: 'INV-005', customer: 'Enterprise Plus', amount: '$35,800', status: 'pending', date: '2024-01-18', dueDate: '2024-02-18' },
  ]

  const filtered = invoices.filter(
    (i) => i.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           i.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground mt-1">Create and manage invoices</p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          New Invoice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Invoices</p>
          <p className="text-3xl font-bold text-foreground mt-1">248</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Paid</p>
          <p className="text-3xl font-bold text-success mt-1">$687k</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-3xl font-bold text-warning mt-1">$156k</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">Overdue</p>
          <p className="text-3xl font-bold text-destructive mt-1">$45k</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Invoice ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Due Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-secondary transition-colors">
                <td className="px-6 py-4 text-foreground font-medium">{invoice.id}</td>
                <td className="px-6 py-4 text-foreground">{invoice.customer}</td>
                <td className="px-6 py-4 text-accent font-semibold flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {invoice.amount}
                </td>
                <td className="px-6 py-4 text-foreground text-sm">{invoice.date}</td>
                <td className="px-6 py-4 text-foreground text-sm">{invoice.dueDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    invoice.status === 'paid' ? 'bg-success/10 text-success' :
                    invoice.status === 'pending' ? 'bg-warning/10 text-warning' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="w-4 h-4" />
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
