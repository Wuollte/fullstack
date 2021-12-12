const dummy = (blogs) => {
    return 1
  }
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return blogs.length === 0
      ? 0 
      : blogs.reduce(reducer, 0)

}
const favoriteBlog = (blogs) => {
  const helper = blogs.concat()
  helper.sort((firstItem,secondItem) => secondItem.likes-firstItem.likes)
  return(helper[0])
}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }