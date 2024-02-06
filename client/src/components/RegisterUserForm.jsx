import { Box, TextField, Typography, useMediaQuery } from '@mui/material';
import Dropzone from "react-dropzone";
import { BoxSpaced, BoxSpacedColumn } from './styled/StyledBox';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export function RegisterUserForm({values, errors, touched, theme, handleBlur, handleChange, setFieldValue, setImagePreview, imagePreview}) {
  const isDesktop = useMediaQuery('(min-width: 900px)');

  return (
    <>
      <TextField label='First Name' onBlur={handleBlur} onChange={handleChange} value={values.firstName} name='firstName' error={Boolean(touched.firstName) && Boolean(errors.firstName)} helperText={touched.firstName && errors.firstName} sx={{gridColumn: 'span 1'}}></TextField>
      <TextField label='Last Name' onBlur={handleBlur} onChange={handleChange} value={values.lastName} name='lastName' error={Boolean(touched.lastName) && Boolean(errors.lastName)} helperText={touched.lastName && errors.lastName} sx={{gridColumn: 'span 1'}}></TextField>
      <TextField label='Location' onBlur={handleBlur} onChange={handleChange} value={values.location} name='location' error={Boolean(touched.location) && Boolean(errors.location)} helperText={touched.location && errors.location} sx={{gridColumn: 'span 2'}}></TextField>
      <Box sx={{gridColumn: 'span 2'}}>
        <Dropzone multiple={false} onDrop={(acceptedFiles) => {
            setFieldValue("picture", acceptedFiles[0]);
            setImagePreview(URL.createObjectURL(acceptedFiles[0]));
          }}>
          {({ getRootProps, getInputProps }) => (
            <Box {...getRootProps()} border={`1px dotted ${theme.palette.neutral.medium}`} padding='1rem' borderRadius='0.25rem' sx={{ '&:hover': { cursor: 'pointer', border: '1px solid'} }}>
              <input {...getInputProps()} />
              {!values.picture ? (
                <BoxSpaced gap='2rem'>
                  <Typography color={theme.palette.neutral.main}>{isDesktop ? ('Add your profile picture here, click or drag and drop') : ('Click to add profile picture')}</Typography>
                  <InsertPhotoIcon color='primary'/>
                </BoxSpaced>
              ) : (
                <BoxSpaced>
                    <BoxSpacedColumn gap='0.75rem'>
                      <Box component='img' src={imagePreview} alt='Preview of chosen file' width='7rem' height='7rem' borderRadius='50%' sx={{objectFit: 'cover'}}/>
                      <Typography>Profile picture</Typography>
                    </BoxSpacedColumn>
                    <ModeEditIcon color='primary'/>
                </BoxSpaced>
              )}
            </Box>
          )}
        </Dropzone>
      </Box>
      <TextField label='Email' onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' error={Boolean(touched.email) && Boolean(errors.email)} helperText={touched.email && errors.email} sx={{gridColumn: 'span 2'}}></TextField>
      <TextField label='Password' onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' error={Boolean(touched.password) && Boolean(errors.password)} helperText={touched.password && errors.password} sx={{gridColumn: 'span 2'}} type='password'></TextField>
    </>
  )
}