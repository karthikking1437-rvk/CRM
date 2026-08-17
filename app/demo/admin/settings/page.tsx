'use client'

import { Settings, Save, RotateCcw } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Bazawada AI',
    supportEmail: 'support@bazawada.ai',
    timezone: 'UTC',
    maxBusinesses: '100000',
    apiRateLimit: '10000',
    sessionTimeout: '24',
    enableSignups: true,
    enableTwoFactor: true,
    maintenanceMode: false,
  })

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Configure system settings and preferences</p>
      </div>

      {/* General Settings */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-foreground">General Settings</h2>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => handleChange('siteName', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Support Email</label>
          <input
            type="email"
            value={settings.supportEmail}
            onChange={(e) => handleChange('supportEmail', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
          >
            <option>UTC</option>
            <option>EST</option>
            <option>CST</option>
            <option>PST</option>
          </select>
        </div>
      </div>

      {/* Platform Limits */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Platform Limits</h2>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Max Businesses</label>
          <input
            type="number"
            value={settings.maxBusinesses}
            onChange={(e) => handleChange('maxBusinesses', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">API Rate Limit (requests/hour)</label>
          <input
            type="number"
            value={settings.apiRateLimit}
            onChange={(e) => handleChange('apiRateLimit', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Session Timeout (hours)</label>
          <input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => handleChange('sessionTimeout', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Security Settings</h2>
        
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Enable Signups</label>
          <input
            type="checkbox"
            checked={settings.enableSignups}
            onChange={(e) => handleChange('enableSignups', e.target.checked)}
            className="w-4 h-4"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Require Two-Factor Authentication</label>
          <input
            type="checkbox"
            checked={settings.enableTwoFactor}
            onChange={(e) => handleChange('enableTwoFactor', e.target.checked)}
            className="w-4 h-4"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Maintenance Mode</label>
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
            className="w-4 h-4"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <button className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        <button className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  )
}
