import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'

const runTimeConfig = useRuntimeConfig()

export default NuxtAuthHandler({

  secret: runTimeConfig.authSecret,
  pages: { signIn: '/login'  },
  providers: [

    CredentialsProvider.default({

      name: 'Credentials',

      credentials: {
        username: { label: 'Email', type: 'text', placeholder: '(hint: jsmith@greathospitality.com)' },
        password: { label: 'Password', type: 'password', placeholder: '(hint: hunTer2@9)' }
      },
      async authorize (credentials: any) {

        const encodedEndpoint = encodeURIComponent('zarnik.webshop.api.auth_email_password')

        const erpnextResponse = await fetch(`${runTimeConfig.apiBase}/api/method/${encodedEndpoint}`, {
          method: 'POST',
          headers: {
            'x-auth-token': process.env.CLOUDFLARE_AUTH_TOKEN,
            'Content-Type': 'application/json',
            Authorization: runTimeConfig.apiSecret
          },
          body: JSON.stringify(credentials),
        })

        const {message:response} = await erpnextResponse.json()

        if (response.status === "authenticated") {
          return response
        } 
        else if (response.status === "Locked") {
          console.warn('Warning: Account is temporarily locked. Please try again later.')
          // Hold the API request for the next 5 minutes
          await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000))
          return null 
        }
        else if (response.status === "error") {
          console.warn(`Error 71wu: ${response.message}`)
        }
        else {
          console.error(`Warning: ${response.message}`)
          return null
        }
      }
    })
  ]
})
