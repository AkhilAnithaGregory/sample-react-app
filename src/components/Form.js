import React, { useState } from 'react';
import { Formik } from 'formik';
import './Form.scss'
import { MessageTypeSelect } from './Select';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import { UIStore } from './../store';
import { getMessageType, sendMessage } from 'endpoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FormComponent = () => {

    const enquiryTypes = UIStore.useState(s => s.enquiryTypes);

    getMessageType();

    return <div className='form-container'>
        <header className='form-header'>We'd Love to hear from you..</header>
        <hr />
        <span>Wheather you want to try our products or have a technical question - we have it all convered.</span>
        <SupportForm enquiryTypes={enquiryTypes} />
    </div>
}


const SupportForm = ({ enquiryTypes }) => {
    const initialValues = {
        name: '',
        email: '',
        message: '',
        enquiry_type: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Must be more than 2 characters')
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        message: Yup.string()
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values,  actions) => {
                const sendSupportMessage = sendMessage(values);
                toast.promise(sendSupportMessage, {
                    success: 'Message send 👌',
                    error: 'Message not send 🤯', 
                }, {autoClose: 500, onClose: ()=> {(actions.setSubmitting(false)); actions.resetForm()}})
            }}
            
        >
            {({ handleChange, handleSubmit, errors, touched, values, isSubmitting, enableReinitialize }) => (
                <form onSubmit={handleSubmit}>
                    <Row className="mb-3 mt-4">
                        <Form.Group as={Col}>
                            <Form.Label htmlFor='name' className='float-start'>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter your name' name='name' id="name" onChange={handleChange} value={values.name || ''}/>
                            {errors.name && touched.name ? <div className="error">{errors.name}</div> : null}
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label htmlFor='email' className='float-start'>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' id='email' onChange={handleChange} value={values.email || ''}/>
                            {errors.email && touched.email ? (<div className="error">{errors.email}</div>) : null}
                        </Form.Group>
                    </Row>

                    <MessageTypeSelect options={enquiryTypes} name={"enquiry_type"} id={"enquiry_type"} handleChange={handleChange} value={values.enquiry_type || ''}></MessageTypeSelect>

                    <Row className="mb-3 mt-4">
                        <Form.Group as={Col}>
                            <Form.Label htmlFor='message' className='float-start'>Message</Form.Label>
                            <Form.Control as={'textarea'} rows={4} placeholder='Message' name='message' id='message' onChange={handleChange} style={{ resize: 'none' }} value={values.message || ''}/>
                            {errors.message && touched.message ? <div className="error">{errors.message}</div> : null}
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit" disabled={isSubmitting} className='float-end'>
                        Submit
                    </Button>
                    <ToastContainer />
                </form>
            )}

        </Formik>
    );
};