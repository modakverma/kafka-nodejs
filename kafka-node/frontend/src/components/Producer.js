import React, { useState } from 'react'
import './producer.css'

const Producer = () => {
    const [name, setName] = useState('');
    const [loc, setLoc] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const data = {
        name: name,
        loc: loc,
      };
  
      try {
        const response = await fetch('http://localhost:4000/api/produce', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          console.log('Data sent successfully.');
        } else {
          console.error('Failed to send data.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
  return (
    <div className='producer-page'>
       <h2>Produce Data 🚀</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Producer
