import { useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { BoxSpaced, BoxSpacedColumn } from "./styled/StyledBox";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export function PageNotFound() {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const navigate = useNavigate();

  return (
    <Box sx={isDesktop ? ({...{
      backgroundImage: "url('gpn_logo50opacity.png')", 
      backgroundPosition: 'bottom -23rem right -20rem',
      backgroundRepeat: `no-repeat`,
      backgroundSize: '65rem',
      backgroundClip: 'content-box',
      backgroundAttachment: 'fixed',
      height: "100vh",
      width: "100%",
    }}) : ({...{
      backgroundImage: "url('gpn_logo50opacity.png')",
      backgroundPosition: 'bottom -15rem right -15rem',
      backgroundRepeat: `no-repeat`,
      backgroundSize: '40rem',
      backgroundClip: 'content-box',
      backgroundAttachment: 'fixed',
      height: "100vh",
      width: "100%",
    }})}>
      <BoxSpaced padding='1rem' backgroundColor={theme.palette.background.alt}>
        {isDesktop ? <Logo width={75} /> : <Logo width={50} />}
          <Typography align="center" variant="h1" color="primary" fontWeight='900' fontSize='clamp(1rem, 2vw + 1rem, 4rem)'>
            GreenPatch Network
          </Typography>
          <Box width={isDesktop ? '75px' : '50px'}>
            <ThemeToggle></ThemeToggle>
          </Box>
      </BoxSpaced>
      <Box width={isDesktop ? '50%' : '90%'} padding='1.5rem' margin='1.5rem auto' borderRadius='1rem' backgroundColor={theme.palette.background.alt}>
        <Typography align='center' fontSize='clamp(1rem, 0.5vw + 1rem, 1.25rem)' marginBottom='1rem'>
          Sorry to say but that lawn simply does not exist...
        </Typography>
        <Divider variant='middle'></Divider>
        <Box display='flex' justifyContent='center' gap='2rem' marginTop='1rem'>
          <BoxSpacedColumn>
            <IconButton onClick={(e) => {
              e.preventDefault();
              navigate(-1);
              }}>
              <ArrowBackOutlinedIcon fontSize='large' color="primary"></ArrowBackOutlinedIcon>
            </IconButton>
            <Typography color="primary">Back</Typography>
          </BoxSpacedColumn>
          <BoxSpacedColumn>
            <IconButton onClick={() => {navigate('/')}}>
              <HomeOutlinedIcon fontSize='large' color="primary"></HomeOutlinedIcon>
            </IconButton>
            <Typography color="primary">Home</Typography>
          </BoxSpacedColumn>
        </Box>
      </Box>
    </Box>
  )
}