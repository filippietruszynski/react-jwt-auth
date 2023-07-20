import { ChangeEvent, useState } from 'react';

import { SigninRequestBody, useSigninMutation } from '@/app/services/api';

export const SigninForm = () => {
  const [signin, { isLoading }] = useSigninMutation();

  const initialFormState: SigninRequestBody = {
    email: '',
    password: '',
  };

  const [formState, setFormState] = useState<SigninRequestBody>(initialFormState);

  function handleInputChange({ target: { name, value } }: ChangeEvent<HTMLInputElement>) {
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      await signin(formState).unwrap();
      setFormState(initialFormState);
    } catch (error) {
      console.error(`Error submitting sign in form: ${error}`);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      Email: john@mail.com
      <input
        type="text"
        name="email"
        placeholder="Email"
        disabled={isLoading}
        value={formState.email}
        onChange={handleInputChange}
      />
      Password: changeme
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
  );
};

export default SigninForm;
