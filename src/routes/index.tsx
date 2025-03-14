import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
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

      <div className="fixed-grid has-4-cols">
        <div className="grid">
          {TOOLS.map(tool => (
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
    </div>
  )
}

const TOOLS = [
  { "name": "Jsonnet", "path": "/jsonnet", "description": "A data templating language for defining and generating JSON with advanced features like variables, conditionals, and functions." },
  { "name": "SQL fmt", "path": "/sql-fmt", "description": "A SQL formatter that structures and beautifies SQL queries for improved readability and maintainability." },
  { "name": "YAML - JSON", "path": "/yaml-json", "description": "A converter that transforms YAML data into JSON format and vice versa for easier interoperability." },
  { "name": "YAML fmt", "path": "/yaml-fmt", "description": "A YAML formatter that organizes and formats YAML documents for better readability and consistency." },
  { "name": "JSON fmt", "path": "/json-fmt", "description": "A JSON formatter that properly indents and structures JSON data for clarity and readability." },
  { "name": "URL", "path": "/url-viewer", "description": "A tool for decoding and encoding URLs, allowing users to inspect and manipulate URL-encoded strings." },
  { "name": "HTML", "path": "/html-viewer", "description": "A viewer that renders and previews raw HTML content, helping users visualize HTML structure and output." },
  { "name": "OpenAPI", "path": "/openapi", "description": "A viewer and editor for OpenAPI specifications, assisting in designing and documenting RESTful APIs." }
]
