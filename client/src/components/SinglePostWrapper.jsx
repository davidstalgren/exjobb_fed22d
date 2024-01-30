export function SinglePostWrapper({ id, userId, firstName, lastName, location, userPictureUrl, content, contentPictureUrl, likes, comments }) {
  console.log('id', id);
  console.log('userId', userId);
  console.log('firstName', firstName);
  console.log('lastName', lastName);
  console.log('location', location);
  console.log('userPictureUrl', userPictureUrl);
  console.log('content', content);
  console.log('contentPictureUrl', contentPictureUrl);
  console.log('likes', likes);
  console.log('comments', comments);
  return (
    <>
      <p>{id}{userId}{firstName}{lastName}{location}{userPictureUrl}{content}{contentPictureUrl}</p>
    </>
  )
}