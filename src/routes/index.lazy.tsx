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
    <div className="column is-3">
      <div className="card h-100">
        <div className="card-header">
          <div className="card-header-title">
            <Link to={path} className="has-text-primary">{name}</Link>
          </div>
        </div>
        <div className="card-content">
          <div className="content">
            {description}
          </div>
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
    <main className="container py-3">
      <header className="has-text-centered mb-6">
        <h1 className="title is-1 mb-3">DevTools</h1>
        <div className="subtitle is-4 has-text-grey">
          <p className="mb-2">Tools for developers</p>
          <p className="is-size-5">The Ultimate Toolkit to Simplify, Automate, and Enhance Your Development Workflow!</p>
        </div>
      </header>

      <section className="columns is-multiline" aria-label="Available tools">
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

