import spacegameLogoBlue from '../assets/img/spacegame-logo-blue.png'
import password from '../assets/img/password.png'
import eye from '../assets/img/eye.png'


export function AdminLogin({ loggedinUser, handleSubmitAdminForm, credentials, handleChange }) {
    return (
        <section className="admin-login">
            <img className="spacegame-logo-blue" src={spacegameLogoBlue} />

            <form className="admin-login-form" onSubmit={handleSubmitAdminForm}>
                <span>Hello {loggedinUser.name}</span>
                <img className="input-img password" src={password} />
                <img className="input-img eye" src={eye} />
                <input placeholder="Password" type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />

                <button type="submit" disabled={!credentials.password} >Admin Login</button>
            </form>
        </section>
    )
}