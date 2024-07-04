import playspaceLogoBlue from '../assets/img/playspace-logo-blue.png'
import user from '../assets/img/user.png'
import email from '../assets/img/email.png'
import { LoadingScreen } from './LoadingScreen'
import React from 'react';
import { useFormik } from 'formik'
import { showUserMsg } from '../services/event-bus.service';


export function LoginSignup({ credentials, handleChange, onBtnClick, text, useEffectFunc, companyIcon }) {

    const formik = useFormik({
        initialValues: {
            name: credentials.name,
            email: credentials.email,
        },
        validate: (values) => {
            const errors = {}
            if (!values.email || !values.name) {
                // errors.email = 'Required'
                showUserMsg('Required')
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                // errors.email = 'Invalid email address'
                showUserMsg('Invalid email address')
            } else {
                showUserMsg('')
            }
            return errors
        },
        onSubmit: (values) => {
            console.log('values:', values)
            onBtnClick()
        },
    })

    function handleInputChange(ev) {
        formik.handleChange(ev)
        handleChange(ev)
    }
    return (
        <>
            <LoadingScreen useEffectFunc={useEffectFunc} companyIcon={companyIcon} />
            <section className="login-signup">
                <img className="playspace-logo-blue" src={playspaceLogoBlue} />

                <form onSubmit={formik.handleSubmit} className="signup-form" id="signupForm" >
                    <span>{text}</span>
                    <img className="input-img user" src={user} />
                    <input placeholder="Name*" type="text" id="name" name="name" onChange={handleInputChange} onBlur={formik.handleBlur} value={formik.values.name} required />
                    {/* <input placeholder="Name" type="text" id="name" name="name" value={credentials.name} onChange={handleChange} required /> */}

                    <img className="input-img email" src={email} />
                    {/* <img className="input-img eye" src={eye} /> */}
                    <input placeholder="Email*" type="email" id="email" name="email" onChange={handleInputChange} onBlur={formik.handleBlur} value={formik.values.email} required />
                    {/* {formik.touched.email && formik.errors.email ? (
                        <span className="error">{formik.errors.email}</span>
                    ) : null} */}
                    <button type='submit'>{text}</button>
                    {/* <button type={btnType} disabled={!(credentials.name && credentials.email)} onClick={onBtnClick}>{text}</button> */}

                </form>
                {/* <form className="signup-form" id="signupForm" >
                    <span>{text}</span>
                    <img className="input-img user" src={user} />
                    <input placeholder="Name" type="text" id="name" name="name" value={credentials.name} onChange={handleChange} required />

                    <img className="input-img email" src={email} />
                    <input placeholder="Email" type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />

                    <button type={btnType} disabled={!(credentials.name && credentials.email)} onClick={onBtnClick}>{text}</button>

                </form> */}
            </section>
        </>
    )
}