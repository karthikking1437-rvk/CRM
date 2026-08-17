'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Calendar, Clock, Users, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const appointments = [
    { id: 1, title: 'Strategy Meeting', customer: 'Acme Corp', time: '10:00 AM', date: 'Today', attendee: 'John Smith', status: 'confirmed', duration: '1h' },
    { id: 2, title: 'Product Demo', customer: 'TechStart Inc', time: '2:00 PM', date: 'Today', attendee: 'Sarah Johnson', status: 'confirmed', duration: '45m' },
    { id: 3, title: 'Follow-up Call', customer: 'Global Solutions', time: '11:00 AM', date: 'Tomorrow', attendee: 'Michael Chen', status: 'pending', duration: '30m' },
    { id: 4, title: 'Contract Signing', customer: 'FastGrowth', time: '3:30 PM', date: 'Tomorrow', attendee: 'Emma Wilson', status: 'confirmed', duration: '1.5h' },
    { id: 5, title: 'Quarterly Review', customer: 'Enterprise Plus', time: '9:00 AM', date: 'Friday', attendee: 'Robert Garcia', status: 'confirmed', duration: '2h' },
  ]

  const filtered = appointments.filter(
    (a) => a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           a.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage your business calendar</p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          New Appointment
        </Button>
      </div>

      {/* Calendar Views */}
      <div className="flex gap-3">
        <Button className="gap-2">
          <Calendar className="w-4 h-4" />
          Week View
        </Button>
        <Button variant="outline" className="gap-2">
          Month View
        </Button>
        <Button variant="outline" className="gap-2">
          Day View
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search appointments, customers..."
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

      {/* Appointments List */}
      <div className="space-y-3">
        {filtered.map((apt) => (
          <div key={apt.id} className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-12 bg-accent rounded-full"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{apt.title}</h3>
                    <p className="text-sm text-muted-foreground">{apt.customer}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  apt.status === 'confirmed'
                    ? 'bg-success/10 text-success'
                    : 'bg-warning/10 text-warning'
                }`}>
                  {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="flex gap-6 mt-4 ml-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{apt.time}</span>
                <span>•</span>
                <span>{apt.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{apt.attendee}</span>
              </div>
              <div className="text-sm text-muted-foreground">{apt.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
