'use client'

import { Users, Building2, Settings, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage platform, users, and integrations</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Businesses</p>
              <p className="text-2xl font-bold text-foreground">1,247</p>
            </div>
            <Building2 className="w-10 h-10 text-accent" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Active Users</p>
              <p className="text-2xl font-bold text-foreground">3,891</p>
            </div>
            <Users className="w-10 h-10 text-accent" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold text-foreground">$487K</p>
            </div>
            <BarChart3 className="w-10 h-10 text-success" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">System Health</p>
              <p className="text-2xl font-bold text-success">99.8%</p>
            </div>
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
        </div>
      </div>

      {/* Admin Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/demo/admin/users">
          <div className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors cursor-pointer">
            <Users className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">User Management</h3>
            <p className="text-muted-foreground mb-4">Manage users, roles, and permissions</p>
            <p className="text-accent text-sm font-medium">View Users →</p>
          </div>
        </Link>

        <Link href="/demo/admin/settings">
          <div className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors cursor-pointer">
            <Settings className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Settings</h3>
            <p className="text-muted-foreground mb-4">Configure system settings and defaults</p>
            <p className="text-accent text-sm font-medium">Configure →</p>
          </div>
        </Link>

        <Link href="/demo/admin/integrations">
          <div className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors cursor-pointer">
            <Building2 className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Integrations</h3>
            <p className="text-muted-foreground mb-4">Manage third-party integrations</p>
            <p className="text-accent text-sm font-medium">Configure →</p>
          </div>
        </Link>

        <div className="bg-card border border-border rounded-lg p-8">
          <AlertTriangle className="w-12 h-12 text-warning mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">System Alerts</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">✓ All systems operational</p>
            <p className="text-sm text-muted-foreground">✓ Database performance optimal</p>
            <p className="text-sm text-muted-foreground">✓ API response time: 142ms</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="text-foreground font-medium">New business registered</p>
              <p className="text-sm text-muted-foreground">TechCorp Solutions - Premium Plan</p>
            </div>
            <span className="text-sm text-muted-foreground">2m ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="text-foreground font-medium">Integration enabled</p>
              <p className="text-sm text-muted-foreground">WhatsApp API connected for user account</p>
            </div>
            <span className="text-sm text-muted-foreground">15m ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-foreground font-medium">System maintenance</p>
              <p className="text-sm text-muted-foreground">Database backup completed successfully</p>
            </div>
            <span className="text-sm text-muted-foreground">1h ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
