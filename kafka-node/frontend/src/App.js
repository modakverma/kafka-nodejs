import React, { useState, useEffect } from 'react';

function App() {
  const [latestMessage, setLatestMessage] = useState({ name: '', loc: '' });

  const fetchLatestMessage = async () => {
    try {
      const response = await fetch('http://localhost:4000');
      if (response.ok) {
        const data = await response.text();
        const inputData = JSON.parse(data);
        setLatestMessage(inputData);
      } else {
        setLatestMessage({ name: 'Error fetching data', loc: 'Error fetching data' });
      }
    } catch (error) {
      setLatestMessage({ name: 'Error fetching data', loc: 'Error fetching data' });
    }
  };

  useEffect(() => {
    fetchLatestMessage();
    const intervalId = setInterval(() => {
      fetchLatestMessage();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <h1>Latest Message</h1>
      <p>Name: {latestMessage.name}</p>
      <p>Location: {latestMessage.loc}</p>
    </div>
  );
}

export default App;
