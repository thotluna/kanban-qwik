import { component$ } from '@builder.io/qwik'
import { Button } from '~/shared/components/button'
import { GithubIcon, GoogleIcon } from '~/shared/components/icons'

interface GroupButtonRowProps {
  googleHandler: () => void
  githubHandler: () => void
}

export const GroupButtonRow = component$<GroupButtonRowProps>(
  ({ googleHandler, githubHandler }) => {
    return (
      <div class='w-full flex justify-between items-center py-1 gap-2'>
        <Button classText='w-full' onClickButton={githubHandler}>
          <GithubIcon size={24} />
          Github
        </Button>
        <Button classText='w-full' onClickButton={googleHandler}>
          <GoogleIcon />
          Google
        </Button>
      </div>
    )
  }
)
