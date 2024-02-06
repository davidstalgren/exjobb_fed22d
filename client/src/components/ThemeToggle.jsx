import { Tooltip, Zoom, useTheme } from "@mui/material"
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import IconButton from '@mui/material/IconButton';
import { setMode } from "../store/reducers/reducers";
import { useDispatch } from "react-redux";

export function ThemeToggle() {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Tooltip title={theme.palette.mode === 'light' ? 'Enter darkmode' : 'Enter lightmode'} TransitionComponent={Zoom} placement="left" arrow>
      <IconButton onClick={() => dispatch(setMode())}>
        {theme.palette.mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  )
}