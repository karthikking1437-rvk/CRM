'use client'

import { MessageCircle, CreditCard, BarChart3, Mail, CheckCircle, AlertCircle, Link2 } from 'lucide-react'
import { useState } from 'react'

const INTEGRATIONS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Enable WhatsApp messaging for customer communication',
    icon: MessageCircle,
    status: 'connected',
    connected: '2024-01-15',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing for subscriptions and invoices',
    icon: CreditCard,
    status: 'connected',
    connected: '2024-01-10',
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Track business performance and user behavior',
    icon: BarChart3,
    status: 'disconnected',
    connected: null,
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Email delivery service for notifications',
    icon: Mail,
    status: 'connected',
    connected: '2024-02-03',
  },
]

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS)

  const toggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(int =>
        int.id === id
          ? {
              ...int,
              status: int.status === 'connected' ? 'disconnected' : 'connected',
              connected: int.status === 'connected' ? null : new Date().toISOString().split('T')[0],
            }
          : int
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
        <p className="text-muted-foreground mt-2">Connect third-party services to extend platform capabilities</p>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon
          const isConnected = integration.status === 'connected'

          return (
            <div key={integration.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{integration.description}</p>
                  </div>
                </div>
                <div className={`p-2 rounded-full ${isConnected ? 'bg-success/10' : 'bg-warning/10'}`}>
                  {isConnected ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-warning" />
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  Status: <span className={isConnected ? 'text-success' : 'text-warning'}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </p>
                {integration.connected && (
                  <p className="text-xs text-muted-foreground">
                    Connected since: {integration.connected}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => toggleIntegration(integration.id)}
                    className={`flex-1 px-4 py-2 rounded-lg transition text-sm font-medium flex items-center justify-center gap-2 ${
                      isConnected
                        ? 'bg-muted text-foreground hover:bg-muted/80'
                        : 'bg-accent text-white hover:bg-accent/90'
                    }`}
                  >
                    <Link2 className="w-4 h-4" />
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </button>
                  <button className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition text-sm font-medium">
                    Config
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Integration Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm">Total Integrations</p>
          <p className="text-2xl font-bold text-foreground">{integrations.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm">Connected</p>
          <p className="text-2xl font-bold text-success">{integrations.filter(i => i.status === 'connected').length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm">Available</p>
          <p className="text-2xl font-bold text-foreground">12+</p>
        </div>
      </div>
    </div>
  )
}
