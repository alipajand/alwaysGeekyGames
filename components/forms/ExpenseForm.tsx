import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';

import { addExpense } from '@/lib/api';
import { FormGenerator } from '@/components';
import { FormFields, ExpenseInterface, ExpenseFormProps } from '@/interfaces';

const numberPatternValidation = {
  required: 'required',
  pattern: {
    value: /^[0-9]*$/,
    message: 'Entered value does not match number format'
  }
};

const formBuilder: FormFields[] = [
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
    formOptions: numberPatternValidation
  },
  {
    id: 'price',
    type: 'number',
    label: 'Price',
    formOptions: numberPatternValidation
  }
];

const closeButtonStyles =
  'bg-gray-100 py-2 px-8 mr-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300';
const submitButtonStyles =
  'w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300';

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSuccess, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ExpenseInterface>({
    defaultValues: {}
  });

  const onSubmit: SubmitHandler<ExpenseInterface> = useCallback(
    async (data) => {
      try {
        const res = await addExpense(data);
        onSuccess(res);
        closeModal();
        reset(res);
      } catch (error) {
        toast.error('Failed to add a new expense. Please try again later.');
        console.error('ExpenseForm - onSubmit Error:', error);
      }
    },
    [onSuccess, closeModal, reset]
  );

  const submitButtonLabel = isSubmitting ? 'Loading...' : 'Submit';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formBuilder.map((field, index) => (
        <FormGenerator key={index} {...field} register={register} errors={errors} />
      ))}

      <div className="flex items-center mt-8">
        <button type="button" className={closeButtonStyles} disabled={isSubmitting} onClick={closeModal}>
          Close
        </button>

        <button type="submit" className={submitButtonStyles} disabled={isSubmitting}>
          {submitButtonLabel}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
