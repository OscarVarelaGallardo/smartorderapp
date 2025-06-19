import API from '../services/api';

const login = (email: string, password: string) => {
   console.log('Logging in with:', { email, password });
   return API.post('login', { email, password });
}

const fetchProfile = (id: string, token: string) =>
   API.get(`user/${id}`, {
      headers: {
         Authorization: `Bearer ${token}`
      }
   });


export { fetchProfile, login };

