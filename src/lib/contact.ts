export interface Inquiry {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string;
}

export function validateInquiry(input: Inquiry): string | null {
  if (input.website.trim()) return "We could not validate this request. Please call or email us directly.";
  if (input.name.trim().length < 2 || input.name.length > 120) return "Please enter your name (2–120 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim()) || input.email.length > 254) return "Please enter a valid email address.";
  if (input.phone.trim() && !/^[0-9+().\-\s]{7,30}$/.test(input.phone.trim())) return "Please enter a valid phone number, or leave it blank.";
  if (input.service.length > 120) return "Please choose a service from the list.";
  if (input.message.trim().length < 10 || input.message.length > 4000) return "Tell us a little more (10–4,000 characters).";
  return null;
}

export function buildEmailDraft(recipient: string, input: Inquiry): string {
  const error = validateInquiry(input);
  if (error) throw new Error(error);
  const subject = `Service request: ${input.service || "General inquiry"}`;
  const phone = input.phone.trim() ? `\nPhone: ${input.phone.trim()}` : "";
  const body = `Name: ${input.name.trim()}\nEmail: ${input.email.trim()}${phone}\nService: ${input.service || "Not sure yet"}\n\n${input.message.trim()}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function isAcceptedResponse(value: unknown): value is { ok: true } {
  return typeof value === "object" && value !== null && "ok" in value && value.ok === true;
}
