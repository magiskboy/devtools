export {};

declare global {
  class Jsonnet {
    evaluate(code: string): Promise<string>;
  }

  function getJsonnet(jnWasm: Promise<Response>): Promise<Jsonnet>;

  interface Window {
    gtag: (action: string, id: string, params: object) => void;
  }
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}



