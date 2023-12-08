import { IState } from "../../App"

interface ILogoutWidgetProps {
  profile: IState | undefined,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export const LogoutWidget = ({ profile, onClick }: ILogoutWidgetProps) => {
  if (!profile) return;
  const { avatar, name } = profile;
  return (
    <div className="logout-widget">
      <h4>{`Hello, ${name}`}</h4>
      <div className="avatar">
        <img src={avatar} />
      </div>
      <button onClick={onClick} className="logout-button">Logout</button>
    </div>
  )
}
