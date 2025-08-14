export type SignUpPayload = {
  name: string;
  email: string;
  phone: string;
};

export type SignUpResponse = {
  id: string;  
  message?: string;  
};