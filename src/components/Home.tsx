import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Path } from '@/utils/path.enum';

function Home() {
  const navigate = useNavigate();

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    navigate(Path.SIGNIN);
  }

  return (
    <>
      <h1>Homepage</h1>
      <button onClick={handleClick}>Sign in</button>
    </>
  );
}

export default Home;
