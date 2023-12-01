type idTypes = 'title' | 'quantity' | 'price';

export interface ExpenseFormField {
  id: idTypes;
  type: string;
  label: string;
  formOptions: {
    required?: string | boolean;
    minLength?: any;
    pattern?: any;
  };
}

export interface ExpenseInterface {
  title: string;
  id: number;
  price: number;
  quantity: number;
}
