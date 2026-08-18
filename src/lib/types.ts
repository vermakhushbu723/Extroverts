export type ContactMethod = "email" | "phone";

export type PronounOption =
  | "she/her"
  | "he/him"
  | "they/them"
  | "custom";

export type SignupData = {
  contactMethod: ContactMethod;
  contact: string;
  verified: boolean;
  firstName: string;
  lastName: string;
  dobYear: string;
  dobMonth: string;
  dobDay: string;
  pronoun: PronounOption | "";
  customPronoun: string;
  agreedToTerms: boolean;
};

export const emptySignupData: SignupData = {
  contactMethod: "email",
  contact: "",
  verified: false,
  firstName: "",
  lastName: "",
  dobYear: "",
  dobMonth: "",
  dobDay: "",
  pronoun: "",
  customPronoun: "",
  agreedToTerms: false,
};

export const WIZARD_STEP_COUNT = 4;
