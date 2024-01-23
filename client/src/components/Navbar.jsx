import { useMediaQuery, useTheme, Typography } from "@mui/material";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { BoxSpaced } from "./styled/StyledBox";
import { Logo } from "./Logo";
import IconButton from '@mui/material/IconButton';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { setMode } from "../store/reducers/reducers";

export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <BoxSpaced BoxSpaced padding='1rem 3rem' backgroundColor={theme.palette.background.alt}>
      <BoxSpaced gap='1rem'>
        {isDesktop ? <Logo width={50} /> : <Logo width={40} />}
        <Typography align="center" variant="h1" color="primary" fontWeight='900' fontSize='clamp(1rem, 1vw + 1rem, 2.5rem)'>
          GreenPatch Network
        </Typography>
      </BoxSpaced>

      {isDesktop ? (
        <BoxSpaced>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
          <p>menu/user logout</p>

        </BoxSpaced>
      ) : <p>mobile view</p>}
      
    </BoxSpaced>
  )
}