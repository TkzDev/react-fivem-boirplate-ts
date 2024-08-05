import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { isEnvBrowser } from '../utils/misc'
import { observe } from '../hooks/observe'
import { emit } from '../utils/emit'
import { useNui } from '@/store/useNui'
import { useNavigate } from 'react-router-dom'

interface VisibilityProviderValue {}

const VisibilityContext = createContext<VisibilityProviderValue | null>(null)

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(isEnvBrowser())
  const navigate = useNavigate()
  const {
    setExampleState,
  } = useNui()

  observe('ui:ParadiseCore::OpenUI', (data) => {
    setExampleState(data.example)
    navigate('*')
    setVisible(true)
  })

  observe('ui:ParadiseCore::CloseUI', () => setVisible(false))

  useEffect(() => {
    if (!visible) return
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (!isEnvBrowser()) emit('cl:ParadiseCore::CloseUI')
        else setVisible(!visible)
      }
    }

    window.addEventListener('keydown', keyHandler)
    return () => window.removeEventListener('keydown', keyHandler)
  }, [visible])

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
