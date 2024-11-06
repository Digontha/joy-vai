"use client"
// import styled from 'styled-components';
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/login', {
        email,
        password,
      
      } ,   {withCredentials: true}
    );

      // If login is successful, redirect or handle token as needed
      const { data } = response;
      console.log('Login successful', data);
      setSuccess(data.message);
      router.push('/createblog');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // const StyledWrapper = styled.div`
  // .button {
  //   --bezier: cubic-bezier(0.22, 0.61, 0.36, 1);
  //   --edge-light: hsla(0, 0%, 50%, 0.8);
  //   --text-light: rgba(255, 255, 255, 0.4);
  //   --back-color: 240, 40%;

  //   cursor: pointer;
  //   padding: 0.7em 1em;
  //   border-radius: 0.5em;
  //   min-height: 2.4em;
  //   min-width: 3em;
  //   display: flex;
  //   align-items: center;
  //   gap: 0.5em;

  //   font-size: 18px;
  //   letter-spacing: 0.05em;
  //   line-height: 1;
  //   font-weight: bold;

  //   background: linear-gradient(
  //     140deg,
  //     hsla(var(--back-color), 50%, 1) min(2em, 20%),
  //     hsla(var(--back-color), 50%, 0.6) min(8em, 100%)
  //   );
  //   color: hsla(0, 0%, 90%);
  //   border: 0;
  //   box-shadow: inset 0.4px 1px 4px var(--edge-light);

  //   transition: all 0.1s var(--bezier);
  // }

  // .button:hover {
  //   --edge-light: hsla(0, 0%, 50%, 1);
  //   text-shadow: 0px 0px 10px var(--text-light);
  //   box-shadow: inset 0.4px 1px 4px var(--edge-light),
  //     2px 4px 8px hsla(0, 0%, 0%, 0.295);
  //   transform: scale(1.1);
  // }

  // .button:active {
  //   --text-light: rgba(255, 255, 255, 1);

  //   background: linear-gradient(
  //     140deg,
  //     hsla(var(--back-color), 50%, 1) min(2em, 20%),
  //     hsla(var(--back-color), 50%, 0.6) min(8em, 100%)
  //   );
  //   box-shadow: inset 0.4px 1px 8px var(--edge-light),
  //     0px 0px 8px hsla(var(--back-color), 50%, 0.6);
  //   text-shadow: 0px 0px 20px var(--text-light);
  //   color: hsla(0, 0%, 100%, 1);
  //   letter-spacing: 0.1em;
  //   transform: scale(1);
  // }`;

  return (
    <div className="flex text-black items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              placeholder='Enter your email address'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              placeholder='**********'
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {/* <StyledWrapper>
            <div>
              <button type="submit" className="button w-full flex justify-center">
                <svg viewBox="0 0 16 16" className="bi bi-lightning-charge-fill" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" /></svg>Login
              </button>
            </div>
          </StyledWrapper> */}
          <button type="submit" className="button w-full bg-blue-600 text-white p-2 flex justify-center">
            <svg viewBox="0 0 16 16" className="bi bi-lightning-charge-fill" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" /></svg>Login
          </button>
        </form>
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {success && <div className="mt-4 text-green-500">{success}</div>}
      </div>
    </div>
  );
};

export default Login;