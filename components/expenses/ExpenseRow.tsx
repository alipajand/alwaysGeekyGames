import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Modal } from '@/components';
import { deleteExpense } from '@/lib/api';
import { ExpenseInterface } from '@/interfaces';

const tdClass = 'p-2 border';

interface ExpenseRowProps {
  expense: ExpenseInterface;
  onFetch: () => void;
}

export default function ExpenseRow({ expense, onFetch }: ExpenseRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteExpense(expense?.id);
      if (onFetch) onFetch();
      closeModal();
    } catch (error) {
      toast.error('Failed to delete this expense!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={expense.id}>
      <td className={tdClass}>{expense.title}</td>
      <td className={`${tdClass} text-center`}>{expense.quantity}</td>
      <td className={`${tdClass} text-center`}>{expense.price}</td>
      <td className={`${tdClass} text-center`}>{expense.quantity * expense.price}</td>
      <td className={`${tdClass} text-center`}>
        <button type="button" onClick={openModal} className="text-red-500 cursor-pointer text-sm mx-1">
          X
        </button>

        <Modal isOpen={isOpen} onClose={closeModal}>
          {isOpen && (
            <>
              <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
              <div className="mb-8">Are you sure you want to delete this expense?</div>

              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-gray-100 py-2 px-8 mr-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300"
                  disabled={loading}
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                  disabled={loading}
                  onClick={handleDelete}
                >
                  {loading ? 'Loading...' : 'Delete'}
                </button>
              </div>
            </>
          )}
        </Modal>
      </td>
    </tr>
  );
}
