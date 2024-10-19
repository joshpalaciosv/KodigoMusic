import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
// importamos el metodo de autenticacion
import auth_user from '../firebase/appConfig';
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword } from 'firebase/auth';
// importamos el logo del aplicativo
import logo from '../assets/logo.png';


//utilizamos styled-components para darle estilos a los componentes
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #121212;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background-color: #282828;
  border-radius: 8px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1ed760;
  }
`;

const Login = ({ onLogin }) => { 
  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = async (data) => {
    //console.log(data.email, data.password);
        try {
            const userCredentiales = await signInWithEmailAndPassword(auth_user, data.email, data.password);
            const user = userCredentiales.user;
            //console.log(user);
            // de el componente <Login onLogin={handleLogin} /> en App.jsx llamamos a la funcion handleLogin por medio de la prop onLogin
            onLogin();

        } catch (error) {
            console.error(error.message)
            Swal.fire({
                title: "Credenciales Invalidas",
                text: "Revisa tu informacion",
                icon: "warning"
            });
        }
  };

  return (
    <LoginContainer>
      <img src={logo} alt="Logo" style={{ marginBottom: '20px' }} /> {/* logo del aplicativo */}
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="Ingrese su correo"
          {...register('email', { required: 'email es requerido',
            // validamos que el formato del email sea correcto
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Formato de email no es válido'}
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
        
        <Input
          type="password"
          placeholder="Ingrese su contraseña"
          {...register('password', { required: 'contraseña es requerida' })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );

};


export default Login;