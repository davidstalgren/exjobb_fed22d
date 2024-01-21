import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import { BoxSpaced } from "./styled/StyledBox";
import { Logo } from "./Logo";
import { LoginRegForm } from "./LoginRegForm";

export function LoginPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width: 900px)');

  return (
    <Box>
      <BoxSpaced backgroundColor={theme.palette.background.alt} width='100%'>
        {isDesktop ? <Logo width={75} /> : <Logo width={50} />}
          <Typography align="center" variant="h1" color="primary" fontWeight='900' fontSize='clamp(1rem, 3vw, 4rem)'>
            GreenPatch Network
          </Typography>
        {isDesktop ? <Logo width={75} /> : <Logo width={50} />}
      </BoxSpaced>
      <Box width={isDesktop ? '50%' : '90%'} padding='1.5rem' margin='1.5rem auto' borderRadius='1rem' backgroundColor={theme.palette.background.alt}>
        <Typography align='center' fontSize='clamp(1rem, 1.5vw, 1.25rem)' marginBottom='1rem'>
          Welcome GreenPatch Friend! Log in to share your knowledge of how to get the perfect lawn.
        </Typography>
        <LoginRegForm></LoginRegForm>
      </Box>

    </Box>
  )
}