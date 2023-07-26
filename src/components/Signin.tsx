import { ChangeEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SigninRequestData } from '@/features/auth/auth.service';
import { signin } from '@/features/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { Path } from '@/utils/path.enum';

function Signin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Sign in credentials commited on purpose
  const initialFormState: SigninRequestData = {
    email: 'john@mail.com',
    password: 'changeme',
  };

  const [formState, setFormState] = useState<SigninRequestData>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange({ target: { name, value } }: ChangeEvent<HTMLInputElement>) {
    setFormState((prev) => ({ ...prev, [name]: value.trim() }));
  }

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      await dispatch(signin(formState)).unwrap();
      navigate(Path.PRIVATE);
    } catch (error) {
      console.error(`Error submitting sign in form: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>Sign in</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          disabled={isLoading}
          value={formState.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          disabled={isLoading}
          value={formState.password}
          onChange={handleInputChange}
        />
        <button disabled={isLoading} onClick={handleSubmit}>
          Sign in
        </button>
      </div>
    </>
  );
}

export default Signin;
