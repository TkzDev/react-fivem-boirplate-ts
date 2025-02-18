import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  useVisibility,
  VisibilityProvider,
} from '@app/contexts/VisibilityContext';
import { useNuiCallback } from '@app/hooks/useNuiCallback';
import { ColorVariants, attributeColorsToHTML } from '@app/utils/colors';

export function App() {
  const { visible } = useVisibility();

  useEffect(() => {
    if (!visible) return;

    (async () => {
      const resp = await useNuiCallback<
        | { primaryColor: string; secondaryColor: string; thirdyColor: string }
        | keyof typeof ColorVariants
      >('getColors', {}, 'GALORYS');

      attributeColorsToHTML(resp);
    })();
  }, [visible]);

  return (
    <VisibilityProvider>
      <div className="w-screen h-screen flex justify-center items-center absolute left-0 top-0 z-[2]">
        <Routes></Routes>
      </div>
    </VisibilityProvider>
  );
}
