"use client";

import { CButton, CForm, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CFormFloating,CFormInput,CFormLabel } from '@coreui/react';
import React, { useEffect, useState } from 'react';

const RegisterCustomer = ({onShow, closeShow, initialFields,handingSubmitCustomer}) => {
         const [formData, setFormData] = useState(initialFields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
      }, {}));
    
      // Handle input change
        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setFormData((prevData) => ({
            ...prevData,
            [name]: value
            }));
        };
        

    return(<>
        <CModal
            visible={onShow}
            onClose={closeShow}
            aria-labelledby="UpdateDate"
            className='text-black'
                backdrop="static"
                size="xl"
        >
            <CModalHeader>
                <CModalTitle>New Customer</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={(e) => handingSubmitCustomer(e, formData)}>

                <CModalBody>
               
                {initialFields.map((field) => (
                    <CFormFloating key={field.id}>
                    <CFormInput
                        type={field.type}
                        id={field.id}
                        onChange={handleInputChange}
                        value={formData[field.name]}
                        placeholder={field.placeholder}
                        name={field.name}
                        className='mt-1'
                        required
                    />
                    <CFormLabel htmlFor={field.id}>{field.label}</CFormLabel>
                    </CFormFloating>
                ))}

                </CModalBody>
                <CModalFooter>
                    <CButton type='button' color="secondary" onClick={closeShow}>
                    Close
                    </CButton>
                    <CButton type='submit' color="primary">Save changes</CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    </>)
}

export default RegisterCustomer;
