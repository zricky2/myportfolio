import React, { useRef } from 'react'
import 'bulma/css/bulma.css';

export default function Signin() {
    const email = useRef()
    const password = useRef()

    return (
        <div className="container">
            <div className="columns">
                <div className="column is-half">
                    <form className="field" onSubmit={login}>
                        <div>
                            <p>Sign in below</p>
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" ref={email} type="email" placeholder="Enter Email" name="email" id="email" required />
                            </div>
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" ref={password} type="password" placeholder="Enter Password" name="psw" id="psw" required />
                            </div>
                            <button type="submit" className="button">Sign-in</button>
                        </div>
                        <div className="container signin">
                            <p>Do not have an account? <a href="/register">Sign-up</a>.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

    async function login(e) {
        try {
            e.preventDefault();
            let formData = {
                email: email.current.value,
                password: password.current.value
            }
            formData = JSON.stringify(formData)
            const response = await fetch('/signin', {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'application/json' }
            })
            const result = await response.json() 
            console.log(response)
            if (response.status === 200 ) {
                window.location.href = '/'
            } else {
                alert(result.result)
            }
        } catch (err) {
            alert(err)
        }
    }
}
