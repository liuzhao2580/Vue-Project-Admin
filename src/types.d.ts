export {}
declare global {
  interface Window {
    DDLogin(object: { id; goto; style; width; height }): void
    G6: any
  }
}
