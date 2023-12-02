import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { fetchExpenses } from '@/lib/api';
import { ExpenseInterface } from '@/interfaces';
import { ExpenseForm, ExpenseList, Modal } from '@/components';

const ExpensesPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const expensesData = await fetchExpenses();
      setExpenses(expensesData);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleAddExpense = (newExpense: ExpenseInterface) => {
    closeModal();
    setExpenses((prev) => [...prev, newExpense]);
  };

  return (
    <div className="min-h-screen bg-gray-300 py-8">
      <div className="container mx-auto px-6">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-semibold px-1">Expenses</h1>
            <span className="flex-grow" />
            <button
              disabled={loading}
              onClick={openModal}
              className="w-28 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 text-sm"
            >
              + Add
            </button>
          </div>

          <ExpenseList expenses={expenses} onFetch={loadExpenses} />

          {loading && <p>Loading...</p>}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {isOpen && (
          <>
            <h2 className="text-2xl font-semibold mb-6">Add Expense</h2>
            <ExpenseForm closeModal={closeModal} onSuccess={handleAddExpense} />
          </>
        )}
      </Modal>
    </div>
  );
};

export default ExpensesPage;
