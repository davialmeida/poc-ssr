import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/app'
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  

  //@ts-ignore
const dehydratedState = window.__REACT_QUERY_STATE__

const queryClient = new QueryClient()


 
ReactDOM.hydrate(
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <App />
      </HydrationBoundary>
    </QueryClientProvider>,
    document.getElementById('root'),
  )