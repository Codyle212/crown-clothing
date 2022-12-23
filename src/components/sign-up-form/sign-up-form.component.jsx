import { useState } from 'react';

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formField;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formField, [name]: value });
    };
    return (
        <div>
            <h1>Sign Up with your Email and Password</h1>
            <form onSubmit={() => {}}>
                <label>Display Name</label>
                <input
                    type="text"
                    required
                    onChange={handleChange}
                    name=""
                    value={displayName}
                ></input>
                <label>Email</label>
                <input
                    type="email"
                    required
                    onChange={handleChange}
                    name=""
                    value={email}
                ></input>
                <label>Password</label>
                <input
                    type="password"
                    required
                    onChange={handleChange}
                    name=""
                    value={password}
                ></input>
                <label>Confirm Password</label>
                <input
                    type="password"
                    required
                    onChange={handleChange}
                    name=""
                    value={confirmPassword}
                ></input>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
