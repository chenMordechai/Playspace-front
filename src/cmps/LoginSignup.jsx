import spacegameLogoBlue from '../assets/img/spacegame-logo-blue.png'
import user from '../assets/img/user.png'
import password from '../assets/img/password.png'

export function LoginSignup({ credentials, handleChange, onBtnClick, btnType, text }) {
    return (
        <section className="login-signup">
            {/* <section className="step-0"> */}
            <img className="spacegame-logo-blue" src={spacegameLogoBlue} />

            <form className="signup-form">
                <span>{text}</span>
                <img className="input-img user" src={user} />
                <input placeholder="Name" type="text" id="name" name="name" value={credentials.name} onChange={handleChange} required />

                <img className="input-img password" src={password} />
                {/* <img className="input-img eye" src={eye} /> */}
                <input placeholder="Email" type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />

                {/* <span className="end-span">Forget Password?</span> */}
                <button type={btnType} disabled={!(credentials.name && credentials.email)} onClick={onBtnClick}>{text}</button>
                {/* <p>Don’t have account? <span>Sign up</span></p> */}
                {/* <button type="button" className={`next-btn ${credentials.name && credentials.email ? 'purple-btn' : ''}`} onClick={() => setStepIdx(prev => prev + 1)}>Sign in</button> */}

            </form>
            {/* </section> */}
        </section>
    )
}