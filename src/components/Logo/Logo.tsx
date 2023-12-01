export type TTitle = {
    title: string,
}

export const Logo = ({ title }: TTitle) => {
  return (
    <div className='logo-text'>{title}</div>
  )
}
