import { FC } from 'react'

interface Props {
  className?: string
}

const Loading: FC<Props> = ({ className }) => {
  return <div className={`loading ${className}`} />
}

export default Loading
