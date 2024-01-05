import { getServerSession } from '#auth'

export default eventHandler(async (event) => {
   let session = await getServerSession(event)
   if (!session) {
      return { status: 'unauthenticated!' }
   }
   return { status: 'authenticated!', text: 'im protected by an in-endpoint check', session }
})
