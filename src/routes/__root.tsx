import React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { MenuProvider } from '@/contexts';
import { SearchModal, Layout } from '@/components';

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
