'use client'

import { useState } from 'react'
import { MoreVertical, ArrowUpRight, MessageSquare, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

const mockLeads = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    stage: 'Qualified',
    source: 'Website',
    value: 15000,
    lastContact: '2 days ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@business.com',
    phone: '+1 (555) 234-5678',
    stage: 'In Progress',
    source: 'Referral',
    value: 25000,
    lastContact: '5 hours ago',
    status: 'active',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@corp.com',
    phone: '+1 (555) 345-6789',
    stage: 'Initial Contact',
    source: 'Cold Call',
    value: 8000,
    lastContact: '3 weeks ago',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@startup.io',
    phone: '+1 (555) 456-7890',
    stage: 'Proposal Sent',
    source: 'LinkedIn',
    value: 35000,
    lastContact: '1 day ago',
    status: 'active',
  },
  {
    id: '5',
    name: 'Robert Garcia',
    email: 'rgarcia@enterprise.com',
    phone: '+1 (555) 567-8901',
    stage: 'Negotiation',
    source: 'Partner',
    value: 50000,
    lastContact: '6 hours ago',
    status: 'active',
  },
]

const stageColors: Record<string, string> = {
  'Initial Contact': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  'In Progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  'Qualified': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  'Proposal Sent': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  'Negotiation': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
}

interface LeadsTableProps {
  searchTerm?: string
  filterStage?: string
}

export default function LeadsTable({ searchTerm = '', filterStage = 'all' }: LeadsTableProps) {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)

    const matchesStage = filterStage === 'all' || lead.stage === filterStage

    return matchesSearch && matchesStage
  })

  return (
    <div className="border border-input rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-input bg-muted/30">
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border border-input w-4 h-4 cursor-pointer"
                  onChange={(e) => {
                    setSelectedLeads(e.target.checked ? mockLeads.map(l => l.id) : [])
                  }}
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stage</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Source</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Value</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Last Contact</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-input hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border border-input w-4 h-4 cursor-pointer"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={(e) => {
                      setSelectedLeads(e.target.checked
                        ? [...selectedLeads, lead.id]
                        : selectedLeads.filter(id => id !== lead.id)
                      )
                    }}
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${stageColors[lead.stage] || 'bg-gray-100 text-gray-700'}`}>
                    {lead.stage}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{lead.source}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    ${(lead.value / 1000).toFixed(0)}k
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{lead.lastContact}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Calendar className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No leads found</p>
        </div>
      )}
    </div>
  )
}
