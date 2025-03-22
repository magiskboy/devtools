import { createLazyFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router';
import { ROUTE_CONFIG } from '@/routes.config';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="container has-text-centered mb-6">
        <h1 className="title is-size-2">DevTools</h1>
        <div className="block is-italic">
          <p>Tools for developers</p>
          <p>The Ultimate Toolkit to Simplify, Automate, and Enhance Your Development Workflow!</p>
        </div>
      </div>

        <div className="grid is-col-min-12 px-5">
          {ROUTE_CONFIG.map(tool => (
            <div className="cell" key={tool.name}>
              <div className="card">
                <div className="card-header">
                  <div className="card-header-title">
                    <Link to={tool.path}>{tool.name}</Link>
                  </div>
                </div>
                <div className="card-content">
                  {tool.description} 
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

