export function getSocialCardProps({user, post, id}) {
  return {
    id,
    nickName: user.nickName,
    userName: user.userName,
    postDate: post.date,
    cardContent: post.content,
    hasExternalSource: post.hasExternalSource,
    commentsCount: post.comments.count,
    likesCount: post.likes.count,
    retweetsCount: post.retweet.count,
    hasRetweeted: post.user.hasRetweeted,
    hasLiked: post.user.hasLiked,
    externalSourceProps: post.externalSource,
  }
}
