import { useEffect, useState } from 'react'
import './App.css'
import { Logo } from './components/Logo/Logo'
import { Form } from './components/Form/Form'
import { Header } from './components/Header/Header'
import { Intro } from './components/Intro/Intro'
import { News } from './components/News/News'
import { LogoutWidget } from './components/LogoutWidget/LogoutWidget'

interface IForm {
  login: string,
  password: string,
}

interface IError {
  exists: boolean,
  message: string,
}

export interface IState {
  id: string,
  avatar: string,
  login: string,
  name: string,
}

function App() {
  const [form, setForm] = useState<IForm>({
    login: '',
    password: '',
  });
  const [error, setError] = useState<IError>({
    exists: false,
    message: '',
  });
  const [profile, setProfile] = useState<IState | undefined>();
  const [displayIntro, setDisplayIntro] = useState(true);
  const [news, setNews] = useState([]);

  async function requestProfile(token: string) {
    try {
      const response = await fetch('http://localhost:7070/private/me', {
        method: 'GET',
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      })
      const data = await response.json();
      setProfile(data);
      setDisplayIntro(false);
    } catch(e) {
        console.log(e)
    }
  }

  async function requestNews(token: string) {
    const response = await fetch('http://localhost:7070/private/news', {
      method: 'GET',
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    })
    const data = await response.json();
    setNews(data);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError((prev) => ({
      ...prev,
      exists: false,
      message: '',
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.login.trim() || !form.password.trim()) return;
    fetch('http://localhost:7070/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(response => response.json())
      .then(data => {
        if (!data.token) {
          setError((prev) => ({
            ...prev,
            exists: true,
            message: data.message,
          }))
          return;
        } else {
          localStorage.setItem('token', data.token);
        }
        return data.token;
      })
      .then((token) => {
        requestProfile(token);
        requestNews(token);
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setDisplayIntro(true);
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      requestProfile(storedToken);
      requestNews(storedToken);
    }
  }, []);

  return (
    <div className='common-container'>
      {error.exists && <div className='error'>{error.message}</div>}
      <Header>
        <Logo title={'Neto Social'} />
        {displayIntro && <Form login={form.login} password={form.password} onChange={handleChange} onSubmit={handleSubmit} />}
        {!displayIntro && <LogoutWidget profile={profile} onClick={handleLogout} />}
      </Header>
      {displayIntro && <Intro intro={'Neto Social. Facebook and VK killer'} />}
      {!displayIntro && <News news={news} />}
    </div>
  )
}

export default App
