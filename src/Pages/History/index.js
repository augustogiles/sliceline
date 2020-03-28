import React, { useState, useEffect } from 'react';
import { ContentWrapper } from '../../Styles/commons';
import { database } from '../../firebase';

import useAuth from '../../Hooks/useAuth';

async function getHistory({ uid }) {
  let list = null;
  const ordersListRef = database.ref(`orders/${uid}`);
  await ordersListRef.once(await 'value', snap => {
    const objects = snap.val();
    list = Object.keys(snap.val()).map(id => {
      const data = objects[id];
      const orderPayload = {
        id,
        ...data
      };

      return orderPayload;
    });
  });
  return list;
}

export default function History() {
  const [history, setHistory] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    if (auth.loggedIn) {
      getHistory(auth.loggedIn).then(ordersHist => {
        setHistory(ordersHist);
      });
    }
  }, [auth.loggedIn]);

  return (
    <ContentWrapper>
      <h1>My History</h1>
      <h3>{`total of: ${history.length}`}</h3>
    </ContentWrapper>
  );
}
