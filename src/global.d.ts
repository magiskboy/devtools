export {};

declare global {
  class Jsonnet {
    evaluate(code: string): Promise<string>;
  }

  function getJsonnet(jnWasm: Promise<Response>): Promise<Jsonnet>;

  interface Window {
    jsonnet:  {
      name: 'jsonnet',
      startState: () => unknown,
      token: (stream: unknown, state: unknown) => string,
      languageData: object,
    }
  }
}
