import { VisibilityProvider } from '@app/contexts/VisibilityContext';
import { isEnvBrowser } from '@app/utils/misc';
import { Home } from '@views/pages/home';
import clsx from 'clsx';
import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <VisibilityProvider>
      <div
        className={clsx(
          'w-screen h-screen grid place-items-center transition-opacity',
          isEnvBrowser() && 'bg-zinc-700',
        )}
      >
        <div
          className="max-[1600px]:scale-75 transition-all duration-[5.4s] ease-in-out"
        >
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Home />} />

          </Routes>
        </div>
      </div>
    </VisibilityProvider>
  );
}
