'use client'

import { useState } from 'react'
import { Download, TrendingUp, Calendar, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('month')

  // Revenue data
  const revenueData = [
    { month: 'Jan', revenue: 48000, target: 50000 },
    { month: 'Feb', revenue: 52000, target: 50000 },
    { month: 'Mar', revenue: 45000, target: 50000 },
    { month: 'Apr', revenue: 61000, target: 50000 },
    { month: 'May', revenue: 55000, target: 50000 },
    { month: 'Jun', revenue: 67000, target: 50000 },
  ]

  // Lead conversion data
  const conversionData = [
    { stage: 'Initial Contact', count: 247 },
    { stage: 'In Progress', count: 89 },
    { stage: 'Qualified', count: 43 },
    { stage: 'Proposal', count: 28 },
    { stage: 'Negotiation', count: 15 },
    { stage: 'Converted', count: 72 },
  ]

  // Source breakdown
  const sourceData = [
    { name: 'Website', value: 35, color: '#2563EB' },
    { name: 'Referral', value: 25, color: '#22C55E' },
    { name: 'LinkedIn', value: 20, color: '#0EA5E9' },
    { name: 'Cold Call', value: 15, color: '#F59E0B' },
    { name: 'Partner', value: 5, color: '#8B5CF6' },
  ]

  // Customer acquisition cost
  const caCData = [
    { month: 'Jan', cac: 450, ltv: 8500 },
    { month: 'Feb', cac: 420, ltv: 8800 },
    { month: 'Mar', cac: 480, ltv: 8200 },
    { month: 'Apr', cac: 390, ltv: 9100 },
    { month: 'May', cac: 410, ltv: 8900 },
    { month: 'Jun', cac: 380, ltv: 9300 },
  ]

  // Key metrics
  const metrics = [
    { label: 'Total Revenue (YTD)', value: '$328k', change: '+12.5%' },
    { label: 'Avg Deal Size', value: '$8.5k', change: '+3.2%' },
    { label: 'Conversion Rate', value: '29.1%', change: '+1.8%' },
    { label: 'Customer LTV', value: '$87k', change: '+8.3%' },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track performance and business metrics</p>
        </div>
        <Button size="lg" className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Date Range Selector */}
      <div className="flex gap-3">
        {['week', 'month', 'quarter', 'year'].map((range) => (
          <Button
            key={range}
            variant={dateRange === range ? 'default' : 'outline'}
            onClick={() => setDateRange(range)}
            className="capitalize"
          >
            {range === 'quarter' ? 'Q2' : range.charAt(0).toUpperCase() + range.slice(1)}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <span className="text-sm text-success font-semibold">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Revenue vs Target</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px'
            }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-accent)', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="var(--color-muted-foreground)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-muted-foreground)', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Lead Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Lead Conversion Funnel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={conversionData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }} />
              <Bar dataKey="count" fill="var(--color-accent)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Source Pie Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Leads by Source</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CAC vs LTV */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Customer Acquisition Cost vs Lifetime Value</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={caCData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px'
            }} />
            <Legend />
            <Bar dataKey="cac" fill="var(--color-warning)" name="CAC" radius={[8, 8, 0, 0]} />
            <Bar dataKey="ltv" fill="var(--color-success)" name="LTV" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground mb-2">Pipeline Value</p>
          <p className="text-2xl font-bold text-accent">$1.24M</p>
          <p className="text-xs text-muted-foreground mt-2">↑ 8% from last month</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground mb-2">Win Rate</p>
          <p className="text-2xl font-bold text-success">34.2%</p>
          <p className="text-xs text-muted-foreground mt-2">↑ 2.1% from last month</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground mb-2">Avg Sales Cycle</p>
          <p className="text-2xl font-bold text-foreground">18 days</p>
          <p className="text-xs text-muted-foreground mt-2">↓ 3 days from last month</p>
        </div>
      </div>
    </div>
  )
}
