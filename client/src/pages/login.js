"use client";

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import {  CButton, CCardTitle, CCol, CForm, CFormInput, CInputGroup } from '@coreui/react';
import Joi from 'joi';
import { useRouter } from 'next/router';
import axios from 'axios';
import {sessionV, tokenV,userData,userID } from '../store/authuser';



export default function Login() {
  const [formData, setFormData] = useState({email: 'aizat@email.com',password: 'aizat'});
  const [error, setError] = useState('');
  
  const router = useRouter();

  const schema = Joi.object({
    email: Joi.string().required().label('email'),
    password: Joi.string().required().label('password'),
  });
  
  const handling = async (e) => {
      e.preventDefault();

      if (error) {
        setError(error.details[0].message);
      } else {
        setError('');  
      
        try {
          const response = await axios.post(`api/login`, formData);
          const data = response.data;

          sessionV.value = true;
          tokenV.value =  data.token;
          userID.value = data.userID;
          userData.value = data.user;

          sessionStorage.setItem('tk', data.token);  
          sessionStorage.setItem('session', true);  
          sessionStorage.setItem('id', data.userID);  

          const { error } = schema.validate(formData);

          if(tokenV.value !== null){
            router.push('./dashboard/dashboard');
          }

        } catch (err) {
          console.error('Error during login request:', err);
          setError('Login failed'); 
        }
      }
  }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
    };


    
  return (
    <div className='body'>
      <div className='box-container'>

        <CCardTitle className='text-black'>
          Login
        </CCardTitle>

        
        
        <p className="text-danger font-black">
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </p>
        
        <CForm onSubmit={handling}>
          <CCol>
          <CInputGroup>
            <CFormInput type='email' name='email' value={formData.email} placeholder='email@email.com'  className='inputtext'  onChange={handleInputChange} />
          </CInputGroup>
          </CCol>
          <CCol>
          

          <CInputGroup>
            <CFormInput type='password' name='password' placeholder='****' value={formData.password} className='inputtext' id='inputPassword'   onChange={handleInputChange}/>
          </CInputGroup>
          </CCol>
          <CCol>
            <CButton type='submit' color='primary' className='mb-3'>
                      Submit
            </CButton>

          </CCol>
        </CForm>

      </div>
    </div>
  )
}
