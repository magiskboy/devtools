import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App'
import Layout from './Layout';

import JsonnetPage from './routes/jsonnet';
import SQLFormatterPage from './routes/sql-formatter';
import YAMLJSONConverterPage from './routes/yaml-json-converter';
import NoMatch from './routes/no-match';
import { MenuProvider } from './contexts/menu';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} /> 
          <Route element={<Layout />}>
            <Route path="jsonnet" element={<JsonnetPage />} />
            <Route path="sql-fmt" element={<SQLFormatterPage />} />
            <Route path="yaml-json" element={<YAMLJSONConverterPage />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  </StrictMode>,
)
