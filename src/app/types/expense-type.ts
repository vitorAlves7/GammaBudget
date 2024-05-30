export interface Expense {
    id?: number;
    name: string;
    description: string;
    amount: number;
    expiration_date: string;
    paid: boolean;
    payment_date: string;
    category: string;
}