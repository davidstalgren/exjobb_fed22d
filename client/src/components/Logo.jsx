import { Box } from "@mui/material"
import '../style/logo.css'

export function Logo({width}) {

  return (
    <Box sx={{width: width}}>
      <img src="gpn_logo.png" alt="GreenPatch Network Logotype"></img>
    </Box>
  )
}