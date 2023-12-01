type idTypes = 'username' | 'password';

export interface LoginFormField {
  id: idTypes;
  type: string;
  label: string;
  formOptions: {
    required?: string | boolean;
    minLength?: {
      value: number;
      message: string;
    };
  };
}
