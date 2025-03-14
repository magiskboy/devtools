import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { MenuProvider } from '../contexts/menu';
import { Layout } from '../components/layout';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <MenuProvider>
        <Layout>
          <Outlet />
        </Layout>
      </MenuProvider>
    </React.Fragment>
  )
}
