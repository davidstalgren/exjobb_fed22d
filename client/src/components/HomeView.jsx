import { CreatePostWrapper } from "./CreatePostWrapper";
import { FriendsListWrapper } from "./FriendsListWrapper";
import { PostsWrapper } from "./PostsWrapper";
import { UserWrapper } from "./UserWrapper";
import { Navbar } from "./Navbar";

export function HomeView() {
  return (
    <>
      <Navbar></Navbar>
      <div>HomeView component</div>
      <UserWrapper></UserWrapper>
      <CreatePostWrapper></CreatePostWrapper>
      <PostsWrapper></PostsWrapper>
      <FriendsListWrapper></FriendsListWrapper>
    </>
  )
}