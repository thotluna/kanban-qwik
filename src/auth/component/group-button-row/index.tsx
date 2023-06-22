import { component$ } from '@builder.io/qwik'
import { Button } from '~/shared/components/button'
import { GithubIcon, GoogleIcon } from '~/shared/components/icons'
import { Spinner } from '~/shared/components/spinner'

interface GroupButtonRowProps {
  googleHandler: () => void
  githubHandler: () => void
  isLoading?: boolean
}

export const GroupButtonRow = component$<GroupButtonRowProps>(
  ({ googleHandler, githubHandler, isLoading = false }) => {
    return (
      <div class='w-full flex justify-between items-center py-1 gap-2'>
        <Button
          classText='w-full'
          onClickButton={githubHandler}
          disabled={isLoading}
        >
          {!isLoading && <GithubIcon size={24} />}
          {isLoading && <Spinner />}
          <span>Github</span>
        </Button>
        <Button
          classText='w-full'
          onClickButton={googleHandler}
          disabled={isLoading}
        >
          {isLoading && <Spinner />}
          {!isLoading && <GoogleIcon width={24} height={24} />}
          Google
        </Button>
      </div>
    )
  }
)
