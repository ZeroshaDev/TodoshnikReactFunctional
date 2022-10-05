export const mapFromDTO = (post) => {
  return {
    id: post.id,
    content: post.content,
    completed: post.completed,
  }
}
