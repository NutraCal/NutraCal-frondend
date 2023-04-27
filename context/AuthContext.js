import {React, createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

import deviceStorage from '../util/deviceStorage';

import axios from 'axios';

import {endpoint} from '../util/config';

const API = axios.create({
  baseURL: `${endpoint}/users`,
  withCredentials: true,
});

const verifyToken = data => {
  return API.post('/verifyToken', data);
};

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);

  const login = async data => {
    setIsLoading(true);
    setToken(data?.token);
    setUser(data);
    await deviceStorage.saveItem('user', data);
    await deviceStorage.saveItem('token', data?.token);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setToken(null);
    setUser(null);
    await deviceStorage.deleteItem('token');
    await deviceStorage.deleteItem('user');
    setIsLoading(false);
  };

  const userData = async newUser => {
    if (newUser?.data && newUser?.token) {
      setUser(newUser);
    } else if (newUser?.data) {
      setUser({...user, data: newUser?.data?.data});
    } else if (newUser?.token) {
      setUser({...user, token: newUser?.token});
    }
    await deviceStorage.saveItem('user', user);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    let token = await deviceStorage.loadItem('token');
    let user = await deviceStorage.loadItem('user');
    if (!token || !user) {
      setIsLoading(false);
      return;
    }
    const response = await verifyToken({token: token});
    if (
      response?.data?.message === 'Token Expired' ||
      !response?.data?.message === 'Invalid Token'
    ) {
      await deviceStorage.deleteItem('token');
      await deviceStorage.deleteItem('user');
      setUser(null);
      setToken(null);
      setIsLoading(false);
    } else {
      setUser(user);
      setToken(token);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{login, logout, userData, isLoading, token, user}}>
      {children}
    </AuthContext.Provider>
  );
};
