'use client'

import { useState } from 'react'
import { Plus, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stages = ['Initial Contact', 'In Progress', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted']

const mockLeadsData: Record<string, any[]> = {
  'Initial Contact': [
    { id: '1', name: 'Michael Chen', email: 'mchen@corp.com', value: 8000 },
  ],
  'In Progress': [
    { id: '2', name: 'Sarah Johnson', email: 'sarah@business.com', value: 25000 },
    { id: '6', name: 'Lisa Anderson', email: 'lisa@company.com', value: 12000 },
  ],
  'Qualified': [
    { id: '3', name: 'John Smith', email: 'john@example.com', value: 15000 },
  ],
  'Proposal Sent': [
    { id: '4', name: 'Emma Wilson', email: 'emma@startup.io', value: 35000 },
  ],
  'Negotiation': [
    { id: '5', name: 'Robert Garcia', email: 'rgarcia@enterprise.com', value: 50000 },
  ],
  'Converted': [],
}

const stageColors: Record<string, string> = {
  'Initial Contact': 'bg-gray-100 dark:bg-gray-800',
  'In Progress': 'bg-blue-100 dark:bg-blue-900/30',
  'Qualified': 'bg-green-100 dark:bg-green-900/30',
  'Proposal Sent': 'bg-purple-100 dark:bg-purple-900/30',
  'Negotiation': 'bg-orange-100 dark:bg-orange-900/30',
  'Converted': 'bg-emerald-100 dark:bg-emerald-900/30',
}

export default function KanbanPage() {
  const [leads, setLeads] = useState(mockLeadsData)

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sales Pipeline</h1>
        <p className="text-sm text-muted-foreground mt-1">Drag and drop to move leads between stages</p>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-6 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div key={stage} className="min-w-80 flex flex-col gap-4">
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{stage}</h3>
                <p className="text-xs text-muted-foreground">{leads[stage]?.length || 0} leads</p>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Cards Container */}
            <div className={`flex flex-col gap-3 ${stageColors[stage]} rounded-lg p-4 min-h-96`}>
              {leads[stage]?.map((lead: any) => (
                <div
                  key={lead.id}
                  className="bg-background border border-input rounded-lg p-3 cursor-move hover:shadow-md transition-shadow"
                  draggable
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="mt-3 pt-3 border-t border-input">
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      ${(lead.value / 1000).toFixed(0)}k
                    </p>
                  </div>
                </div>
              ))}

              {(!leads[stage] || leads[stage].length === 0) && (
                <div className="flex items-center justify-center py-12">
                  <p className="text-xs text-muted-foreground">No leads</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-muted/30 border border-input rounded-lg p-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Total Pipeline Value</p>
            <p className="text-2xl font-bold text-foreground mt-1">$145k</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Average Deal Size</p>
            <p className="text-2xl font-bold text-foreground mt-1">$24.2k</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conversion Rate</p>
            <p className="text-2xl font-bold text-foreground mt-1">29.1%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Sales Velocity</p>
            <p className="text-2xl font-bold text-foreground mt-1">8.2 days</p>
          </div>
        </div>
      </div>
    </div>
  )
}
