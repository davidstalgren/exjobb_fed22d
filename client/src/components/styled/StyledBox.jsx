import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const BoxSpaced = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const BoxSpacedColumn = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column'
});