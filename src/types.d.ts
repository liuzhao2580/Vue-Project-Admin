interface Window {
  DDLogin(object: { id; goto; style; width; height }): void
  G6: any
}
declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        [key: string] : string | undefined
        NODE_ENV?: 'development' | 'production' | 'pages' | 'test'
      }
    }
  }
}

