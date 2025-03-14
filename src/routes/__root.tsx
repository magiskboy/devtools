import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { MenuProvider } from '../contexts/menu';
import { Layout } from '../components/layout';
import { SearchModal } from '../components/search-modal';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <MenuProvider>
        <Layout>
          <Outlet />
          <SearchModal />
        </Layout>
      </MenuProvider>
    </React.Fragment>
  )
}
