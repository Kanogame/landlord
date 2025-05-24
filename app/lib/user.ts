export interface TUser {
  id: number;
  name: TName;
}

export interface TName {
  name: string;
  surname: string;
  patronym?: string;
}

export function GetOwnerString(user: TUser): string {
  return user.name.name + ', хозяин';
}
