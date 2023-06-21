import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

interface HeaderProps {
  title: string
  messageLink: string
  href: string
}

export const Header = component$<HeaderProps>(
  ({ title, messageLink, href }) => {
    return (
      <header class=' flex gap-1 flex-col justify-between items-center'>
        <div class='w-16 h-16 bg-slate-500 rounded-full border-2 border-slate-300  '></div>
        <h1 class='text-4xl'>{title}</h1>
        <span class='text-sm text-slate-300'>
          Or{' '}
          <Link href={href}>
            <span class='text-green-400'>{messageLink}</span>
          </Link>
        </span>
      </header>
    )
  }
)
