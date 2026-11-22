const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const topLiked = blogs.reduce((max, blog) => {
    return blog.likes > max.likes
    ? blog
    : max
  }, blogs[0])
  return topLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}