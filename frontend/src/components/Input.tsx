import { FC, HTMLInputTypeAttribute, ChangeEventHandler } from 'react'

interface Props {
  label: string
  name?: string
  value: any
  type?: HTMLInputTypeAttribute
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Input: FC<Props> = ({ label, name, value, type, onChange }) => {
  return (
    <div className='input'>
      <label>{label}</label>
      <input name={name} value={value} type={type || 'text'} onChange={onChange} />
    </div>
  )
}

export default Input
