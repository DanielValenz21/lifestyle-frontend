import React from 'react'

interface Props {
  value: number
  onChange: (v: number) => void
}

const Slider: React.FC<Props> = ({ value, onChange }) => (
  <input
    type="range"
    min={0}
    max={100}
    step={5}
    value={value}
    onChange={e => onChange(+e.target.value)}
    className="w-full h-2 accent-pastelBlue"
  />
)

export default Slider
