import {Role} from "../../models/role";

export interface UserResponse {
  id: number;
  fullname: string;
  phone_number: string;
  address: string;
  is_active: boolean;
  date_of_birth: Date;
  role: Role;
}
