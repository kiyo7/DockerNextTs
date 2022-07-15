//lib
import type { AppProps } from 'next/app'
import { Suspense, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

//components
import { Notice } from '../components/atoms/Notice'
import { Spinner } from '../components/atoms/Spinner'

//style
import '../styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted ? (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner />}>
        <Notice />
        <Component {...pageProps} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  ) : null
}

export default MyApp
