export interface ExpenseFormProps {
  onSuccess: (res: ExpenseInterface) => void;
  closeModal: () => void;
}

export interface ExpenseInterface {
  title: string;
  id: number;
  price: number;
  quantity: number;
}
