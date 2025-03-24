import { createLazyFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router';
import { ROUTE_CONFIG } from '@/routes.config';
import { memo } from 'react';

interface ToolCardProps {
  name: string;
  path: string;
  description: string;
}

const ToolCard = memo(function ToolCard({ name, path, description }: ToolCardProps) {
  return (
    <div className="cell">
      <div className="card">
        <div className="card-header">
          <div className="card-header-title">
            <Link to={path}>{name}</Link>
          </div>
        </div>
        <div className="card-content">
          {description}
        </div>
      </div>
    </div>
  );
});

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <header className="container has-text-centered mb-6">
        <h1 className="title is-size-2">DevTools</h1>
        <div className="block is-italic">
          <p>Tools for developers</p>
          <p>The Ultimate Toolkit to Simplify, Automate, and Enhance Your Development Workflow!</p>
        </div>
      </header>

      <section className="grid is-col-min-12 px-5" aria-label="Available tools">
        {ROUTE_CONFIG.map(tool => (
          <ToolCard
            key={tool.name}
            name={tool.name}
            path={tool.path}
            description={tool.description}
          />
        ))}
      </section>
    </main>
  );
}

