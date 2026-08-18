const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[\p{L}][\p{L}'’\- ]{0,39}$/u;

export function validateEmail(raw: string): string | null {
  const value = raw.trim();
  if (!value) return "Enter your email address";
  if (/\s/.test(raw) && raw.trim() !== raw) return "Email can't start or end with a space";
  if (!EMAIL_RE.test(value)) return "Enter a valid email address, like you@example.com";
  if (value.length > 254) return "That email is too long";
  return null;
}

export function validatePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "Enter your phone number";
  if (digits.length < 10) return "Phone number must be at least 10 digits";
  if (digits.length > 15) return "Phone number is too long";
  return null;
}

export function validateOtp(value: string): string | null {
  if (!value) return "Enter the 6-digit code";
  if (!/^\d{6}$/.test(value)) return "Code must be exactly 6 digits";
  return null;
}

export function validateName(raw: string, field = "name"): string | null {
  const value = raw.trim();
  if (!value) return `Enter your ${field}`;
  if (value !== raw) return `Your ${field} can't start or end with a space`;
  if (value.length < 2) return `${field[0].toUpperCase()}${field.slice(1)} must be at least 2 characters`;
  if (value.length > 40) return `${field[0].toUpperCase()}${field.slice(1)} must be under 40 characters`;
  if (!NAME_RE.test(value)) return "Only letters, spaces, apostrophes and hyphens are allowed";
  return null;
}

export const MIN_SIGNUP_AGE = 18;
export const MAX_REASONABLE_AGE = 100;

export function calculateAge(dob: Date, today: Date = new Date()): number {
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export function validateDob(
  year: string,
  month: string,
  day: string,
): { error: string | null; date: Date | null; age: number | null } {
  if (!year || !month || !day) {
    return { error: "Enter your full date of birth", date: null, age: null };
  }
  const y = Number(year);
  const m = Number(month);
  const d = Number(day);

  if (year.length !== 4 || !Number.isInteger(y)) {
    return { error: "Enter a valid 4-digit year", date: null, age: null };
  }

  const date = new Date(y, m - 1, d);
  const isRealDate = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  if (!isRealDate) {
    return { error: "That date doesn't exist — double-check it", date: null, age: null };
  }

  const today = new Date();
  if (date > today) {
    return { error: "Date of birth can't be in the future", date: null, age: null };
  }

  const age = calculateAge(date, today);

  if (age > MAX_REASONABLE_AGE) {
    return { error: "Please double-check your birth year", date: null, age: null };
  }

  if (age < MIN_SIGNUP_AGE) {
    return {
      error: `You must be at least ${MIN_SIGNUP_AGE} to join Extroverts`,
      date,
      age,
    };
  }

  return { error: null, date, age };
}
