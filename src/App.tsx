import { useState } from 'react'
import './App.css'
import { Logo } from './components/Logo/Logo'
import { Form } from './components/Form/Form'
import { Header } from './components/Header/Header'
import { Intro } from './components/Intro/Intro'
import { News } from './components/News/News'

interface IForm {
  login: string,
  password: string,
}

interface IError {
  exists: boolean,
  message: string,
}

interface IState {
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
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState<IState>();
  const [displayIntro, setDisplayIntro] = useState(true);
  const [displayNews, setDisplayNews] = useState(false);

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
      console.log(data)
    } catch(e) {
      console.log(e)
    }
    // fetch('http://localhost:7070/private/me', {
    //         method: 'GET',
    //         headers: {
    //           'Authorization':
    //             `Bearer ${token}`,
    //         },
    //       })
    //   .then(response => {
    //     if (response.status === 400) {
    //       setError((prev) => ({
    //         ...prev,
    //         exists: true,
    //         message: response.statusText,
    //       }))
    //       return;
    //     } else {
    //       response.json();
    //     }
    //   })
    //     .then(data => console.log(data));
  }

  // const requestNews = ()

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
          setToken(data.token);
          localStorage.setItem('token', token); // устанавливается со второго раза
        }
      })
      requestProfile(token);
  }

  return (
    <div className='common-container'>
      {error.exists && <div className='error'>{error.message}</div>}
      <Header>
        <Logo title={'Neto Social'} />
        <Form login={form.login} password={form.password} onChange={handleChange} onSubmit={handleSubmit} />
      </Header>
      {displayIntro && <Intro intro={'Neto Social. Facebook and VK killer'} />}
      {displayNews && <News />}
    </div>
  )
}

export default App
