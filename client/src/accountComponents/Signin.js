import React, { useRef } from 'react'

export default function Signin() {
    const email = useRef()
    const password = useRef()

    return (
        <form onSubmit={login}>
            <div className="container">
                <h1>Sign-in</h1>

                <label htmlFor="email"><b>Email</b></label>
                <input ref = { email } type="text" placeholder="Enter Email" name="email" id="email" required />

                <label htmlFor="psw"><b>Password</b></label>
                <input ref = { password } type="password" placeholder="Enter Password" name="psw" id="psw" required />

                <button type="submit" className="registerbtn">Sign-in</button>
            </div>

            <div className="container signin">
                <p>Do not have an account? <a href="/register">Sign-up</a>.</p>
            </div>
        </form>

    )

    async function login(e) {
        try {
            e.preventDefault();
            let formData =  {
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
            if (result.result === "Success") {
                window.location.href = '/'
            } else {
                alert(result.result)
            }
        } catch (err) {
            alert(err)
        }
    }
}
