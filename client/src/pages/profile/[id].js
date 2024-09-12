import React, {useState, useEffect} from 'react';
import { Button, Card, CardBody, CardText, Col, Container, Row } from 'react-bootstrap'
import { useRouter } from 'next/router';
import axios from 'axios';
import { CButton, CCard, CCardBody, CCardHeader, CCardTitle, CCol, CContainer, CForm, CFormFloating, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import { customerData, tokenV } from '@/store/authuser';
import Swal from 'sweetalert2';


const Customer = ({ userOne }) => {
    const [data, setData] = useState([]);
    const [model, setModel] = useState(false);
    const [formData, setFormData] = useState([]);
    const [errorM, setErrorM] = useState('');

    const router = useRouter();
    const activeCustomer = customerData.value;

    useEffect(() => {
        const fetchData = async () => {
            const token = tokenV.value;  
            try {
                const response = await axios.post(`/api/customer`, { id: userOne }, {
                    headers: {
                        'x-token': token,
                    },
                });
    
                const customer = response.data[0].data;
                
                
                setData(customer);   
                customerData.value = customer;  
    
                console.log(customer);
    
                setFormData({
                    status_id: customer[0].status_id,
                    name: customer[0].name,
                    birth_of_date: customer[0].birth_of_date,
                    national_id: customer[0].national_id,
                    phone: customer[0].phone,
                    address: customer[0].address,
                    email: customer[0].email,
                    id: userOne,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();   
    }, []);   
    
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
      };

    const handleUpdate = async(e) => {
        e.preventDefault();
            setErrorM('');  
          
            console.log(formData)
            const token = tokenV.value;

            await axios.post('/api/updatecustomer',formData, {
                headers: {
                    'x-token': token,
                }
            }).then((dt) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                      setModel(false);
                    }
                  });

                  customerData.value = [formData];

                if(dt.status == 200){
                    return (Toast.fire({
                            icon: "success",
                            title: "Update in successful"
                          })
                        )
                }else{
                    Toast.fire({
                        icon: "fail",
                        title: "Update in unsuccessful"
                      })
                }
            })
    }


    
    if(data.length == 0) {  
        return "..."
    }else{
        return (
            <div className='body'>
                <CContainer className='mt-3'>
                    <CRow className='mt-3'>
                        <CCardTitle>Customer Details </CCardTitle>
                    </CRow>

                    <CRow className='mt-3'>
                        <CCard>
                            <CCardHeader variant='clear'>
                                <CButton className='float-right' color='primary'onClick={() => setModel(!model)} variant='outline'>Edit</CButton>
                            </CCardHeader>
                            <CCardBody>
                            {activeCustomer.map((dt,i) => {
                                return(<div key={i}>
                                <CCardTitle>{dt.name}</CCardTitle>

                                <CRow>
                                    <CCol> <CardText className='detail_label'>Birth of Date</CardText> {dt.birth_of_date}</CCol>
                                    <CCol> <CardText className='detail_label'>National ID</CardText> {dt.national_id}</CCol>
                                    <CCol> <CardText className='detail_label'>Phone</CardText> {dt.phone}</CCol>
                                    <CCol> <CardText className='detail_label'>Address</CardText> {dt.address}</CCol>
                                </CRow>
                                <hr/>

                                <CCardTitle>Access</CCardTitle>
                                <CRow>
                                    <CCol> <CardText className='detail_label'>Email</CardText> {dt.email}</CCol>
                                    <CCol> <CardText className='detail_label'>Status</CardText> {dt.status_name}</CCol>
                                </CRow>
                                </div>)
                            })}
                            </CCardBody>
                        </CCard>
                    </CRow>

                    {/* model edit */}
                    <CModal
                        visible={model}
                        onClose={() => setModel(false)}
                        aria-labelledby="UpdateDate"
                        className='text-black'
                         backdrop="static"
                         size="xl"
                        >
                        <CModalHeader>
                            {/* <CModalTitle id="UpdateDate">Update Info: {activeCustomer.data[0].name}</CModalTitle> */}
                        </CModalHeader>
                      
                        <CForm onSubmit={e=> handleUpdate(e)}>
                            <CModalBody>
                            {errorM && <p style={{ color: 'red' }}>{errorM}</p>}

                                <CRow>
                                    <CCol md={6} className='mt-1'>
                                        <CFormFloating>
                                            <CFormInput type="email" id="floatingInput" onChange={handleInputChange} value={formData.email} placeholder="name@example.com" name='email' />
                                            <CFormLabel htmlFor="floatingInput">Email address</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol md={6} className='mt-1'>
                                        <CFormFloating>
                                            <CFormInput type="text" id="floatingInput" onChange={handleInputChange} value={formData.name} placeholder="name@example.com" name='name' />
                                            <CFormLabel htmlFor="floatingInput">Name</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol md={6} className='mt-1'>
                                        <CFormFloating>
                                            <CFormInput type="date" id="floatingInput" onChange={handleInputChange} value={formData.birth_of_date} placeholder="name@example.com" name='birth_of_date' />
                                            <CFormLabel htmlFor="floatingInput">Birthdate</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol md={6} className='mt-1'>
                                        <CFormFloating>
                                            <CFormInput type="text" id="floatingInput" onChange={handleInputChange} value={formData.national_id} placeholder="name@example.com" name='national_id' />
                                            <CFormLabel htmlFor="floatingInput">National ID</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol md={6} className='mt-1'>
                                        <CFormFloating>
                                            <CFormInput type="text" id="floatingInput" onChange={handleInputChange} value={formData.phone} placeholder="" name='phone' />
                                            <CFormLabel htmlFor="floatingInput">Phone</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                    <CCol md={6} className='mt-1'>
                                        <CFormFloating>
                                            <CFormSelect onChange={handleInputChange} value={formData.status_id} name='status_id' 
                                            options={[
                                                'Select Option',
                                                { label: 'Pending', value: '1' },
                                                { label: 'Approved', value: '2' },
                                                { label: 'Rejected', value: '3' }
                                              ]} />
                                            <CFormLabel htmlFor="floatingInput">Status</CFormLabel>
                                        </CFormFloating>
                                    </CCol>
                                            <CFormInput type="hidden" onChange={handleInputChange} value={userOne} name='id' />
                                </CRow>
                                
                            </CModalBody>
                            <CModalFooter>
                                <CButton type='button' color="secondary" onClick={() => setModel(false)}>
                                Close
                                </CButton>
                                <CButton type='submit' color="primary">Save changes</CButton>
                            </CModalFooter>
                        </CForm>
                    </CModal>


                </CContainer>
            </div>
        )
    }
}

export default Customer;

export const getServerSideProps = async ({  params }) => {

    const id = params.id;


    return {
        props: { userOne: id },
    }

}