import API from '../services/api';

const login = (email: string, password: string) => {
   return API.post('login', { email, password });
}

const fetchProfile = (id: string, token: string) =>
   API.get(`user/${id}`, {
      headers: {
         Authorization: `Bearer ${token}`
      }
   });

const registerUser =( email:string, password:string)=>{
  return  API.post('user',{email, password})
}


export { fetchProfile, login, registerUser };

