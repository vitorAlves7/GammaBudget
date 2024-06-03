import { IncomingCategory } from "./incoming-category";

export interface Incoming {
  id: string;
  user_id: string;
  name: string;
  description: string;
  amount: number;
  launch_date: string; 
  category: IncomingCategory;
}
