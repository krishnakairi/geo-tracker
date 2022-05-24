import React from 'react';
import useHomeStore from '../store/home';

function Home() {
  const connections = useHomeStore((state: any) => state.connections);
  const createConnection = useHomeStore((state: any) => state.createConnection);
  return (
    <div>
      <h2>Home</h2>
      <ul>
      {
        connections.map((connection: any) => <li key={connection.id}>{connection.id} - {connection.status}</li>)
      }
      </ul>
      <button onClick={createConnection}>Add Device</button>
    </div >
  );
}

export default Home;