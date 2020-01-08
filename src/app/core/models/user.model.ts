import {Company} from './company';

export interface User {
  id: number;
  userName: string;
  name: string;
  website: string;
  company: Company;
}
