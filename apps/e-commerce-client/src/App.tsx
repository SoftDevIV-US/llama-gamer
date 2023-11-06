import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className='grid min-h-screen place-content-center bg-slate-600 text-center text-lg font-bold text-white'>
      <h1>Hello World</h1>
      <p>Count: {count}</p>
      <button type='button' onClick={() => setCount(count + 1)}>
        click
      </button>
    </main>
  );
}

export default App;
