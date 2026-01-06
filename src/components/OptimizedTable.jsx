import React, { memo } from 'react'

// Optimized table row component to prevent unnecessary re-renders
export const TableRow = memo(({ 
  children, 
  className = "", 
  onClick, 
  ...props 
}) => {
  return (
    <tr 
      className={className} 
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  )
})

TableRow.displayName = 'TableRow'

// Optimized table cell component
export const TableCell = memo(({ 
  children, 
  className = "", 
  ...props 
}) => {
  return (
    <td className={className} {...props}>
      {children}
    </td>
  )
})

TableCell.displayName = 'TableCell'

// Optimized table component
export const OptimizedTable = memo(({ 
  children, 
  className = "",
  ...props 
}) => {
  return (
    <table className={className} {...props}>
      {children}
    </table>
  )
})

OptimizedTable.displayName = 'OptimizedTable'
