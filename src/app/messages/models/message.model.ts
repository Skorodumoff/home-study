import {User} from '../../core/models/user.model';

export interface Message {
  userId: number;
  user?: User;
  name?: string;
  id?: number;
  title: string;
  body: string;
}
