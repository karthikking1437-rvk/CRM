import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3, MessageSquare, Phone, Calendar } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="font-bold text-lg text-foreground">Bazawada AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <Link
              href="/dashboard"
              className="text-sm font-medium px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
            >
              Open Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
            <span className="text-sm font-medium text-accent">✨ AI-Powered Business Automation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Replace Your Receptionist & CRM with AI
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Bazawada AI automates customer communication, lead management, appointments, and invoicing. Perfect for
            clinics, salons, gyms, restaurants, and local businesses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="text-base font-medium px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2">
              Open Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#features"
              className="text-base font-medium px-8 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">Powerful Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: MessageSquare,
              title: 'AI Chat Assistant',
              description: 'Answer customer questions automatically 24/7',
            },
            {
              icon: Phone,
              title: 'AI Call Handling',
              description: 'Route and transcribe incoming calls automatically',
            },
            {
              icon: Calendar,
              title: 'Smart Appointments',
              description: 'Automatic scheduling with calendar sync',
            },
            {
              icon: BarChart3,
              title: 'Advanced Analytics',
              description: 'Track leads, revenue, and team performance',
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-accent/10 to-blue-500/10 rounded-2xl border border-accent/20 p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to automate your business?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already using Bazawada AI to save time and serve customers better.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Open Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Bazawada AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
