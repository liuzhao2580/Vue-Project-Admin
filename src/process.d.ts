declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        NODE_ENV?: 'development' | 'production' | 'pages' | 'test'
      }
    }
  }
}
