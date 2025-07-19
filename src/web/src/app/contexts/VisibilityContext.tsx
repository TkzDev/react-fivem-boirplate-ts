import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { isEnvBrowser } from '../utils/misc'
import { useNuiMessage } from '../hooks/useNuiMessage'
import { useNuiCallback } from '../hooks/useNuiCallback'
import { useNavigate } from 'react-router-dom'
interface VisibilityProviderValue { }

const VisibilityContext = createContext<VisibilityProviderValue | null>(null)

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(isEnvBrowser())
  const navigate = useNavigate()

  useEffect(() => {
    if (!visible) return navigate('*')
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (!isEnvBrowser()) useNuiCallback('hideFrame')
        else setVisible(!visible), navigate('*')
      }
    }

    window.addEventListener('keydown', keyHandler)
    return () => window.removeEventListener('keydown', keyHandler)
  }, [visible])

  useNuiMessage('setVisible', (data: any) => {
    setVisible(data.visible)
    navigate(data.path)
  });

  return (
    <VisibilityContext.Provider value={{}}>
      {visible && children}
    </VisibilityContext.Provider>
  )
}

export const useVisibility = () =>
  useContext<VisibilityProviderValue>(
    VisibilityContext as Context<VisibilityProviderValue>,
  )