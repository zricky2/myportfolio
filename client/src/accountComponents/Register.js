import React, { useRef } from 'react'
import 'bulma/css/bulma.css';
import '../styles/Register.css';

export default function Register() {
    const email = useRef()
    const password = useRef()

    return (
        <div className="container">
            <div className="columns" id="regCol">
                    <form className="field" onSubmit={register}>
                        <div>
                            <p>Please fill in this form to create an account.</p>
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" ref={email} type="email" placeholder="Enter Email" name="email" id="email" required />
                            </div>

                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" ref={password} type="password" placeholder="Enter Password" name="psw" id="psw" required />
                            </div>
                            <button type="submit" className="button" id="registerbtn">Register</button>
                        </div>

                        <div className="container signin">
                            <p>Already have an account? <a href="/signin">Sign in</a>.</p>
                        </div>
                    </form>
            </div>
        </div>
    )

    async function register(e) {
        try {
            e.preventDefault();
            let formData = {
                email: email.current.value,
                password: password.current.value
            }
            formData = JSON.stringify(formData)
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/register`, {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'application/json' }
            })
            const result = await response.json()
            if (response.status === 200 && result.result === "Success") {
                window.location.href = '/'
            } else {
                alert(result.result)
            }
        } catch (err) {
            alert(err)
        }
    }

}
