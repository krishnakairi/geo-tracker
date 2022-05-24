import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTrackStore from '../store/track';

function Track() {
  let { id } = useParams();
  const connection = useTrackStore((state: any) => state.connection);
  const createConnection = useTrackStore((state: any) => state.createConnection);

  useEffect(() => {
    createConnection(id);
  }, []);


  return (
    <div>
      <h2>Track</h2>
      <p>{connection.id} - {connection.status}</p>
    </div>
  );
}

export default Track;