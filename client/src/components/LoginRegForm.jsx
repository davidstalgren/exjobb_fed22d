import {object, string} from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import { Box, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const registerUserSchema = object({
  firstName: string().min(2, 'Too Short!').max(30, 'Too Long!').required('First name is required'),
  lastName: string().min(2, 'Too Short!').max(30, 'Too Long!').required('Last name is required'),
  email: string().email('Email is not a valid email').required('Email is required'),
  password: string().min(8, 'Password needs to be atleast 8 characters!').max(50, 'Too Long!!! Think 50 should be enough').required('Need to add a password'),
  picture: string().required('Need to add a Profile picture'),
  location: string().required('Where are you from?')
});

const loginUserSchema = object({
  email: string().email('Email is not a valid email').required('Email is required'),
  password: string().required('Need password to login')
});

export function LoginRegForm() {
  const [activeView, setActiveView] = useState('register');
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width:700px)');
  
  async function handleFormSubmit(values, props) {

  }

  return (
    <Formik 
      onSubmit={handleFormSubmit} 
      initialValues={
        activeView === 'login' ? 
        {email: '', password: ''} : 
        {firstName: '', lastName: '', email: '', password: '', picture: '', location: ''}
      }
      validationSchema={activeView === 'login' ? loginUserSchema : registerUserSchema}
      >
        {({values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm}) => (
          <form onSubmit={handleSubmit}>
            <Box display='grid' gap='2rem' gridTemplateColumns='repeat(2, minmax(0, 1fr))' sx={{'& > div': {gridColumn: isDesktop ? undefined : 'span 2'}}}>
              {activeView === 'register' && (
                <>
                  <TextField label='First Name' onBlur={handleBlur} onChange={handleChange} value={values.firstName} name='firstName' error={Boolean(touched.firstName) && Boolean(errors.firstName)} helperText={touched.firstName && errors.firstName} sx={{gridColumn: 'span 1'}}></TextField>
                  <TextField label='Last Name' onBlur={handleBlur} onChange={handleChange} value={values.lastName} name='lastName' error={Boolean(touched.lastName) && Boolean(errors.lastName)} helperText={touched.lastName && errors.lastName} sx={{gridColumn: 'span 1'}}></TextField>
                  <TextField label='Location' onBlur={handleBlur} onChange={handleChange} value={values.location} name='location' error={Boolean(touched.location) && Boolean(errors.location)} helperText={touched.location && errors.location} sx={{gridColumn: 'span 2'}}></TextField>
                  <TextField label='Email' onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' error={Boolean(touched.email) && Boolean(errors.email)} helperText={touched.email && errors.email} sx={{gridColumn: 'span 2'}}></TextField>
                </>
              )}
            </Box>
          </form>
        )}
    </Formik>
  )
}