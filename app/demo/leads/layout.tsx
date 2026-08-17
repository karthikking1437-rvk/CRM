'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, Kanban } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LeadsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isKanban = pathname.includes('/kanban')

  return (
    <div className="flex flex-col">
      {/* View Switcher */}
      <div className="border-b border-input bg-background px-6 py-4 flex items-center gap-2">
        <Link href="/demo/leads">
          <Button
            variant={isKanban ? 'outline' : 'default'}
            size="sm"
            className="gap-2"
          >
            <LayoutGrid className="w-4 h-4" />
            List View
          </Button>
        </Link>
        <Link href="/demo/leads/kanban">
          <Button
            variant={isKanban ? 'default' : 'outline'}
            size="sm"
            className="gap-2"
          >
            <Kanban className="w-4 h-4" />
            Kanban Board
          </Button>
        </Link>
      </div>

      {/* Content */}
      {children}
    </div>
  )
}
