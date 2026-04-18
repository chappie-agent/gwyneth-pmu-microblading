// actions/contact.ts
"use server";

import { z } from "zod";
import { Resend } from "resend";
import { ContactConfirmationEmail } from "@/emails/contact-confirmation";
import { ContactNotificationEmail } from "@/emails/contact-notification";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  naam: z.string().min(2, "Naam is verplicht"),
  telefoon: z.string().optional(),
  email: z.string().email("Ongeldig e-mailadres"),
  behandeling: z.string().optional(),
  bericht: z.string().min(1, "Bericht is verplicht"),
});

export type ContactFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

// Map treatment slugs to readable names
const treatmentLabels: Record<string, string> = {
  microblading: "Microblading",
  "powder-brows": "Powder Brows",
  "combi-brows": "Combi Brows",
  consult: "Vrijblijvend Consult",
};

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    naam: formData.get("naam") as string,
    telefoon: formData.get("telefoon") as string,
    email: formData.get("email") as string,
    behandeling: formData.get("behandeling") as string,
    bericht: formData.get("bericht") as string,
  };

  // Validate
  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false,
      error: "Controleer de velden en probeer opnieuw.",
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = result.data;
  const behandelingLabel = data.behandeling
    ? treatmentLabels[data.behandeling] ?? data.behandeling
    : undefined;

  const emailFrom = process.env.EMAIL_FROM ?? "Gwyneth PMU <info@gwynethpmu.nl>";
  const emailTo = process.env.EMAIL_TO ?? "info@gwynethpmu.nl";

  const timestamp = new Date().toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  try {
    // Send confirmation to customer
    await resend.emails.send({
      from: emailFrom,
      to: data.email,
      subject: `Bedankt voor je bericht, ${data.naam}!`,
      react: ContactConfirmationEmail({
        naam: data.naam,
        behandeling: behandelingLabel,
        bericht: data.bericht,
      }),
    });

    // Send notification to business
    await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      replyTo: data.email,
      subject: `Nieuw contactbericht van ${data.naam}`,
      react: ContactNotificationEmail({
        naam: data.naam,
        email: data.email,
        telefoon: data.telefoon,
        behandeling: behandelingLabel,
        bericht: data.bericht,
        timestamp,
      }),
    });

    return { success: true };
  } catch (err) {
    console.error("Email sending failed:", err);
    return {
      success: false,
      error: "Er ging iets mis bij het versturen. Probeer het later opnieuw.",
    };
  }
}
