import { RoleFromServer } from "../routes/api/types";
import { UserRole } from "../store/userStore/types";

const comparedRoles: { [key in RoleFromServer]: UserRole } = {
  admin: "admin",
  ordinaryUser: "user",
  generalUser: "chief",
};

export const mapUserRole = (role: RoleFromServer): UserRole => {
  const userRole = comparedRoles[role];
  return userRole;
};
