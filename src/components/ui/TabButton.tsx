import React from 'react'

interface Props {
  active: boolean
  onClick: () => void
  color: string
  children: React.ReactNode
}

const TabButton: React.FC<Props> = ({ active, onClick, color, children }) => (
  <button
    className={`rounded-xl px-3 py-2 text-sm font-medium transition 
      ${active ? `${color} text-gray-900 shadow` : 'text-gray-600 hover:bg-gray-50'}`}
    onClick={onClick}
  >
    {children}
  </button>
)

export default TabButton
