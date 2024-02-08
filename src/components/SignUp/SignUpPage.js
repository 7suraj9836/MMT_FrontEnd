import React  from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {signUpUser} from '../../features/UserDetailsSlice';
import createSlice from '../../features/UserDetailsSlice';
import {useDispatch } from 'react-redux';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignUpPage = () => {
 
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const initialValues = {
    fullName: '',
    email: '',
    password: '',
  };

  const onSubmit = async (values) => {
    try {
      // Dispatch the signUpUser action with the form values
      
      const response = await dispatch(signUpUser(values));
      console.log(response);
  
      // Check if the response contains the success message
      if (response.payload.message === "User Saved Successfully") {
        // Redirect to the login page
        navigate("./login");
      } else {
        // Handle other cases, if needed
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      // Handle errors, if needed
      console.error("Error:", error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="input-container">
            <label htmlFor="fullName">Full Name:</label>
            <Field type="text" id="fullName" name="fullName" />
            <ErrorMessage name="fullName" component="div" className="error-message" style={{color:"red"}}/>
          </div>

          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error-message" style={{color:"red"}}/>
          </div>

          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error-message" style={{color:"red"}} />
          </div>

          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpPage;