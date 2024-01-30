export function SinglePostWrapper({id, userId, firstName, lastName, location, userPictureUrl, content, contentPictureUrl, likes, comments}) {
  console.log(id);
  return (
    <>
    <p>{id}{userId}{firstName}{lastName}{location}</p>
    </>
  )
}