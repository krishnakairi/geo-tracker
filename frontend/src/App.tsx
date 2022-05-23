import { Button, Code } from '@mantine/core';
import { useEffect } from 'react';
import Initiator from './services/initiator';
import useStore from './store';
import { Text, Paper } from '@mantine/core';

function Device(connection: any) {
  return (
    <Paper shadow="xs" p="md">
      <Code block>{JSON.stringify(connection)}</Code>
    </Paper>
  );
}

function App() {
  const intiated = useStore((state: any) => state.intiated);
  const peerId = useStore((state: any) => state.peerId);
  const offer = useStore((state: any) => state.offer);
  const init = useStore((state: any) => state.init);
  const connections = useStore((state: any) => state.connections);
  const createConnection = useStore((state: any) => state.createConnection);

  useEffect(() => {
    console.log('init');
    init(true);
  }, []);

  return (
    <div>
      <Code block>initated: {(intiated)? 'true' : 'false'} </Code>
      <Code block>peerId: {peerId} </Code>
      <Code block>{offer}</Code>
      <hr></hr>
      {connections.map((connection: any) =>
        <Device key={connection.id} connection={connection}></Device>
      )}
      <Button onClick={createConnection}>Add Device</Button>
    </div>
  );
}


export default App;
