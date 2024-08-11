export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role: 'admin' | 'user';
};

export type TUpdateUser = {
  name?: string;
  phone?: string;
  address?: string;
};