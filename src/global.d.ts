export {};

declare global {
  class Jsonnet {
    evaluate(code: string): Promise<string>;
  }

  function getJsonnet(jnWasm: Promise<Response>): Promise<Jsonnet>;
}
