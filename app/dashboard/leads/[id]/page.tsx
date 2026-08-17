'use client'

import { useState } from 'react'
import { ArrowLeft, Plus, Send, Trash2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const [notes, setNotes] = useState([
    { id: '1', author: 'You', text: 'Great lead. Interested in premium plan.', date: '2 hours ago' },
    { id: '2', author: 'Sarah', text: 'Customer mentioned they need implementation help.', date: '1 day ago' },
  ])
  const [newNote, setNewNote] = useState('')

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([
        {
          id: Date.now().toString(),
          author: 'You',
          text: newNote,
          date: 'just now',
        },
        ...notes,
      ])
      setNewNote('')
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard/leads">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Leads
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline">Edit</Button>
          <Button variant="outline" className="text-destructive hover:text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Lead Info */}
          <div className="bg-background border border-input rounded-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">John Smith</h1>
                <p className="text-muted-foreground mt-1">john@example.com</p>
              </div>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                Qualified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Phone</p>
                <p className="text-foreground mt-1">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Deal Value</p>
                <p className="text-foreground mt-1 text-lg font-semibold text-green-600 dark:text-green-400">$15,000</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Lead Source</p>
                <p className="text-foreground mt-1">Website</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Last Contact</p>
                <p className="text-foreground mt-1">2 days ago</p>
              </div>
            </div>
          </div>

          {/* Timeline/Activity */}
          <div className="bg-background border border-input rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Activity Timeline</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Moved to Qualified</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Email sent: Pricing proposal</p>
                  <p className="text-xs text-muted-foreground">5 days ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Lead created</p>
                  <p className="text-xs text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-background border border-input rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Notes</h2>

            {/* Add Note */}
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
              />
              <Button onClick={handleAddNote} className="gap-2">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Notes List */}
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-muted/30 border border-input rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{note.author}</p>
                      <p className="text-xs text-muted-foreground">{note.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-foreground">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Quick Actions */}
          <div className="bg-background border border-input rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start">
                Schedule Call
              </Button>
              <Button variant="outline" className="justify-start">
                Send Email
              </Button>
              <Button variant="outline" className="justify-start">
                Create Task
              </Button>
              <Button variant="outline" className="justify-start">
                Add to Campaign
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="bg-background border border-input rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Company</p>
                <p className="text-foreground mt-1">TechCorp Inc.</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Industry</p>
                <p className="text-foreground mt-1">Technology</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Lead Score</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-sm font-medium text-foreground">85</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Assigned To</p>
                <p className="text-foreground mt-1">Sarah Johnson</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
