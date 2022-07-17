import { UserRole, UserRoleDB } from "../models/User/types";

export const mapUserRole = (role: UserRole): UserRoleDB => {
  if (role === "chief") return "generalUser";
  if (role === "user") return "ordinaryUser";
  return role;
};
