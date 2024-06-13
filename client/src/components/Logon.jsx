import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './AuthForm.css';

function AuthForm() {
    const [formType, setFormType] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [role, setRole] = useState('Donor');
    const [securityQuestion, setSecurityQuestion] = useState('In what city were you born?');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [redirectMessage, setRedirectMessage] = useState(''); // Added missing state for redirectMessage
    const [zipCode, setZipCode] = useState('');

    const navigate = useNavigate(); // Hook for navigating

    const securityQuestions = [
        "What was your first pet's name?",
        "What was the model of your first car?",
        "What is your mother's maiden name?",
        "In what city were you born?",
        "What is your favorite movie?",
        "What is your favorite color?"
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        if ((formType === 'signup' || formType === 'reset') && password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const userCredentials = {
            email,
            password,
            role,
            securityQuestion,
            securityAnswer,
            newPassword,
            zipCode,
        };

        let endpoint;
        switch (formType) {
            case 'login':
                endpoint = 'http://localhost:3000/api/users/login';
                break;
            case 'signup':
                endpoint = 'http://localhost:3000/api/users/register';
                break;
            case 'reset':
                endpoint = 'http://localhost:3000/api/users/reset-password';
                break;
            default:
                return;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userCredentials),
            });
        
            const data = await response.json();
            if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText} - ${data.message}`);

            if (formType === 'login') {
                // Handling the redirection message
                localStorage.setItem('id', data.id);
                localStorage.setItem('role', data.role);
                localStorage.setItem('name', data.name);
                localStorage.setItem('token', data.token);
                window.dispatchEvent(new Event('storage'));
                setRedirectMessage('Redirecting to your dashboard...');
                setTimeout(() => navigateBasedOnRole(data.role), 500); // Wait .5 seconds before redirecting
            } else {
                alert('Operation successful');
                resetFormFields();
                setFormType('login');
            }
        } catch (error) {
            alert(`Operation failed: ${error.message}`);
        }
    };

    const navigateBasedOnRole = (role) => {
        // Adjust these paths based on your application's routes
        const rolePaths = {
            'Admin': '/admin-dashboard',
            'Donor': '/donor-dashboard',
            'Recipient': '/recipient-dashboard',
        };
        const path = rolePaths[role] || '/';
        navigate(path);
    };

    const resetFormFields = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setNewPassword('');
        setRole('Donor');
        setSecurityQuestion('In what city were you born?');
        setSecurityAnswer('');
        setRedirectMessage(''); // Reset redirect message
        setZipCode('');
    };
    return (
        <div className="auth-form text-black">
            {redirectMessage && <div className="redirect-message">{redirectMessage}</div>} {/* Show redirect message */}
            <h2>{formType === 'login' ? 'Login' : formType === 'signup' ? 'Sign Up' : 'Reset Password'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                {(formType === 'signup' || formType === 'login') && (
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                )}

                {formType === 'signup' && (
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                )}

                {formType === 'reset' && (
                    <div className="form-group">
                        <label>New Password:</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                )}

                {(formType === 'signup' || formType === 'reset') && (
                    <>
                        <div className="form-group">
                            <label>Role (only for signup):</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)} required={formType === 'signup'}>
                                <option value="Donor">Donor</option>
                                <option value="Recipient">Recipient</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Security Question:</label>
                            <select value={securityQuestion} onChange={(e) => setSecurityQuestion(e.target.value)} required>
                                {securityQuestions.map((question, index) => (
                                    <option key={index} value={question}>{question}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Security Answer:</label>
                            <input type="text" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} required />
                        </div>
                    </>
                )}
                {(formType === 'signup') && (
                    <>
                        <div className="form-group">
                            <label>Zip Code:</label>
                            <input type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                        </div>
                    </>
                )}

                <button type="submit" className="submit-btn">
                    {formType === 'login' ? 'Login' : formType === 'signup' ? 'Sign Up' : 'Reset Password'}
                </button>
            </form>
            <button onClick={() => setFormType(formType === 'login' ? 'signup' : 'login')} className="toggle-btn">
                {formType === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
            </button>
            {formType !== 'reset' && (
                <button onClick={() => setFormType('reset')} className="toggle-btn">Forgot Password?</button>
            )}
        </div>
    );
}

export default AuthForm;
