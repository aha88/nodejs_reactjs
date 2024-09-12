import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { sessionV, tokenV, userID, userData, customerData } from '../store/authuser';
import axios from 'axios';
import { CCardText } from '@coreui/react';
import RegisterCustomer from './register';
import Swal from 'sweetalert2';

export const Header = ({ data = userData.value }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sData, setData] = useState([]);

  useEffect(() => {
    // Run this only if sessionV.value is actually false to avoid unnecessary re-renders
    if (!sessionV.value) {
      router.push('/');
    }
  }, []); // Empty array means it runs only once after mount

  const signOut = (e) => {
    e.preventDefault();

    sessionStorage.clear();
    sessionV.value = null;
    tokenV.value = null;
    router.push('/');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fields = [
    { id: 'iInput1', type: 'text', name: 'name', placeholder: 'Enter Full Name', label: 'Full Name' },
    { id: 'iInput2', type: 'email', name: 'email', placeholder: 'name2@example.com', label: 'Email address' },
    { id: 'iInput3', type: 'text', name: 'phone', placeholder: '601345632121', label: 'Phone Number' },
    { id: 'iInput4', type: 'text', name: 'national_id', placeholder: '88111111111', label: 'NRIC' },
    { id: 'iInput5', type: 'date', name: 'birth_of_date', placeholder: 'Date', label: 'Birthdate' },
    { id: 'iInput6', type: 'text', name: 'address', placeholder: 'full address here', label: 'Address' },
  ];

  const handleSubmit = async (e, data) => {
    e.preventDefault();
  
    const dt = {
      ...data,
      status_id: 1,  // Adding the status_id to the data
    };
  
    const token = tokenV.value ?? sessionStorage.getItem('tk');  // Retrieve the token
  
    try {
      // Insert customer data
      const res = await axios.post('/api/insert_customer', dt, {
        headers: {
          'x-token': token,
        },
      });
  
      // Show success message if the status is 200
      if (res.status === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        
        Toast.fire({
          icon: 'success',
          title: 'Insert successful',
        });
  
        setIsModalOpen(false);  
  
        const response = await axios.get('/api/customers', {
          headers: {
            'x-token': token,
          },
        });

        setData(response.data.data);
  
        customerData.value = await response.data.data;
      }
    } catch (err) {
      console.error('Error inserting customer or fetching data:', err);
    }
  };

  useEffect(() => {
    customerData.value
  },[])
  

  return (
    <nav className="navbar sticky-bottom bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">AF</a>

        {sessionV.value ? 
          <>
            <CCardText className="text-black">
              <span className="pr-2">{data?.value?.name || 'User'}</span>
              <Button className="mr-1" color="primary" onClick={toggleModal}>Register</Button>
              <Button variant="outline-secondary" onClick={signOut}>Sign-out</Button>
            </CCardText>
          </>
          :
          ''
        }

        {isModalOpen && (
          <RegisterCustomer
            onShow={isModalOpen}
            closeShow={toggleModal}
            initialFields={fields}
            handingSubmitCustomer={handleSubmit}
          />
        )}
      </div>
    </nav>
  );
};
