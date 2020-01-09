import {Company} from './company';

export interface User {
  id: number;
  username: string;
  name: string;
  website: string;
  company: Company;
}
