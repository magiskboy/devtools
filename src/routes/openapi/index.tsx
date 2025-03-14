import { useState } from "react";


const Page = () => {
  const [type, setType] = useState('link');
  const [link, setLink] = useState('https://petstore.swagger.io/v2/swagger.json');
  const [fileContent, setFileContent] = useState<string>('');
  
  return (
    <>
      <div className="row">
        <div className="column column-25">
          <select onChange={e => setType(e.target.value)} value={type} defaultValue={type}>
            <option value="link">Link</option>
            <option value="file">File</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <div className="column column-75">
        {type === 'link' && <input type="text" value={link} onChange={e => setLink(e.target.value)} />}
        {type === 'file' && <input type="file" onChange={e => {
          const file = e.target.files?.[0];
          if (!file) {
            return;
          }
          file.text().then(content => {
            setFileContent(content);
          })
        }} accept=".json,.yaml,.yml"  />}
        </div>
      </div>
      <div className="row">
        <iframe srcDoc={getHtmlContent(link)} width={"100%"} height={"1000px"} />
      </div>
    </>
  )
}

const getHtmlContent = (link: string) => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Elements in HTML</title>
      
        <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
      </head>
      <body>

        <elements-api
          apiDescriptionUrl="${link}"
          router="hash"
        />

      </body>
    </html>`;
}

export default Page;
