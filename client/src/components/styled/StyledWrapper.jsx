import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const StyledWrapper = styled(Box)(({theme}) => ({
  padding: '1.25rem',
  backgroundColor: theme.palette.background.alt,
  borderRadius: '1rem'
}));