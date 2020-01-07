import {PageType} from './page-type.enum';

export const pageTitles: {[key in PageType] : string} = {
  [PageType.CreateMessage] : 'New Post',
  [PageType.EditMessage]: 'Edit Post',
  [PageType.LogIn]: 'Log In',
  [PageType.MessageList]: 'Home'
};
