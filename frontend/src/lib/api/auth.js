import client from './client';

export const logout = () => client.post('/api/auth/logout');
