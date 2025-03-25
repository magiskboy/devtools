import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/diff')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/diff"!</div>
}
