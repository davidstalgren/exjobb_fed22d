import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import { BoxSpaced } from "./styled/StyledBox";
import { Logo } from "./Logo";
import { LoginRegForm } from "./LoginRegForm";
import { ThemeToggle } from "./ThemeToggle";

export function LoginPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width: 900px)');

  return (
    <Box sx={isDesktop ? ({...{
      backgroundImage: `url('${process.env.REACT_APP_STATICASSETS_URL}/gpn_logo50opacity.png')`, 
      backgroundPosition: 'bottom -23rem right -20rem',
      backgroundRepeat: `no-repeat`,
      backgroundSize: '65rem',
      backgroundClip: 'content-box',
      backgroundAttachment: 'fixed',
      height: "100vh",
      width: "100%",
    }}) : ({...{
      backgroundImage: `url('${process.env.REACT_APP_STATICASSETS_URL}/gpn_logo50opacity.png')`,
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
          Welcome GreenPatch Friend! Log in to share your knowledge of how to get the perfect lawn.
        </Typography>
        <LoginRegForm></LoginRegForm>
      </Box>
    </Box>
  )
}