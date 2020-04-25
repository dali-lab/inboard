const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
export function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}

const PASSWORD_REGEX = /.{6,}/;
export function validatePassword(password) {
  return PASSWORD_REGEX.test(password);
}
