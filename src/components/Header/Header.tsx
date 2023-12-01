import { PropsWithChildren } from "react"

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <div className='header-container'>
        {children}
    </div>
  )
}
