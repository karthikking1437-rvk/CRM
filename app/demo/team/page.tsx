'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Trophy, TrendingUp, Users, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TeamPage() {
  // Team performance data
  const performanceData = [
    { name: 'Sarah Chen', sales: 125000, target: 100000, deals: 24 },
    { name: 'Mike Johnson', sales: 118000, target: 100000, deals: 22 },
    { name: 'Jessica Lee', sales: 85000, target: 100000, deals: 18 },
    { name: 'David Smith', sales: 72000, target: 100000, deals: 15 },
  ]

  // Role breakdown
  const roleData = [
    { name: 'Sales Representatives', value: 12, color: '#2563EB' },
    { name: 'Account Managers', value: 5, color: '#22C55E' },
    { name: 'Support Team', value: 4, color: '#F59E0B' },
    { name: 'Managers', value: 2, color: '#8B5CF6' },
  ]

  // Team members
  const teamMembers = [
    { name: 'Sarah Chen', role: 'Senior Sales Rep', achievements: 24, rating: 9.2, status: 'active' },
    { name: 'Mike Johnson', role: 'Sales Rep', achievements: 22, rating: 8.9, status: 'active' },
    { name: 'Jessica Lee', role: 'Sales Rep', achievements: 18, rating: 8.5, status: 'active' },
    { name: 'David Smith', role: 'Sales Rep', achievements: 15, rating: 8.1, status: 'active' },
    { name: 'Emily Rodriguez', role: 'Account Manager', achievements: 12, rating: 8.3, status: 'active' },
    { name: 'James Wilson', role: 'Support Lead', achievements: 28, rating: 8.7, status: 'active' },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Performance</h1>
          <p className="text-muted-foreground mt-1">Track team members and their achievements</p>
        </div>
        <Button size="lg" className="gap-2">
          <Users className="w-4 h-4" />
          Manage Team
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Team Size</p>
          <p className="text-3xl font-bold text-foreground mt-1">23</p>
          <p className="text-xs text-success mt-2">↑ 2 new hires</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Avg Achievement</p>
          <p className="text-3xl font-bold text-accent mt-1">8.5/10</p>
          <p className="text-xs text-success mt-2">↑ 0.3 from last month</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Team Revenue</p>
          <p className="text-3xl font-bold text-success mt-1">$400k</p>
          <p className="text-xs text-success mt-2">↑ 12% this quarter</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Target Achievement</p>
          <p className="text-3xl font-bold text-foreground mt-1">104%</p>
          <p className="text-xs text-success mt-2">↑ 4% above goal</p>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Top Performers</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }} />
              <Legend />
              <Bar dataKey="sales" fill="var(--color-accent)" name="Actual Sales" radius={[8, 8, 0, 0]} />
              <Bar dataKey="target" fill="var(--color-muted-foreground)" name="Target" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Team Composition */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Team Composition</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Leaderboard */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Team Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Rank</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Achievements</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Rating</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {teamMembers.map((member, idx) => (
                <tr key={idx} className="hover:bg-secondary transition-colors">
                  <td className="px-4 py-3">
                    {idx === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                    {idx === 1 && <Trophy className="w-5 h-5 text-gray-400" />}
                    {idx === 2 && <Trophy className="w-5 h-5 text-orange-600" />}
                    {idx > 2 && <span className="text-foreground font-medium">#{idx + 1}</span>}
                  </td>
                  <td className="px-4 py-3 text-foreground font-medium">{member.name}</td>
                  <td className="px-4 py-3 text-muted-foreground text-sm">{member.role}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="text-foreground font-medium">{member.achievements}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-secondary rounded-full h-2 w-16">
                        <div
                          className="bg-accent h-2 rounded-full"
                          style={{ width: `${(member.rating / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-foreground font-medium text-sm">{member.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 bg-success/10 text-success rounded-full text-xs font-semibold">
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Goals & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-accent" />
            <p className="text-sm text-muted-foreground">Q2 Goals</p>
          </div>
          <p className="text-2xl font-bold text-foreground">156 / 150</p>
          <p className="text-xs text-success mt-1">104% achieved</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <p className="text-sm text-muted-foreground">Best Performer</p>
          </div>
          <p className="text-lg font-bold text-foreground">Sarah Chen</p>
          <p className="text-xs text-muted-foreground mt-1">$125k revenue</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-accent" />
            <p className="text-sm text-muted-foreground">Team Engagement</p>
          </div>
          <p className="text-2xl font-bold text-foreground">87%</p>
          <p className="text-xs text-success mt-1">↑ 3% this month</p>
        </div>
      </div>
    </div>
  )
}
