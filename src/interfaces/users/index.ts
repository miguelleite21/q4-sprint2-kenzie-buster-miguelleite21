export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  isAdm?: boolean;
  adm: boolean;
  token?: string;
}

export interface ILogin {
  email: string;
  password: string;
}
