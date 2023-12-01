import React, { useEffect, useState } from 'react';
import { ExpenseInterface } from '@/interfaces';
import { ExpenseRow } from '@/components';

const thClass = 'p-2 border';
const totalRowClass = 'text-gray-600';

const tableHeader = ['Title', 'Quantity', 'Price', 'Total', ''];

interface ExpenseListProps {
  expenses: ExpenseInterface[];
  onFetch: () => void;
}

export default function ExpenseList({ onFetch, expenses }: ExpenseListProps) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalAmount = expenses.reduce(
      (acc: number, expense: ExpenseInterface) => acc + expense.quantity * expense.price,
      0
    );
    setTotal(totalAmount);
  }, [expenses, setTotal]);

  return (
    <>
      <table className="w-full text-left">
        <thead>
          <tr>
            {tableHeader.map((item, index) => (
              <th key={index} className={thClass}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.length !== 0 ? (
            <>
              {expenses.map((expense: ExpenseInterface) => (
                <ExpenseRow key={expense.id} expense={expense} onFetch={onFetch} />
              ))}
              <tr className={totalRowClass}>
                <td colSpan={3} className="text-right text-sm border p-2">
                  Total Quantity
                </td>
                <td className="text-center border p-2">{total}</td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-2">
                Not Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
