'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from './RegisterForm.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function register() {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const data: RegisterResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }

    console.log(data.user);
    router.push(`/profile/${data.user.username}`);
    router.refresh();
  }

  return (
    <form onSubmit={(event) => event.preventDefault}>
      <label>
        username:
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        password:
        <input
          value={password}
          type="password"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <label>
        company:
        <input
          value={company}
          onChange={(event) => setCompany(event.currentTarget.value)}
        />
      </label>
      <label>
        country:
        <input
          value={country}
          onChange={(event) => setCountry(event.currentTarget.value)}
        />
      </label>
      <button className={styles.button} onClick={async () => await register()}>
        sign up
      </button>
      {error !== '' && <div className={styles.error}>{error}</div>}
    </form>
  );
}
