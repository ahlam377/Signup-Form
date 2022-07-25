import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import "../App.css"

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().positive().integer().required(),
  password: yup.string().min(5).max(10).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
}).required();

export default function Form() {
  const { register, handleSubmit, formState:{ errors } ,reset} = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => {
    console.log(data);
    reset();
  }

  return (
   <div className="Form">
   <div className="title">Sign Up</div>
   <div className="inputs">
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      <p>{errors.firstName?.message}</p>
        
      <input {...register("lastName")} placeholder="Last Name"/>
      <p>{errors.lastName?.message}</p>

      <input {...register("age")} placeholder="Age"/>
      <p>{errors.age?.message}</p>
      
      <input {...register("email")} placeholder="Email"/>
      <p>{errors.email?.message}</p>

      <input {...register("password")} placeholder="Password"/>
      <p>{errors.password?.message}</p>

      <input {...register("confirmPassword")} placeholder="Confirm Password"/>
      <p>{errors.confirmPassword && "Passwords Should Match!"}</p>

      <input  id="submit" type="submit" />
    </form>
     </div>
    </div>
  );
}
