import React from 'react';
import { Redirect } from 'react-router'
import { tokenTo } from '../middleware/bearer'

export function RedirectToken(props){
  return (
    <div>
      <Redirect to={tokenTo(location.pathname, props.token)}/>
      {props.children}
    </div>
  );
}
