import { CreatePostWrapper } from "./CreatePostWrapper";
import { FriendsListWrapper } from "./FriendsListWrapper";
import { PostsWrapper } from "./PostsWrapper";
import { UserWrapper } from "./UserWrapper";

export function ProfileView() {
  return (
    <>
      <div>ProfileView component</div>
      <UserWrapper></UserWrapper>
      <CreatePostWrapper></CreatePostWrapper>
      <PostsWrapper></PostsWrapper>
      <FriendsListWrapper></FriendsListWrapper>
    </>
  )
}