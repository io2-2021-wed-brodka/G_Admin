
export enum UserRole{
    user,tech,admin,
} 
export interface User{
    username: string;
    role: UserRole;
}
