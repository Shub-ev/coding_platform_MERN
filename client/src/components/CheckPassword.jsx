import React, { useState } from 'react';

const CheckPassword = ({ title }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {

    }
    try{
      const response = await fetch('http://localhost:8080/user/coding_platform/test/checkPass', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: 
      })
    }
    catch(error){
      console.error(error);
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-md rounded-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Enter Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 border rounded-md outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckPassword;
