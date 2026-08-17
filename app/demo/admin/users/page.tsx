'use client'

import { Users, Trash2, Edit2, Plus } from 'lucide-react'
import { useState } from 'react'

const DEMO_USERS = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@bazawada.ai', role: 'Admin', status: 'active', joined: '2024-01-15' },
  { id: 2, name: 'Michael Chen', email: 'michael@bazawada.ai', role: 'Manager', status: 'active', joined: '2024-02-03' },
  { id: 3, name: 'Emily Rodriguez', email: 'emily@bazawada.ai', role: 'Support', status: 'active', joined: '2024-02-20' },
  { id: 4, name: 'James Wilson', email: 'james@bazawada.ai', role: 'Developer', status: 'inactive', joined: '2024-01-10' },
  { id: 5, name: 'Lisa Anderson', email: 'lisa@bazawada.ai', role: 'Manager', status: 'active', joined: '2024-03-01' },
]

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredUsers = DEMO_USERS.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-2">Manage admin and team members</p>
        </div>
        <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground"
        />
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Joined</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition">
                <td className="px-6 py-4 text-foreground">{user.name}</td>
                <td className="px-6 py-4 text-muted-foreground text-sm">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active'
                      ? 'bg-success/10 text-success'
                      : 'bg-muted/50 text-muted-foreground'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{user.joined}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded transition">
                      <Edit2 className="w-4 h-4 text-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded transition">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm">Total Users</p>
          <p className="text-2xl font-bold text-foreground">{DEMO_USERS.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm">Active Users</p>
          <p className="text-2xl font-bold text-success">{DEMO_USERS.filter(u => u.status === 'active').length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm">Inactive Users</p>
          <p className="text-2xl font-bold text-warning">{DEMO_USERS.filter(u => u.status === 'inactive').length}</p>
        </div>
      </div>
    </div>
  )
}
