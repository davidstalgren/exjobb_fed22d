import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <>
      <div>PageNotFound component, this will show if the specifed URL is non existent.</div>
      <Link to="/">Home</Link>
    </>
  )
}