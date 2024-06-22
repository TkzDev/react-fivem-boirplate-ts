import { Route, Routes, useNavigate } from 'react-router-dom';
import { useNuiEvent } from './hooks/useNuiEvent';
import Home from './pages/Home';
import { clsx } from 'clsx';
import { isEnvBrowser } from './utils/misc';
import { useState } from 'react';

export default function App() {
  return (
    <div
      id='interface'
      className={clsx(
        'w-screen  h-screen flex items-center justify-center',
        isEnvBrowser() && 'bg-background bg-cover'
      )}
    >
      <Routes>
        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  );
}
