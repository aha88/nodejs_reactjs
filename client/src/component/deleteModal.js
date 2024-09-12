import React from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';

const DeleteModal = ({ visible, onClose, onConfirm }) => {
    return (
        <CModal
            visible={visible}
            onClose={onClose}
        >
            <CModalHeader>
                <h5>Confirm Delete</h5>
            </CModalHeader>
            <CModalBody>
                Are you sure you want to delete this item?
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>Cancel</CButton>
                <CButton color="danger" onClick={onConfirm}>Yes, Delete</CButton>
            </CModalFooter>
        </CModal>
    );
};

export default DeleteModal;
