import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Card = forwardRef(({ className, style, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('ui-card', className)}
    style={style}
    {...props}
  >
    {children}
  </div>
))
Card.displayName = 'Card'
