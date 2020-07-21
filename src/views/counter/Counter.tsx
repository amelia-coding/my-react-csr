import gql from 'graphql-tag';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Counter() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.source.data);

  const onChange = useCallback(val => {
    console.log(val);
    dispatch.source.setDataSource({
      gql: gql`
        {
          recipes {
            id
            title
            description
          }
        }
      `,
    });
  }, []);

  return (
    <div>
      <input aria-label="Set increment amount" onChange={e => onChange(e.target.value)} />
      <p>
        {data.recipes?.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </p>
    </div>
  );
}
