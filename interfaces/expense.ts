export interface ExpenseFormProps {
  onSuccess: (res: ExpenseFormInterface) => void;
  closeModal: () => void;
}

export interface ExpenseFormInterface {
  title: string;
  id: number;
  price: number;
  quantity: number;
}
