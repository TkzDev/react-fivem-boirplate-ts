import { create } from 'zustand'

interface NuiState {
  exampleState: boolean
  setExampleState: (exampleState: boolean) => void
}

export const useNui = create<NuiState>((set) => ({
  exampleState: true,
  setExampleState: (exampleState) => set({ exampleState }),
}))
