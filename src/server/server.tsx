import express from 'express'
import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { App } from '../client/components/app'
import { QueryClient, hydrate, QueryClientProvider, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import axios from 'axios'
import { Users } from '../client/components/users'
import { UsersService } from '../services/users/users'

const server = express()

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))
 
server.use('/', express.static(path.join(__dirname, 'static')))
 
const manifest = fs.readFileSync(
  path.join(__dirname, 'static/manifest.json'),
  'utf-8'
)
const assets = JSON.parse(manifest)
 
server.get('/', (req, res) => {
  const component = ReactDOMServer.renderToString(React.createElement(App))
  res.render('index', { assets, component })
})

server.get('/tanstack-query', async (req, res) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: UsersService.get
  })
  const dehydratedState = dehydrate(queryClient)

  const component = ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Users />
      </HydrationBoundary>
    </QueryClientProvider>,
  )

  res.render('client', { assets, component, dehydratedState: JSON.stringify(dehydratedState) })

  queryClient.clear()

})

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`)
})
