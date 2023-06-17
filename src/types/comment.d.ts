interface Comment {
  id: `${string}-${string}-${string}-${string}-${string}`
  user: UserMin
  comment: string
  timestap: number
  listComment: ListComments
}
