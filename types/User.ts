import { ColorValue } from 'react-native';

export type User = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  text: string | null;
  email: string | null;
  backgroundColor: ColorValue | null;
  avatar: string | null;
  avatar_large: string | null;
};
