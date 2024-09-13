import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {customersData, sessionV, tokenV } from '@/store/authuser';
import  { useRouter } from 'next/router';
import MyDataTable from '@/component/myTable';
import { CCardTitle, CCol, CContainer, CRow } from '@coreui/react';



const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (customersData.value == null ){
            const fetchData = async () => {
                const token = tokenV.value ?? sessionStorage.getItem('tk');
                
                if (!sessionV.value || !token) {
                    router.replace('/');
                    return;
                }
            
                try {
                    const response = await axios.get('/api/customers', {
                        headers: {
                            'x-token': token,
                        },
                    });
                    const newData = response.data.data;
                    setData(newData);
                    customersData.value = newData; // Sync with external store
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Error fetching data');
                    setLoading(false);
                }
            
            };
            
            fetchData();
        }
    }, [sessionV.value, tokenV.value, router,loading]);

    const handleEdit = (row) => {
        router.push(`../profile/${row.id}`);
    };
    
    const handleDelete = (row) => {
        const fetchData = async () => {
            const token = tokenV.value;
            try {
                const response = await axios.get('/api/customers', {
                    headers: {
                        'x-token': token,
                    },
                });
                const newData = response.data.data;
                setData(newData);
                customersData.value = newData; // Sync with external store
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            }
        };
        fetchData();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className='body'>
            <CContainer className='mt-3'>
                <CRow className='mt-3'>
                    <CCol md={12}>
                        <CCardTitle>Customer Registration</CCardTitle>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md={12}>
                        <MyDataTable
                            data={data} // Use state data for rendering
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Dashboard;

export async function getServerSideProps(context) {

    const data=[];
    return {
        props: {
            data, // Pass data as props to the page
        },
    };

}