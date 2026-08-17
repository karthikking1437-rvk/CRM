'use client'

import { useState } from 'react'
import { Download, FileText, BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('sales')

  const reports = [
    {
      id: 'sales',
      name: 'Sales Performance Report',
      description: 'Monthly revenue, conversion rates, and sales pipeline analysis',
      icon: TrendingUp,
      lastGenerated: '2 hours ago',
      size: '2.4 MB',
      format: 'PDF, CSV, Excel',
    },
    {
      id: 'leads',
      name: 'Lead Generation Report',
      description: 'Lead source breakdown, lead quality scores, and conversion funnels',
      icon: Users,
      lastGenerated: '5 hours ago',
      size: '1.8 MB',
      format: 'PDF, CSV, Excel',
    },
    {
      id: 'revenue',
      name: 'Revenue Analysis Report',
      description: 'Customer lifetime value, revenue trends, and profitability analysis',
      icon: DollarSign,
      lastGenerated: '1 day ago',
      size: '3.2 MB',
      format: 'PDF, CSV, Excel',
    },
    {
      id: 'performance',
      name: 'Team Performance Report',
      description: 'Employee metrics, productivity scores, and achievement tracking',
      icon: BarChart3,
      lastGenerated: '3 days ago',
      size: '1.5 MB',
      format: 'PDF, CSV, Excel',
    },
  ]

  const reportDetails = {
    sales: {
      metrics: [
        { label: 'Total Sales', value: '$328,400', change: '+12.5%' },
        { label: 'Avg Sale Value', value: '$8,500', change: '+3.2%' },
        { label: 'Conversion Rate', value: '29.1%', change: '+1.8%' },
        { label: 'Deal Cycle', value: '18 days', change: '-3 days' },
      ],
      sections: [
        { title: 'Monthly Revenue Trend', data: 'Q2 shows strong growth with June reaching peak revenue of $67k' },
        { title: 'Sales by Region', data: 'North: $98k, South: $87k, East: $92k, West: $51.4k' },
        { title: 'Top Performers', data: 'Sarah: $125k YTD, Mike: $118k YTD, Jessica: $85k YTD' },
      ],
    },
    leads: {
      metrics: [
        { label: 'Total Leads', value: '247', change: '+8.3%' },
        { label: 'Qualified Leads', value: '43', change: '+2.1%' },
        { label: 'Lead Quality Score', value: '7.2/10', change: '+0.4' },
        { label: 'Lead Response Time', value: '2.5 hours', change: '-45 min' },
      ],
      sections: [
        { title: 'Lead Source Analysis', data: 'Website: 35%, Referral: 25%, LinkedIn: 20%, Cold Call: 15%, Partner: 5%' },
        { title: 'Lead Status Distribution', data: 'Initial: 24%, In Progress: 36%, Qualified: 17%, Proposal: 11%, Converted: 12%' },
        { title: 'Lead Scoring', data: 'High Score (8-10): 45 leads, Medium Score (5-7): 89 leads, Low Score (0-4): 113 leads' },
      ],
    },
    revenue: {
      metrics: [
        { label: 'Avg Customer LTV', value: '$87,000', change: '+8.3%' },
        { label: 'Customer CAC', value: '$410', change: '-7.3%' },
        { label: 'Gross Margin', value: '68%', change: '+2.1%' },
        { label: 'Revenue Growth', value: '+18.2%', change: 'YoY' },
      ],
      sections: [
        { title: 'Customer Segmentation', data: 'Enterprise: $98k avg LTV, Mid-Market: $65k avg LTV, SMB: $35k avg LTV' },
        { title: 'Revenue Streams', data: 'Subscriptions: 60%, Services: 25%, Add-ons: 15%' },
        { title: 'Churn Analysis', data: 'Monthly Churn: 2.1%, Annual Retention: 87%, Top Churn Reason: Pricing' },
      ],
    },
    performance: {
      metrics: [
        { label: 'Team Size', value: '23', change: '+2 hired' },
        { label: 'Avg Productivity', value: '8.5/10', change: '+0.3' },
        { label: 'Utilization Rate', value: '92%', change: '+1.2%' },
        { label: 'Target Achievement', value: '104%', change: '+4%' },
      ],
      sections: [
        { title: 'Department Performance', data: 'Sales: 112% of target, Support: 98% of target, Operations: 105% of target' },
        { title: 'Training Completion', data: 'Product Training: 100%, System Training: 95%, Certification: 87%' },
        { title: 'Team Satisfaction', data: 'Overall: 8.2/10, Management: 8.5/10, Work Environment: 8.1/10' },
      ],
    },
  }

  const current = reportDetails[selectedReport as keyof typeof reportDetails]
  const selectedReportObj = reports.find(r => r.id === selectedReport)
  const SelectedIcon = selectedReportObj?.icon || BarChart3

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">Generate and export business reports</p>
        </div>
        <Button size="lg" className="gap-2">
          <Download className="w-4 h-4" />
          Export Selected
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report List */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-foreground mb-4">Available Reports</h2>
          <div className="space-y-3">
            {reports.map((report) => {
              const Icon = report.icon
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedReport === report.id
                      ? 'bg-accent/10 border-accent'
                      : 'border-border hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 mt-1 flex-shrink-0 text-accent" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{report.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Generated {report.lastGenerated}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Report Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <SelectedIcon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedReportObj?.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{selectedReportObj?.description}</p>
                  <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                    <span>Last generated: {selectedReportObj?.lastGenerated}</span>
                    <span>Size: {selectedReportObj?.size}</span>
                    <span>Format: {selectedReportObj?.format}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button size="sm" className="gap-1">
                  <FileText className="w-4 h-4" />
                  View
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {current.metrics.map((metric, idx) => (
              <div key={idx} className="bg-card rounded-lg border border-border p-4">
                <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="text-xs text-success mt-1">{metric.change}</p>
              </div>
            ))}
          </div>

          {/* Report Sections */}
          <div className="space-y-4">
            {current.sections.map((section, idx) => (
              <div key={idx} className="bg-card rounded-lg border border-border p-4">
                <h4 className="font-semibold text-foreground mb-2">{section.title}</h4>
                <p className="text-sm text-muted-foreground">{section.data}</p>
              </div>
            ))}
          </div>

          {/* Export Options */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Export Options</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">PDF Export</Button>
              <Button variant="outline" size="sm">CSV Export</Button>
              <Button variant="outline" size="sm">Excel Export</Button>
              <Button variant="outline" size="sm">Email Report</Button>
              <Button variant="outline" size="sm">Schedule Report</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
