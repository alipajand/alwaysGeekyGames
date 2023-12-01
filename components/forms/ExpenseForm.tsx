import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addExpense } from '@/lib/api';
import { ExpenseFormField, ExpenseInterface } from '@/interfaces';

const formBuilder: ExpenseFormField[] = [
  {
    id: 'title',
    type: 'text',
    label: 'Title',
    formOptions: {
      required: 'required'
    }
  },
  {
    id: 'quantity',
    type: 'number',
    label: 'Quantity',
    formOptions: {
      required: 'required',
      pattern: {
        value: /^[0-9]*$/,
        message: 'Entered value does not match number format'
      }
    }
  },
  {
    id: 'price',
    type: 'number',
    label: 'Price',
    formOptions: {
      required: 'required',
      pattern: {
        value: /^[0-9]*$/,
        message: 'Entered value does not match number format'
      }
    }
  }
];

interface ExpenseFormProps {
  onSuccess: (res: ExpenseInterface) => void;
  closeModal: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSuccess, closeModal }) => {
  const { register, handleSubmit, formState, reset } = useForm<ExpenseInterface>({
    defaultValues: {}
  });

  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<ExpenseInterface> = async (data) => {
    try {
      const res = await addExpense(data);
      onSuccess(res);
      closeModal();
      reset(res);
    } catch (error) {
      console.error('Failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formBuilder.map(({ id, type, label, formOptions }: ExpenseFormField, index) => (
        <div key={index} className="mb-4">
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
      ))}

      <div className="flex items-center mt-8">
        <button
          type="button"
          className="bg-gray-100 py-2 px-8 mr-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300"
          disabled={isSubmitting}
          onClick={closeModal}
        >
          Close
        </button>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
