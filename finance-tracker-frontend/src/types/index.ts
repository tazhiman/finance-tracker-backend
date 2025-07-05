// User-related types
export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
}

export interface SignupData {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export enum UserRole {
  ROLE_NORMAL_USER = 'ROLE_NORMAL_USER',
  ROLE_ADMIN = 'ROLE_ADMIN'
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
}

// Transaction-related types (for future implementation)
export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  date: string;
  accountId?: string;
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

// Budget-related types (for future implementation)
export interface Budget {
  id: string;
  userId: string;
  name: string;
  amount: number;
  spent: number;
  category: string;
  period: BudgetPeriod;
  startDate: string;
  endDate: string;
}

export enum BudgetPeriod {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  CUSTOM = 'CUSTOM'
}

// Reporting-related types (for future implementation)
export interface Report {
  id: string;
  userId: string;
  type: ReportType;
  data: any;
  generatedAt: string;
}

export enum ReportType {
  EXPENSE_SUMMARY = 'EXPENSE_SUMMARY',
  INCOME_SUMMARY = 'INCOME_SUMMARY',
  BUDGET_ANALYSIS = 'BUDGET_ANALYSIS',
  SPENDING_TRENDS = 'SPENDING_TRENDS'
}

// Account linking types (for future implementation)
export interface BankAccount {
  id: string;
  userId: string;
  accountNumber: string;
  bankName: string;
  accountType: AccountType;
  balance: number;
  isActive: boolean;
}

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  CREDIT_CARD = 'CREDIT_CARD',
  INVESTMENT = 'INVESTMENT'
} 