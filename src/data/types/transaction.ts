export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: {
    name: string;
    icon: string;
    color: string;
  };
}