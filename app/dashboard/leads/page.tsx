'use client'

import { useState } from 'react'
import { Plus, Search, Filter, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LeadsTable from '@/components/leads/leads-table'
import CreateLeadModal from '@/components/leads/create-lead-modal'

export default function LeadsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStage, setFilterStage] = useState<string>('all')

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leads Pipeline</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage and track your business leads</p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Lead
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-background border border-input rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Total Leads</p>
                <p className="text-2xl font-bold text-foreground mt-1">247</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-background border border-input rounded-lg p-4">
            <p className="text-xs text-muted-foreground font-medium">In Progress</p>
            <p className="text-2xl font-bold text-foreground mt-1">89</p>
          </div>
          <div className="bg-background border border-input rounded-lg p-4">
            <p className="text-xs text-muted-foreground font-medium">Qualified</p>
            <p className="text-2xl font-bold text-foreground mt-1">43</p>
          </div>
          <div className="bg-background border border-input rounded-lg p-4">
            <p className="text-xs text-muted-foreground font-medium">Converted</p>
            <p className="text-2xl font-bold text-foreground mt-1">72</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Leads Table */}
      <LeadsTable searchTerm={searchTerm} filterStage={filterStage} />

      {/* Create Lead Modal */}
      <CreateLeadModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  )
}
