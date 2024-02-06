import { useMediaQuery, useTheme, Typography, Box, Divider } from "@mui/material";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { BoxSpaced, BoxSpacedColumn } from "./styled/StyledBox";
import { Logo } from "./Logo";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { setLogout } from "../store/reducers/reducers";
import { ThemeToggle } from "./ThemeToggle";
import { ProfileImage } from "./ProfileImage";

export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <BoxSpaced padding={isDesktop ? '1rem 3rem' : '1rem'} backgroundColor={theme.palette.background.alt}>
      <BoxSpaced gap='1rem' onClick={() => {navigate('/home')}} sx={{'&:hover': {cursor: 'pointer'}}}>
        {isDesktop ? <Logo width={50} /> : <Logo width={40} />}
        <Typography align="center" variant="h1" color="primary" fontWeight='900' fontSize='clamp(1rem, 1vw + 1rem, 2.5rem)'>
          GreenPatch Network
        </Typography>
      </BoxSpaced>

      {isDesktop ? (
        <BoxSpaced gap='2rem'>
          <ThemeToggle></ThemeToggle>
          <BoxSpacedColumn>
            <ProfileImage pictureUrl={user.pictureUrl}></ProfileImage>
            <Typography onClick={() => {
              dispatch(setLogout());
              navigate('/')
              }} sx={{textDecoration: 'underline', color: theme.palette.primary.dark, '&:hover': {cursor: 'pointer', color: theme.palette.primary.main}}}>
                Log out
            </Typography>
          </BoxSpacedColumn>
        </BoxSpaced>
      ) : (
        <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <MenuIcon></MenuIcon>
        </IconButton>
      )}
      {mobileMenuOpen && !isDesktop && (
        <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center' gap='1rem' padding='1rem' position='fixed' top='0' right='0' width='200px' height='100%' zIndex='9999' backgroundColor={theme.palette.primary.light}>
          <BoxSpaced width='100%' paddingLeft='2rem'>
            <ProfileImage pictureUrl={user.pictureUrl} size="3rem"></ProfileImage>
            <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </BoxSpaced>
          <Divider color='primary' flexItem />
          <ThemeToggle></ThemeToggle>
          <Typography onClick={() => {
            dispatch(setLogout());
            navigate('/');
            }} sx={{textDecoration: 'underline', color: theme.palette.primary.dark, '&:hover': {cursor: 'pointer', color: theme.palette.primary.main}}}>
            Log out
          </Typography>
        </Box>
      )}
    </BoxSpaced>
  )
}