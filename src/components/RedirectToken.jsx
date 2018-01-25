import React from 'react';
import { Redirect } from 'react-router'
import { tokenTo } from '../middleware/bearer'

export function RedirectToken(props){
  console.log('Hey! Im trying to redirect you')
  console.log('RedirectToken has')
  // Some strange things can happen depending on the call.
  let path = ''
  if (props.location){
    path = props.location.pathname
  } else {
    path = location.pathname
  }
  console.log(path)
  console.log(' with token ')
  console.log(props.token)
  let token = props.token
  return (
    <div>
      <Redirect to={tokenTo(path, token)}/>
      {props.children}
    </div>
  );
}
