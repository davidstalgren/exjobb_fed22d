import { Box } from "@mui/material";

export function ProfileImage({ pictureUrl, size ='3.75rem' }) {
  return (
    <Box width={size} height={size}>
      <Box 
        component='img' 
        src={`${process.env.REACT_APP_API_URL}/assets/${pictureUrl}`} 
        alt='Profile of user' 
        width={size}
        height={size}
        borderRadius='50%' 
        sx={{
          objectFit: 'cover'
        }}/>      
    </Box>
  )
}