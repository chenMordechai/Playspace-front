import playspaceLogoBlue from '../assets/img/playspace-logo-blue.png'
import user from '../assets/img/user.png'
import email from '../assets/img/email.png'
import { LoadingScreen } from './LoadingScreen'

export function LoginSignup({ credentials, handleChange, onBtnClick, btnType, text, useEffectFunc, companyIcon }) {



    return (
        <>
            <LoadingScreen useEffectFunc={useEffectFunc} companyIcon={companyIcon} />
            <section className="login-signup">
                <img className="playspace-logo-blue" src={playspaceLogoBlue} />

                <form className="signup-form" id="signupForm">
                    <span>{text}</span>
                    <img className="input-img user" src={user} />
                    <input placeholder="Name" type="text" id="name" name="name" value={credentials.name} onChange={handleChange} required />

                    <img className="input-img email" src={email} />
                    {/* <img className="input-img eye" src={eye} /> */}
                    <input placeholder="Email" type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />

                    {/* <span className="end-span">Forget Password?</span> */}
                    <button type={btnType} disabled={!(credentials.name && credentials.email)} onClick={onBtnClick}>{text}</button>
                    {/* <p>Don’t have account? <span>Sign up</span></p> */}
                    {/* <button type="button" className={`next-btn ${credentials.name && credentials.email ? 'purple-btn' : ''}`} onClick={() => setStepIdx(prev => prev + 1)}>Sign in</button> */}

                </form>
            </section>
        </>
    )
}