'use client'

import { useState } from 'react'
import { Phone, PhoneOff, Mic, Volume2, Settings, Plus, Search, Clock, User, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CallsPage() {
  const [isInCall, setIsInCall] = useState(false)
  const [callFilter, setCallFilter] = useState('all')

  const callHistory = [
    { id: 1, name: 'Sarah Johnson', company: 'TechStart Inc', duration: '12:34', date: '2 hours ago', status: 'completed', type: 'outbound', recording: true },
    { id: 2, name: 'Michael Chen', company: 'Growth Co', duration: '8:15', date: '4 hours ago', status: 'completed', type: 'inbound', recording: true },
    { id: 3, name: 'Emma Wilson', company: 'Startup Plus', duration: '22:45', date: '1 day ago', status: 'completed', type: 'outbound', recording: true },
    { id: 4, name: 'Robert Garcia', company: 'Enterprise Plus', duration: '15:20', date: '2 days ago', status: 'completed', type: 'inbound', recording: true },
    { id: 5, name: 'Lisa Anderson', company: 'Global Solutions', duration: '5:42', date: '3 days ago', status: 'missed', type: 'inbound', recording: false },
  ]

  const activeContacts = [
    { id: 1, name: 'Sarah Johnson', status: 'available', initials: 'SJ' },
    { id: 2, name: 'Mike Wilson', status: 'in_call', initials: 'MW' },
    { id: 3, name: 'Jessica Lee', status: 'available', initials: 'JL' },
    { id: 4, name: 'David Chen', status: 'busy', initials: 'DC' },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calls & Voice</h1>
          <p className="text-muted-foreground mt-1">Manage business calls and voice interactions</p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          New Call
        </Button>
      </div>

      {/* Current Call (if in call) */}
      {isInCall && (
        <div className="bg-gradient-to-r from-accent to-blue-600 rounded-lg p-8 text-white">
          <div className="flex items-center justify-center flex-col gap-4">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-12 h-12" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">Sarah Johnson</h2>
              <p className="text-sm text-white/80">TechStart Inc</p>
            </div>
            <div className="text-4xl font-bold font-mono">05:32</div>
            <div className="flex gap-4 mt-4">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/20 border-white text-white hover:bg-white/30"
              >
                <Mic className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/20 border-white text-white hover:bg-white/30"
              >
                <Volume2 className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                className="bg-destructive hover:bg-destructive/90 text-white gap-2"
                onClick={() => setIsInCall(false)}
              >
                <PhoneOff className="w-5 h-5" />
                End Call
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Total Calls (This Month)</p>
          <p className="text-3xl font-bold text-foreground mt-1">247</p>
          <p className="text-xs text-success mt-2">↑ 12% from last month</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Avg Call Duration</p>
          <p className="text-3xl font-bold text-foreground mt-1">12:34</p>
          <p className="text-xs text-muted-foreground mt-2">minutes</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Recordings</p>
          <p className="text-3xl font-bold text-success mt-1">98%</p>
          <p className="text-xs text-muted-foreground mt-2">Call capture rate</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Response Rate</p>
          <p className="text-3xl font-bold text-accent mt-1">87%</p>
          <p className="text-xs text-muted-foreground mt-2">Answered calls</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Call History */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Call History</h2>

            {/* Filters */}
            <div className="flex gap-2 mb-4">
              {['all', 'outbound', 'inbound', 'missed'].map((filter) => (
                <Button
                  key={filter}
                  variant={callFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCallFilter(filter)}
                  className="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Call List */}
            <div className="space-y-3">
              {callHistory.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                        {call.type === 'outbound' ? (
                          <Phone className="w-5 h-5 text-accent" />
                        ) : (
                          <Phone className="w-5 h-5 text-accent rotate-180" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{call.name}</p>
                        <p className="text-xs text-muted-foreground">{call.company}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm font-medium text-foreground">{call.duration}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{call.date}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    onClick={() => setIsInCall(true)}
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Contacts</h2>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search contacts..." className="pl-10" />
          </div>

          {/* Contact List */}
          <div className="space-y-2">
            {activeContacts.map((contact) => (
              <button
                key={contact.id}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
              >
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {contact.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{contact.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {contact.status === 'in_call' ? 'In Call' : contact.status}
                  </p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    contact.status === 'available'
                      ? 'bg-success'
                      : contact.status === 'in_call'
                        ? 'bg-warning'
                        : 'bg-muted-foreground'
                  }`}
                ></div>
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <p className="text-sm font-medium text-foreground mb-3">Quick Actions</p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Phone className="w-4 h-4" />
                Start Conference
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Settings className="w-4 h-4" />
                Call Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
