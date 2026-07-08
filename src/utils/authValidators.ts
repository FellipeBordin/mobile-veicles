import { isStrongPassword, isValidEmail } from "./validators";

export function validateRegister(
  name: string,
  email: string,
  password: string,
): string | null {
  if (!name.trim()) {
    return "Informe seu nome.";
  }

  if (!isValidEmail(email)) {
    return "E-mail inválido.";
  }

  if (!isStrongPassword(password)) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }

  return null;
}

export function validateLogin(email: string, password: string): string | null {
  if (!email.trim() || !password.trim()) {
    return "Preencha e-mail e senha.";
  }

  if (!isValidEmail(email)) {
    return "E-mail inválido.";
  }

  if (!isStrongPassword(password)) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }

  return null;
}

export function validateResetPassword(
  email: string,
  password: string,
  confirmPassword: string,
): string | null {
  if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
    return "Preencha e-mail, nova senha e confirmação.";
  }

  if (!isValidEmail(email)) {
    return "E-mail inválido.";
  }

  if (!isStrongPassword(password)) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }

  if (password !== confirmPassword) {
    return "A confirmação da senha não confere.";
  }

  return null;
}