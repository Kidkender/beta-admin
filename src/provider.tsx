import { persistor, store } from '@core/stores/redux'
import { Toaster } from '@shared/components/ui/sonner.tsx'
import { type ReactNode, StrictMode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function RootProvider({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <StrictMode>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster richColors theme={'light'} />
          {children}
        </PersistGate>
      </ReduxProvider>
    </StrictMode>
  )
}
