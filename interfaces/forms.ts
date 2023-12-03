export interface FormFields {
  id: string;
  type: string;
  label: string;
  formOptions: {
    required?: string | boolean;
    minLength?: any;
    pattern?: any;
  };
  register?: any;
  errors?: any;
}
