import React from "react";
import { useForm } from "react-hook-form";
import "./styles.css";

// 훅폼 기본형?
export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const onError = (error) => {
    console.log(error);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input
          type="text"
          placeholder="username"
          {...register("username", {
            minLength: {
              value: 5,
              message: "Username must be longer than 5 characters"
            }
          })}
        />
        <input type="submit" />
      </form>
      {erros && <h1>{error?.username?.message}</h1>}
    </div>
  );
}
