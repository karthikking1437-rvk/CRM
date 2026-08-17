'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Plus, MoreVertical, Paperclip, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Bazawada AI Assistant. I can help you with lead management, customer inquiries, scheduling appointments, and business insights. What can I help you with today?',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      role: 'user',
      content: 'Can you show me the leads that are in the negotiation stage?',
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: '3',
      role: 'assistant',
      content: 'I found 15 leads currently in the negotiation stage. Here are the top 3 by deal value:\n\n1. Robert Garcia - Enterprise Plus - $50,000\n2. Emma Wilson - TechStart - $35,000\n3. Lisa Anderson - Growth Co - $28,000\n\nWould you like me to prepare a proposal for any of these, or get more details?',
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: '4',
      role: 'user',
      content: 'Tell me about Robert Garcia\'s deal and what the next steps should be',
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: '5',
      role: 'assistant',
      content: 'Here\'s the summary for Robert Garcia\'s deal:\n\n**Lead Details:**\n- Name: Robert Garcia\n- Company: Enterprise Plus\n- Deal Value: $50,000\n- Current Stage: Negotiation\n- Last Contact: 6 hours ago\n- Source: Partner referral\n\n**Recommended Next Steps:**\n1. Schedule a follow-up call within 24 hours\n2. Prepare a revised proposal addressing their pricing concerns\n3. Get approval from management for any discounts\n4. Send contract draft by end of week\n\nShould I schedule an appointment or send a follow-up message?',
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [conversations, setConversations] = useState([
    { id: '1', name: 'Lead Negotiation Strategy', date: 'Today' },
    { id: '2', name: 'Q2 Sales Forecast', date: 'Yesterday' },
    { id: '3', name: 'Customer Retention Analysis', date: 'Last week' },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'I\'ll analyze that information and get back to you shortly.',
        'Great question! Based on the current data, here\'s what I found...',
        'Let me search our records for more details about that.',
        'I can help you with that. Here\'s what I recommend...',
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex h-[calc(100vh-120px)] gap-4">
      {/* Sidebar */}
      <div className="w-64 bg-card border border-border rounded-lg flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <Button size="sm" className="w-full gap-2">
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-xs text-muted-foreground font-semibold px-2 mb-2">RECENT CHATS</p>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className="w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <p className="text-sm font-medium text-foreground truncate">{conv.name}</p>
                <p className="text-xs text-muted-foreground">{conv.date}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-card border border-border rounded-lg flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Bazawada AI Assistant</h2>
            <p className="text-xs text-muted-foreground">Always ready to help</p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xl px-4 py-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-accent text-white rounded-br-none'
                    : 'bg-secondary text-foreground rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-accent-foreground/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary text-foreground px-4 py-3 rounded-lg rounded-bl-none">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button variant="ghost" size="sm" className="flex-shrink-0">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Ask me anything about your business..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="sm"
              className="flex-shrink-0"
              type="button"
            >
              <Smile className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 gap-2"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Suggestions */}
        <div className="px-4 pb-4">
          <p className="text-xs text-muted-foreground mb-2">QUICK ACTIONS</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              Show today's leads
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Create appointment
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Generate report
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
