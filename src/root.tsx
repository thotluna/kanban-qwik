import { component$ } from '@builder.io/qwik'
import {
  RouterOutlet,
  QwikCityProvider,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import { RouterHead } from './shared/components/router-head'

import './global.css'
import { MessageProvider } from './message/context'
import { UserSessionProvider } from './auth/contexts'
import { AuthProvider } from './auth/component'

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet='utf-8' />
        <link rel='manifest' href='/manifest.json' />
        <RouterHead />
      </head>
      <body lang='en' class=' bg-slate-800 text-slate-100 h-screen'>
        <MessageProvider>
          <UserSessionProvider>
            <AuthProvider>
              <RouterOutlet />
            </AuthProvider>
          </UserSessionProvider>
        </MessageProvider>
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  )
})
