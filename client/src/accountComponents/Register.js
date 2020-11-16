import React, { useRef } from 'react'

export default function Register() {
    const email = useRef()
    const password = useRef()

    return (
        <form onSubmit={register}>
            <div className="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>

                <label htmlFor="email"><b>Email</b></label>
                <input ref = { email } type="text" placeholder="Enter Email" name="email" id="email" required />

                <label htmlFor="psw"><b>Password</b></label>
                <input ref = { password } type="password" placeholder="Enter Password" name="psw" id="psw" required />

                <button type="submit" className="registerbtn">Register</button>
            </div>

            <div className="container signin">
                <p>Already have an account? <a href="/signin">Sign in</a>.</p>
            </div>
        </form>
    )

    async function register(e) {
        try {
            e.preventDefault();
            let formData =  {
                email: email.current.value,
                password: password.current.value
            }
            formData = JSON.stringify(formData)
            const response = await fetch('/register', {
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
