'use client'

import { useState } from 'react'
import { MessageSquare, Send, Paperclip, Phone, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(1)
  const [message, setMessage] = useState('')

  const chats = [
    { id: 1, name: 'Acme Corporation', lastMessage: 'Can we schedule a call?', unread: 0, avatar: 'AC', time: '2:30 PM' },
    { id: 2, name: 'TechStart Inc', lastMessage: 'Thanks for the proposal!', unread: 2, avatar: 'TS', time: '1:15 PM' },
    { id: 3, name: 'Global Solutions', lastMessage: 'When can we meet?', unread: 0, avatar: 'GS', time: '11:00 AM' },
    { id: 4, name: 'FastGrowth Startups', lastMessage: 'Looking good!', unread: 1, avatar: 'FG', time: 'Yesterday' },
    { id: 5, name: 'Enterprise Plus', lastMessage: 'Contract approved ✓', unread: 0, avatar: 'EP', time: '3 days ago' },
  ]

  const messages = [
    { id: 1, sender: 'Acme Corporation', text: 'Hi! We received your quote.', time: '10:30 AM', sent: false },
    { id: 2, sender: 'You', text: 'Great! Do you have any questions?', time: '10:35 AM', sent: true },
    { id: 3, sender: 'Acme Corporation', text: 'Can we schedule a call?', time: '2:30 PM', sent: false },
  ]

  const activeChat1 = chats.find(c => c.id === activeChat)

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* Sidebar */}
      <div className="w-80 bg-card border border-border rounded-lg flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Messages</h2>
          <p className="text-xs text-muted-foreground mt-1">5 Active Conversations</p>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`w-full px-4 py-3 border-b border-border text-left transition-colors ${
                activeChat === chat.id ? 'bg-accent/10' : 'hover:bg-secondary'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {chat.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">{chat.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-card border border-border rounded-lg flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{activeChat1?.name}</h3>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sent
                  ? 'bg-accent text-white rounded-br-none'
                  : 'bg-secondary text-foreground rounded-bl-none'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sent ? 'text-accent-foreground/70' : 'text-muted-foreground'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border flex gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button size="sm" className="gap-2">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
