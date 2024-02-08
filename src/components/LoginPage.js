import React from 'react';
import '../App.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import {loginUser} from '../features/UserDetailsSlice';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

const LoginPage = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    console.log('Rendering LoginPage component');
    const initialValues = {
        email: '',
        password: '',
      };
    
      // const onSubmit = (values) => {
      //   console.log('Form submittindffdf:', values);
      //   // Add your login logic here
      //   console.log('Form submitted with values:', values);
      //   navigate("/searchForm");
      // };

      const onSubmit = async (values) => {
        try {
          // Dispatch the signUpUser action with the form values
          
          const response = await dispatch(loginUser(values));
          console.log(response);
      
          // Check if the response contains the success message
          if (response.payload.message === "Login Successful") {
            // Redirect to the login page
            navigate("/searchForm");
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
        <div className="login-container">
          <h2>Login</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema}  onSubmit={onSubmit}>
            <Form>
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
    
              <button type="submit">Login</button>
            </Form>
          </Formik>
        </div>
      );
};

export default LoginPage;