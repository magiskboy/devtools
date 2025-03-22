import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import * as ga from './libs/ga';
import 'bulma/css/bulma.min.css';

import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })
router.subscribe('onLoad', (event) => {
  ga.pageview(event.toLocation.href);
});


const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
