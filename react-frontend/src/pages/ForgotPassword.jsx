import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert } from "react-bootstrap";
import AccountService from "../services/AccountService";
import PasswordResetEmailSent from "../components/PasswordResetEmailSent";

function ForgotPassword() {

    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [enteredEmail, setEnteredEmail] = useState("");
    const [isSent, setIsSent] = useState(false);

    const resetPassword = (formData) => {
        setIsSending(true);
        setEnteredEmail(formData.email);

        AccountService.emailPasswordReset(formData).then((response) => {
            console.log(response.data);

            setIsSending(false);

            if (response.data.error) {
                setMessage(response.data.message);
                setShowError(true);
                setShowSuccess(false);
            } else {
                setMessage(response.data.message);
                setShowError(false);
                setShowSuccess(true);
                setIsSent(true)
            }
        });
    }
    
    const initialValues = {
        email: "",
        emailConfirmation: ""
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email address.").required("Email address is required."),
        emailConfirmation: Yup.string().oneOf([Yup.ref("email"), null], "Email does not match!").required("Please re-type your email address.")
    });
    
    return (
        <div className='border container-sm my-5 mini-forms'>
            <h2 className='text-center my-3' >Forgot Password</h2>
            {
                !isSent ? 
                <div>
                    <Formik
                        onSubmit={resetPassword} 
                        initialValues={initialValues}
                        validationSchema={validationSchema} 
                    >
                        {({ errors, touched, isValidating }) => (
                            <Form className='mx-3'>
                                <hr />
                                <div className='my-4 row'>
                                    <label className='col-form-label col-sm-4'>Email:</label>
                                    <div className='col-sm-8'>
                                        <Field name="email" type="email" className="form-control" placeholder='Type your email address...'/>
                                        <ErrorMessage name='email' render={message => <div className='text-danger'>{message}</div>} />
                                    </div>
                                </div>
                                <div className='my-4 row'>
                                    <label className='col-form-label col-sm-4'>Confirm Email:</label>
                                    <div className='col-sm-8'>
                                        <Field name="emailConfirmation" type="email" className="form-control" placeholder='Re-type email address...'/>
                                        <ErrorMessage name='emailConfirmation' render={message => <div className='text-danger'>{message}</div>} />
                                    </div>
                                </div>

                                <Alert show={showError} variant="danger"> <p className='text-center my-auto'>{ message }</p> </Alert>
                                
                                <div>
                                    <button type="submit" className="btn btn-primary my-3">Send email</button>
                                    { isSending && <span className='ms-3'>loading...</span> }
                                </div>
                                
                            </Form>
                        )}
                    </Formik>
                </div> :
                <div>
                    <p className='text-center' >Password reset email has been sent to { enteredEmail } </p>
                </div>
            }  
        </div>
    );
}

export default ForgotPassword;