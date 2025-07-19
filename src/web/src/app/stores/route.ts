import { create } from 'zustand'

interface DefaultStorageProps {
  default: number
  setDefault: (defaultVal: number) => void
}

export const DefaultStorage = create<DefaultStorageProps>((set) => ({
  default: 0,
  setDefault: (defaultVal) => set({ default: defaultVal }),
}))