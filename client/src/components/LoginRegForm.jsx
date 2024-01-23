import {object, string} from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RegisterUserForm } from './RegisterUserForm';
import { LoginUserForm } from './LoginUserForm';

const registerUserSchema = object({
  firstName: string().min(2, 'Too Short!').max(30, 'Too Long!').required('First name is required'),
  lastName: string().min(2, 'Too Short!').max(30, 'Too Long!').required('Last name is required'),
  email: string().email('Email is not a valid email').required('Email is required'),
  password: string().min(8, 'Password needs to be atleast 8 characters!').max(50, 'Too Long!!! Think 50 characters should be enough').required('Need to add a password'),
  picture: string().required('Need to add a Profile picture'),
  location: string().required('Where are you from?')
});

const loginUserSchema = object({
  email: string().email('Email is not a valid email').required('Email is required'),
  password: string().required('Need password to login')
});

export function LoginRegForm() {
  const [activeView, setActiveView] = useState('login');
  const theme = useTheme();
  //eslint-disable-next-line
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width:700px)');
  const [imagePreview, setImagePreview] = useState('');
  
  async function handleFormSubmit(values, props) {
    if (activeView === 'login') {
      console.log('login user function', values);
    } else {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('location', values.location);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('pictureFile', values.picture);
      formData.append('pictureUrl', values.picture.name);

      const registerNewUser = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        body: formData
      });
      const newUser = await registerNewUser.json();

      if (newUser) {
        setActiveView('login');
        props.resetForm()
      }
    }
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
              {activeView === 'login' && <LoginUserForm values={values} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} ></LoginUserForm>}
              {activeView === 'register' && <RegisterUserForm values={values} errors={errors} touched={touched} theme={theme} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} imagePreview={imagePreview} setImagePreview={setImagePreview}></RegisterUserForm>}
            </Box>
            <Box>
              <Button type='submit' fullWidth sx={{margin: '2rem 0', padding: '1rem', backgroundColor: theme.palette.primary.main, color: theme.palette.background.alt, '&:hover': {color: theme.palette.primary.main, backgroundColor: theme.palette.primary.light}}}>
                {activeView === 'login' ? 'Login' : 'Register'}
              </Button>
              <Typography onClick={() => {
                setActiveView(activeView === 'login' ? 'register' : 'login');
                resetForm();
              }} sx={{textDecoration: 'underline', color: theme.palette.primary.dark, '&:hover': {cursor: 'pointer', color: theme.palette.primary.main}}}>
                {activeView === 'login' ? 'Not yet a GreenPatch friend? Click here to sign up now!' : 'Already a GreenPatch friend? Click here to log in!'}
              </Typography>
            </Box>
          </form>
        )}
    </Formik>
  )
}