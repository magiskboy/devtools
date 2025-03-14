import { useState } from "react";
import { html } from '@codemirror/lang-html';
import Editor from "../../components/editor";

const Page = () => {
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
          <iframe srcDoc={htmlValue} width={"100%"} height={'600px'} />
        </div>
      </div>
    </>
  )
}


const HTML_VALUE_DEFAULT = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/png" href="/favicon.svg">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css">

    <title>DevTools - Tools for developers</title>
  <style type="text/css" data-vite-dev-id="/Users/nkthanh/code/devtools/src/App.module.css">
    ._root_10g8z_1 {
      height: 100%;
    }

    ._heading_10g8z_5 {
      width: 100%;
      text-align: center;
      padding: 4em 0;
    }

    ._heading_10g8z_5 p {
      font-style: italic;
      font-size: 1.2em;
    }

    ._group-content_10g8z_33 {
      display: grid;
      grid-template-columns: auto auto auto auto;
      gap: 8px;
    }

    ._group-item_10g8z_39 {
      text-align: center;
    }

  </style>
  <style type="text/css" data-vite-dev-id="/Users/nkthanh/code/devtools/src/Layout.module.css">
    ._root_z9a70_1 {
      height: 100%;
    }

    ._footer_z9a70_5 {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 8px 16px;
      text-align: center;
      padding: 32px 0;
    }

    ._topbar_z9a70_14 {
      margin: 4px 0 8px 0;
    }

    ._menu_z9a70_18:hover > ._menu-content_z9a70_18 {
      display: block;
    }

    ._menu-content_z9a70_18 {
      display: none;
      position: absolute;
      width: 100%;
      top: 32;
      left: 0;
      z-index: 1;
      background: white;
      padding: 8px;
    }

    ._menu-content_z9a70_18 ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    ._menu-content_z9a70_18 ul li._title_z9a70_39 {
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      margin-bottom: 8px;
    }
  </style>
</head>
<div class="_heading_10g8z_5"><h1>DevTools</h1><p>Tools for developers<br>The Ultimate Toolkit to Simplify, Automate, and Enhance Your Development Workflow!</p></div>
</html>
`

export default Page;
