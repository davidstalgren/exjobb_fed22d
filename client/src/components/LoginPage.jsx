import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import { BoxSpaced } from "./styled/StyledBox";
import { Logo } from "./Logo";

export function LoginPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width: 900px)');

  return (
    <Box>
      <BoxSpaced backgroundColor={theme.palette.background.alt}>
        {isDesktop ? <Logo width={75} /> : <Logo width={50} />}
          <Typography align="center" variant="h1" color="primary" fontWeight='900' fontSize='clamp(1rem, 3vw, 4rem)'>
            GreenPatch Network
          </Typography>
        {isDesktop ? <Logo width={75} /> : <Logo width={50} />}
      </BoxSpaced>

    </Box>
  )
}