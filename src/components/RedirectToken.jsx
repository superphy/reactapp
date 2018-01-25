import React from 'react';
import { Redirect } from 'react-router'
import { tokenTo } from '../middleware/bearer'

export function RedirectToken(props){
  console.log('RedirectToken has:')
  console.log(props)
  // Some strange things can happen depending on the call.
  let path = ''
  if (props.location){
    path = props.location.pathname
  } else {
    path = location.pathname
  }
  let token = props.token
  return (
    <div>
      <Redirect to={tokenTo(path, token)}/>
      {props.children}
    </div>
  );
}
