export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPlate(plate: string): boolean {
  const oldPlate = /^[A-Z]{3}[0-9]{4}$/;
  const mercosulPlate = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

  return (
    oldPlate.test(plate.toUpperCase()) ||
    mercosulPlate.test(plate.toUpperCase())
  );
}

export function isStrongPassword(password: string): boolean {
  return password.trim().length >= 6;
}

export function isPositiveNumber(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}