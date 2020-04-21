import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ContentWrapper } from '../../Styles/commons';
import { database } from '../../config/firebase';

import useAuth from '../../Hooks/useAuth';

const TableWrapper = styled.div`
  padding: 1rem;
  border-radius: 8px;
  margin: auto;
  max-width: 520px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);

  h1,
  h3 {
    padding-left: 20px;
  }
`;

const TableS = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
  margin-bottom: 16px;

  th {
    text-align: left;
    display: table-cell;
    padding: 10px 20px;
  }

  tr.divisor {
    border-bottom: 2px solid #dddd;
    height: 48px;
  }

  td {
    padding: 10px 20px;
  }
`;

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
      <TableWrapper>
        <h1>My History</h1>
        <h3>{`total of: ${history.length}`}</h3>
        {history.length ? (
          <TableS>
            <tr className="divisor">
              <th>Date</th>
              <th>Total</th>
            </tr>
            <tbody>
              {history.map(({ id, order, date }) => (
                <tr key={id} className="divisor">
                  <td>{date ? new Date(date).toLocaleDateString() : ``}</td>
                  <td>
                    {order.reduce(
                      (acc, { price, quantity }) => acc + price * quantity,
                      0
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </TableS>
        ) : (
          <div />
        )}
      </TableWrapper>
    </ContentWrapper>
  );
}
