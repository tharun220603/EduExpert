export type ApplyFormData = {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  city: string;
  state: string;
  specialization: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type FormErrors<T> = Partial<Record<keyof T, string>>;

type ApplyValidationOptions = {
  requireCity?: boolean;
};

const nameRegex = /^[A-Za-z][A-Za-z\s.'-]*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const cityRegex = /^[A-Za-z][A-Za-z\s.'-]*$/;

const collapseWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const normalizePhoneDigits = (value: string) => {
  const digits = value.replace(/\D/g, "");

  if (/^91\d{10}$/.test(digits)) {
    return digits.slice(2);
  }

  if (/^0\d{10}$/.test(digits)) {
    return digits.slice(1);
  }

  return digits;
};

export const sanitizeApplyFormData = (data: ApplyFormData): ApplyFormData => ({
  fullName: collapseWhitespace(data.fullName),
  email: collapseWhitespace(data.email).toLowerCase(),
  phone: normalizePhoneDigits(data.phone),
  course: data.course.trim(),
  city: collapseWhitespace(data.city),
  state: data.state.trim(),
  specialization: collapseWhitespace(data.specialization),
});

export const sanitizeContactFormData = (
  data: ContactFormData
): ContactFormData => ({
  name: collapseWhitespace(data.name),
  email: collapseWhitespace(data.email).toLowerCase(),
  subject: data.subject.trim(),
  message: collapseWhitespace(data.message),
});

export const validateApplyField = (
  field: keyof ApplyFormData,
  rawData: ApplyFormData,
  options: ApplyValidationOptions = {}
) => {
  const data = sanitizeApplyFormData(rawData);

  switch (field) {
    case "fullName":
      if (!data.fullName) return "Full name is required.";
      if (data.fullName.length < 2) return "Full name must be at least 2 characters.";
      if (data.fullName.length > 60) return "Full name must be 60 characters or fewer.";
      if (!nameRegex.test(data.fullName)) return "Use letters, spaces, apostrophes, dots, or hyphens only.";
      return "";

    case "email":
      if (!data.email) return "Email address is required.";
      if (data.email.length > 254) return "Email address is too long.";
      if (!emailRegex.test(data.email)) return "Enter a valid email address.";
      return "";

    case "phone":
      if (!data.phone) return "Phone number is required.";
      if (!/^[6-9]\d{9}$/.test(data.phone)) {
        return "Enter a valid 10-digit mobile number.";
      }
      return "";

    case "course":
      if (!data.course) return "Please select a course of interest.";
      return "";

    case "city":
      if (!data.city && !options.requireCity) return "";
      if (!data.city) return "City is required.";
      if (data.city.length < 2) return "City must be at least 2 characters.";
      if (data.city.length > 60) return "City must be 60 characters or fewer.";
      if (!cityRegex.test(data.city)) return "Use letters, spaces, apostrophes, dots, or hyphens only.";
      return "";

    case "state":
      if (!data.state) return "Please select a state.";
      return "";

    case "specialization":
      if (!data.specialization) return "Specialization/Stream is required.";
      return "";

    default:
      return "";
  }
};

export const validateApplyForm = (
  data: ApplyFormData,
  options: ApplyValidationOptions = {}
): FormErrors<ApplyFormData> => {
  const fields: Array<keyof ApplyFormData> = [
    "fullName",
    "email",
    "phone",
    "course",
    "city",
    "state",
    "specialization",
  ];

  return fields.reduce<FormErrors<ApplyFormData>>((errors, field) => {
    const error = validateApplyField(field, data, options);
    if (error) {
      errors[field] = error;
    }
    return errors;
  }, {});
};

export const validateContactField = (
  field: keyof ContactFormData,
  rawData: ContactFormData
) => {
  const data = sanitizeContactFormData(rawData);

  switch (field) {
    case "name":
      if (!data.name) return "Full name is required.";
      if (data.name.length < 2) return "Full name must be at least 2 characters.";
      if (data.name.length > 60) return "Full name must be 60 characters or fewer.";
      if (!nameRegex.test(data.name)) return "Use letters, spaces, apostrophes, dots, or hyphens only.";
      return "";

    case "email":
      if (!data.email) return "Email address is required.";
      if (data.email.length > 254) return "Email address is too long.";
      if (!emailRegex.test(data.email)) return "Enter a valid email address.";
      return "";

    case "subject":
      if (!data.subject) return "Please select a topic.";
      return "";

    case "message":
      if (!data.message) return "Message is required.";
      if (data.message.length < 20) return "Message must be at least 20 characters.";
      if (data.message.length > 1000) return "Message must be 1000 characters or fewer.";
      return "";

    default:
      return "";
  }
};

export const validateContactForm = (
  data: ContactFormData
): FormErrors<ContactFormData> => {
  const fields: Array<keyof ContactFormData> = [
    "name",
    "email",
    "subject",
    "message",
  ];

  return fields.reduce<FormErrors<ContactFormData>>((errors, field) => {
    const error = validateContactField(field, data);
    if (error) {
      errors[field] = error;
    }
    return errors;
  }, {});
};
