interface IFormProps {
    login: string,
    password: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}

export const Form = ({ login, password, onChange, onSubmit }: IFormProps) => {
  return (
    <form onSubmit={onSubmit}>
        <input onChange={onChange} name='login' type='text' placeholder='Username' value={login} />
        <input onChange={onChange} name='password' type='password' placeholder='Password' value={password} />
        <button className='button' name='submit' type='submit'>Login</button>
    </form>
  )
}
