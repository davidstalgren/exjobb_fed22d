import {object, string} from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import { Box, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const registerUserSchema = object({
  firstName: string().min(2, 'Too Short!').max(30, 'Too Long!').required('Firstname is required'),
  lastName: string().min(2, 'Too Short!').max(30, 'Too Long!').required('Lastname is required'),
  email: string().email('Email is not a valid email').required('Email is required'),
  password: string().min(8, 'Password needs to be atleast 8 characters!').max(50, 'Too Long!!! Thnik 50 should be enough').required('Need to add a password'),
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
                  <TextField label='First Name' onBlur={handleBlur} onChange={handleChange} value={values.firstName} name='firstName' error={touched.firstName} helperText={touched.firstName} sx={{gridColumn: 'span 1'}}></TextField>
                  <TextField label='Last Name' onBlur={handleBlur} onChange={handleChange} value={values.lastName} name='lastName' error={touched.lastName} helperText={touched.lastName} sx={{gridColumn: 'span 1'}}></TextField>
                </>
              )}
            </Box>
          </form>
        )}
    </Formik>
  )
}