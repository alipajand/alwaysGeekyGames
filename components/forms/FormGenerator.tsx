import React from 'react';
import { FormFields } from '@/interfaces';

const FormGenerator = ({ id, type, label, formOptions, register, errors }: FormFields) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      {...register(id, formOptions)}
      type={type}
      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    />
    {errors[id] && (
      <span className="text-sm px-1 text-red-600" role="alert">
        {errors[id]?.message}
      </span>
    )}
  </div>
);

export default FormGenerator;
