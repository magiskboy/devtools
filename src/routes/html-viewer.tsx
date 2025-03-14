import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react";
import { html } from '@codemirror/lang-html';
import Editor from "../components/editor";

export const Route = createFileRoute('/html-viewer')({
  component: RouteComponent,
})

function RouteComponent() {
  const [htmlValue, setHTML] = useState(HTML_VALUE_DEFAULT);
  
  const onChange = (value: string) => {
    setHTML(value);
  }

  return (
    <>
      <div className="row" style={{marginBottom: '2em'}}>
        <div className="column">
          <Editor height="600px" onChange={onChange} value={htmlValue} extensions={[html()]} />
        </div>
      </div>
      <div className="row" style={{display: 'flex', flexDirection: 'column'}}>
        <div className="column">
          <h4>Preview</h4>
        </div>
        <div className="column">
          <iframe srcDoc={htmlValue} width={"100%"} height={'600px'} frameBorder={1} style={{ background: 'white' }} />
        </div>
      </div>
    </>
  )
}

const HTML_VALUE_DEFAULT =
`<html lang="en">
<head>
  <title>DevTools - Tools for developers</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

  <style>
    * {
      font-family: Roboto, sans-serif;
    }
    
  </style>
</head>
<body>
  <center>
    <h1 style="font-weight: 200; font-size: 3em">DevTools</h1>
    <p style="font-weight: 300; font-style: italic">Tools for developers</p>
    <p style="font-weight: 300; font-style: italic">The Ultimate Toolkit to Simplify, Automate, and Enhance Your Development Workflow!</p>
  </center>
</body>
</html>`;

