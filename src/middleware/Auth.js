import decode from 'jwt-decode';
import auth0 from 'auth0-js';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
// extra items for redirect
// import React from 'react';
// import { render } from 'react-dom';
// import { Redirect } from 'react-router'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'spfy.auth0.com',
    clientID: '6TNNpuXZmZaQfnd8m5Jm6y1YS6fqKSmT',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://lfz.corefacility.ca/superphy/spfyapi/',
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('Auth successful')
        console.log(authResult)
        this.setSession(authResult);
        console.log('Auth set')
        // history.replace('/accounts');
        // render(
        //   <Redirect to='/accounts' />
        // )
      } else if (err) {
        console.log('Auth failed')
        // history.replace('/');
        // render(
        //   <Redirect to='/' />
        // )
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    // render(
    //   <Redirect to='/accounts' />
    // )
    // history.replace('/accounts');
  }

  // Getters & Setters

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
  }

  clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
  }

  getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  setAccessToken() {
    let accessToken = this.getParameterByName('access_token');
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  setIdToken() {
    let idToken = this.getParameterByName('id_token');
    localStorage.setItem(ID_TOKEN_KEY, idToken);
  }

  getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  }

  // Helper Functions

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  isTokenExpired(token) {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate < new Date();
  }

  isLoggedIn() {
    const idToken = this.getIdToken();
    return !!idToken && !this.isTokenExpired(idToken);
  }

  requireAuth(nextState, replace) {
    if (!this.isLoggedIn()) {
      replace({pathname: '/'});
    }
  }

  // Login & Logout

  login() {
    this.auth0.authorize();
  }

  logout() {
    // Clear access token and ID token from local storage
    this.clearIdToken();
    this.clearAccessToken();
    localStorage.removeItem('expires_at');
    // navigate to the home route
    // history.replace('/');
  }
}
