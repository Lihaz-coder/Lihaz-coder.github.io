export const roles = [
  "SUPER_ADMIN",
  "ADMIN",
  "PRINCIPAL",
  "TEACHER",
  "ACCOUNTANT",
  "LIBRARIAN",
  "STUDENT",
  "PARENT",
] as const;

export type UserRole = (typeof roles)[number];
