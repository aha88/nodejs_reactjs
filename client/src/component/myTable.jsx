import { CBadge, CButton } from '@coreui/react';
import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import Swal from 'sweetalert2';
import { customersData, tokenV } from '@/store/authuser';
import axios from 'axios';

const MyDataTable = ({  onDelete, onEdit }) => {

  const data = customersData.value;
  // Memoize the columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Birth of Date', accessor: 'birth_of_date' },
      { Header: 'National ID', accessor: 'national_id' },
      { Header: 'Status',  Cell: ({ row }) => ( 
        
        row.original.status_id == 1 ?
        <CBadge textBgColor="warning">Pending</CBadge>:
        row.original.status_id == 2 ?
        <CBadge textBgColor="success">Approved</CBadge> :
        row.original.status_id == 3 ?
        <CBadge textBgColor="danger">Rejected</CBadge>:''
           
        ), },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <CButton className="mr-2" color="secondary" onClick={() => onEdit(row.original)}>
              Edit
            </CButton>
            <CButton className="mr-2" color="danger" onClick={() => confirmDelete(row.original)}>
              Delete
            </CButton>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const confirmDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(item);
      }
    });
  };

  const handleDelete = async (item) => {
    if (item) {
      const token = tokenV.value;
      try {
         await axios.post(`/api/delete_cust`, { id: item.id }, {
          headers: {
            'x-token': token,
          },
        });
        
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Deleted is successful"
          });

        onDelete(item); 
      } catch (error) {
        console.error('Error during delete operation:', error);
      }
    }
  };

  // Memoize the useTable hook to prevent unnecessary recalculations on every render
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns, // Memoized columns
      data, // Memoized or default data
    },
    useSortBy
  );

  return (
    <table {...getTableProps()} >
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row,i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i}>
              {row.cells.map((cell, i) => (
                <td {...cell.getCellProps()} key={i}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MyDataTable;
