interface Card extends Base, Position, Color {
  description?: string | null
  miembros: MinUser[]
  labels: Label[]
  tasks: ListTasks[]
  comments: ListComments
}
