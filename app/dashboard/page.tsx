'use client'

import { useSession } from '@/lib/auth-client'
import {
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Phone,
  Users,
} from 'lucide-react'

export default function DashboardPage() {
  const { data: session } = useSession()

  // Placeholder data - will be fetched from API
  const stats = [
    {
      label: 'Total Leads',
      value: '1,234',
      change: '+12%',
      icon: Briefcase,
      color: 'bg-blue-50 dark:bg-blue-950',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Customers',
      value: '856',
      change: '+8%',
      icon: Users,
      color: 'bg-green-50 dark:bg-green-950',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'Today\'s Revenue',
      value: '$12,450',
      change: '+15%',
      icon: FileText,
      color: 'bg-purple-50 dark:bg-purple-950',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      label: 'Pending Tasks',
      value: '24',
      change: '-3%',
      icon: Clock,
      color: 'bg-orange-50 dark:bg-orange-950',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {session?.user?.name || 'there'}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your business today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
                  <ArrowUpRight className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                icon: Briefcase,
                title: 'New lead from website',
                description: 'John Doe - john@example.com',
                time: '2 minutes ago',
              },
              {
                icon: Calendar,
                title: 'Appointment scheduled',
                description: 'Sarah Smith - Tomorrow at 10:00 AM',
                time: '15 minutes ago',
              },
              {
                icon: MessageSquare,
                title: 'New WhatsApp message',
                description: 'From +1 (555) 123-4567',
                time: '1 hour ago',
              },
              {
                icon: Phone,
                title: 'Missed call from customer',
                description: 'Mike Johnson - Returned call',
                time: '3 hours ago',
              },
            ].map((activity, idx) => {
              const Icon = activity.icon
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="mt-1">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{activity.title}</p>
                    <p className="text-muted-foreground text-sm truncate">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: 'Create Lead', href: '/leads/new' },
              { label: 'Book Appointment', href: '/appointments/new' },
              { label: 'Create Invoice', href: '/invoices/new' },
              { label: 'Send Message', href: '/messages' },
              { label: 'View Analytics', href: '/analytics' },
              { label: 'Team Settings', href: '/settings/team' },
            ].map((action, idx) => (
              <button
                key={idx}
                className="w-full text-left px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-accent/10 to-blue-500/10 rounded-xl border border-accent/20">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-foreground mb-2">🚀 Pro Tip</h3>
            <p className="text-sm text-foreground/80">
              Set up WhatsApp integration to automatically respond to customer messages with AI. This can save you
              hours of manual work each week!
            </p>
          </div>
          <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors ml-4 whitespace-nowrap">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
