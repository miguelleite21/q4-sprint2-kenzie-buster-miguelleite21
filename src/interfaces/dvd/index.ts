export interface IDvd {
  id: string;
  name: string;
  duration: string;
}

export interface IDvdCreate {
  name: string;
  duration: string;
  quantity: number;
  price: number;
  userEmail: string;
}

export interface IDvdBuy {
  quantity: number;
  id: string;
  userEmail: string;
}
