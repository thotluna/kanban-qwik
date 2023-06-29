import { component$ } from '@builder.io/qwik'
import { AUTH_ACTIONS } from '~/auth/constants'
import type { AuthActionButton } from '~/auth/types'
import { Button } from '~/shared/components/button'
import { GithubIcon, GoogleIcon } from '~/shared/components/icons'
import { Spinner } from '~/shared/components/spinner'

interface GroupButtonRowProps {
  onGoogle: () => void
  onGithub: () => void
  isLoading?: boolean
  action?: AuthActionButton
}

export const GroupButtonRow = component$<GroupButtonRowProps>(
  ({
    onGoogle: googleHandler,
    onGithub: githubHandler,
    isLoading = false,
    action = undefined,
  }) => {
    return (
      <div class='w-full flex justify-between items-center py-1 gap-2'>
        <Button
          classText='w-full'
          onClickButton={githubHandler}
          disabled={isLoading}
        >
          {action !== AUTH_ACTIONS.GITHUB && <GithubIcon size={24} />}
          {action === AUTH_ACTIONS.GITHUB && <Spinner />}
          <span>Github</span>
        </Button>
        <Button
          classText='w-full'
          onClickButton={googleHandler}
          disabled={isLoading}
        >
          {action === AUTH_ACTIONS.GOOGLE && <Spinner />}
          {action !== AUTH_ACTIONS.GOOGLE && (
            <picture class={!isLoading ? 'grayscale-0' : 'grayscale '}>
              <GoogleIcon width={24} height={24} />
            </picture>
          )}
          Google
        </Button>
      </div>
    )
  }
)
