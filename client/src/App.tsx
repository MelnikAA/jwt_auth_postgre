import React, {FC, useContext, useEffect, useState} from 'react';
import { Context } from './index';
import {BrowserRouter} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';



const App: FC = () => {

  const {store} = useContext(Context);
  const [user, setUsers] = useState<IUser[]>()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      store.checkAuth()
    }
  }, [])

  async function getUser() {
    try{
      const response = await UserService.fetchUsers();
      setUsers(response.data)
      }catch(e){
      console.log(e)
    }
  }

  if (store.isLoading){
    return <div>Loading...*^____^*</div>
  }

  if (!store.isAuth) {
    return (
    <LoginForm />
    )
  }

  return (
     <div>
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}`:'АВТОРИЗУЙТЕСЬ'}</h1>

      <button onClick={()=>store.logout()}>Выйти</button>
      <div>
        <button onClick={getUser}>Получить пользователей </button>
      </div>
      {user?.map(user =>
        <div key={user.email}>{user.email}</div>
        )}
    </div> 
  );
}

export default observer(App);
