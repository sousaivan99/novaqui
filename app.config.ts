export default defineAppConfig({
  myLayer: {
    name: 'NovaqUI'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
