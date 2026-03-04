# Email System + Booking Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add functional email handling to the contact form via Resend + React Email, and integrate Cal.com for direct online booking.

**Architecture:** Server Action for contact form → Zod validation → Resend sends 2 emails (confirmation + notification) using React Email templates. Booking page uses `@calcom/embed-react` inline widget with custom theming. All credentials/addresses via env vars.

**Tech Stack:** Resend, @react-email/components, @calcom/embed-react, Zod, Next.js Server Actions

---

### Task 1: Install Dependencies + Environment Variables

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `.env.local`

**Step 1: Install npm packages**

Run:
```bash
cd /Users/elwyndeneve/Development/gwyneth-pmu-microblading/gwyneth-pmu && npm install resend @react-email/components @calcom/embed-react zod
```

**Step 2: Add environment variables to `.env.local`**

Append to `.env.local`:
```
# Email (Resend)
RESEND_API_KEY=re_Tu9Harc7_DLDteL6UqunDyHjvf9Rtes7Z
EMAIL_FROM=Gwyneth PMU <info@socialsprint.nl>
EMAIL_TO=info@socialsprint.nl

# Booking (Cal.com)
NEXT_PUBLIC_CALCOM_USERNAME=elwyndeneve

# Treatwell fallback
NEXT_PUBLIC_TREATWELL_URL=https://www.treatwell.nl/salon/gwyneth-pmu/
```

**Step 3: Verify dev server still starts**

Run: `npx next build` (quick typecheck)
Expected: Build passes (no new code yet)

**Step 4: Commit**

```bash
git add package.json package-lock.json .env.local
git commit -m "chore: install resend, react-email, cal.com embed, zod"
```

---

### Task 2: Create Shared Email Layout

**Files:**
- Create: `emails/components/email-layout.tsx`

**Step 1: Create the shared email layout component**

This layout wraps all email templates with consistent Gwyneth PMU branding. Uses the site's accent/linen/cream color palette.

```tsx
// emails/components/email-layout.tsx
import {
  Html,
  Head,
  Body,
  Preview,
  Tailwind,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Img,
} from "@react-email/components";

interface EmailLayoutProps {
  preview: string;
  children: React.ReactNode;
}

// Brand colors matching the Gwyneth PMU website
const colors = {
  accent: "#A0845C",       // warm gold
  accentLight: "#B89B6E",
  linen: "#F0EAE0",        // light warm background
  cream: "#FAF7F2",
  dark: "#2A2827",
  taupe: "#8A7E72",
  white: "#FAFAF8",
};

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html lang="nl">
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body style={{ backgroundColor: colors.linen, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0, padding: 0 }}>
          <Container style={{ maxWidth: "580px", margin: "0 auto", padding: "40px 20px" }}>
            {/* Header */}
            <Section style={{ textAlign: "center" as const, paddingBottom: "32px" }}>
              <Text style={{ fontSize: "24px", fontWeight: 300, color: colors.dark, margin: 0, letterSpacing: "0.02em" }}>
                Gwyneth PMU
              </Text>
              <Text style={{ fontSize: "10px", textTransform: "uppercase" as const, letterSpacing: "0.3em", color: colors.taupe, margin: "4px 0 0" }}>
                Microblading
              </Text>
            </Section>

            {/* Main content card */}
            <Section style={{ backgroundColor: colors.white, borderRadius: "12px", padding: "40px 32px", border: `1px solid ${colors.linen}` }}>
              {children}
            </Section>

            {/* Footer */}
            <Section style={{ textAlign: "center" as const, paddingTop: "32px" }}>
              <Hr style={{ borderColor: "#E0D8CE", margin: "0 0 24px" }} />
              <Text style={{ fontSize: "13px", color: colors.taupe, margin: "0 0 4px" }}>
                Gwyneth PMU — Permanente Make-up Specialist
              </Text>
              <Text style={{ fontSize: "12px", color: colors.taupe, margin: "0 0 4px" }}>
                Hekendorpstraat 54, 2727 CL Zoetermeer
              </Text>
              <Text style={{ fontSize: "12px", color: colors.taupe, margin: "0 0 16px" }}>
                +31 6 12 34 56 78
              </Text>
              <Section>
                <Link href="https://instagram.com/gwynethpmu" style={{ fontSize: "12px", color: colors.accent, textDecoration: "none", marginRight: "16px" }}>
                  Instagram
                </Link>
                <Link href="https://facebook.com/gwynethpmu" style={{ fontSize: "12px", color: colors.accent, textDecoration: "none" }}>
                  Facebook
                </Link>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit`
Expected: No errors related to email-layout.tsx

---

### Task 3: Create Contact Confirmation Email Template

**Files:**
- Create: `emails/contact-confirmation.tsx`

**Step 1: Create the customer confirmation email template**

```tsx
// emails/contact-confirmation.tsx
import { Heading, Text, Hr, Section } from "@react-email/components";
import { EmailLayout } from "./components/email-layout";

interface ContactConfirmationProps {
  naam: string;
  behandeling?: string;
  bericht?: string;
}

const accent = "#A0845C";
const taupe = "#8A7E72";

export function ContactConfirmationEmail({ naam, behandeling, bericht }: ContactConfirmationProps) {
  return (
    <EmailLayout preview={`Bedankt voor je bericht, ${naam}!`}>
      <Heading style={{ fontSize: "22px", fontWeight: 300, color: "#2A2827", margin: "0 0 8px" }}>
        Bedankt voor je bericht, {naam}!
      </Heading>
      <Text style={{ fontSize: "14px", color: taupe, lineHeight: "1.6", margin: "0 0 24px" }}>
        We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.
        Meestal reageren we binnen 24 uur.
      </Text>

      {(behandeling || bericht) && (
        <>
          <Hr style={{ borderColor: "#E0D8CE", margin: "0 0 24px" }} />
          <Text style={{ fontSize: "10px", textTransform: "uppercase" as const, letterSpacing: "0.2em", color: taupe, margin: "0 0 12px" }}>
            Jouw Bericht
          </Text>
          {behandeling && (
            <Section style={{ marginBottom: "8px" }}>
              <Text style={{ fontSize: "13px", color: taupe, margin: "0 0 2px" }}>Behandeling:</Text>
              <Text style={{ fontSize: "14px", color: "#2A2827", margin: 0 }}>{behandeling}</Text>
            </Section>
          )}
          {bericht && (
            <Section>
              <Text style={{ fontSize: "13px", color: taupe, margin: "0 0 2px" }}>Bericht:</Text>
              <Text style={{ fontSize: "14px", color: "#2A2827", margin: 0, lineHeight: "1.5" }}>{bericht}</Text>
            </Section>
          )}
        </>
      )}

      <Hr style={{ borderColor: "#E0D8CE", margin: "24px 0" }} />
      <Text style={{ fontSize: "13px", color: taupe, lineHeight: "1.6", margin: 0 }}>
        Heb je ondertussen vragen? Je kunt ons altijd bereiken via telefoon of e-mail.
      </Text>
      <Text style={{ fontSize: "16px", fontStyle: "italic", color: accent, margin: "24px 0 0" }}>
        — Gwyneth
      </Text>
    </EmailLayout>
  );
}

ContactConfirmationEmail.PreviewProps = {
  naam: "Sophie",
  behandeling: "Microblading",
  bericht: "Ik wil graag meer weten over de mogelijkheden.",
} as ContactConfirmationProps;

export default ContactConfirmationEmail;
```

---

### Task 4: Create Contact Notification Email Template

**Files:**
- Create: `emails/contact-notification.tsx`

**Step 1: Create the business notification email template**

```tsx
// emails/contact-notification.tsx
import { Heading, Text, Hr, Section } from "@react-email/components";
import { EmailLayout } from "./components/email-layout";

interface ContactNotificationProps {
  naam: string;
  email: string;
  telefoon?: string;
  behandeling?: string;
  bericht?: string;
  timestamp: string;
}

const taupe = "#8A7E72";

export function ContactNotificationEmail({
  naam,
  email,
  telefoon,
  behandeling,
  bericht,
  timestamp,
}: ContactNotificationProps) {
  return (
    <EmailLayout preview={`Nieuw contactbericht van ${naam}`}>
      <Heading style={{ fontSize: "20px", fontWeight: 300, color: "#2A2827", margin: "0 0 4px" }}>
        Nieuw Contactbericht
      </Heading>
      <Text style={{ fontSize: "12px", color: taupe, margin: "0 0 24px" }}>
        Ontvangen op {timestamp}
      </Text>

      <Hr style={{ borderColor: "#E0D8CE", margin: "0 0 20px" }} />

      {/* Contact details table */}
      <Section style={{ marginBottom: "8px" }}>
        <Text style={{ fontSize: "13px", color: taupe, margin: "0 0 2px" }}>Naam:</Text>
        <Text style={{ fontSize: "15px", color: "#2A2827", margin: "0 0 16px", fontWeight: 500 }}>{naam}</Text>
      </Section>

      <Section style={{ marginBottom: "8px" }}>
        <Text style={{ fontSize: "13px", color: taupe, margin: "0 0 2px" }}>E-mail:</Text>
        <Text style={{ fontSize: "15px", color: "#2A2827", margin: "0 0 16px" }}>{email}</Text>
      </Section>

      {telefoon && (
        <Section style={{ marginBottom: "8px" }}>
          <Text style={{ fontSize: "13px", color: taupe, margin: "0 0 2px" }}>Telefoon:</Text>
          <Text style={{ fontSize: "15px", color: "#2A2827", margin: "0 0 16px" }}>{telefoon}</Text>
        </Section>
      )}

      {behandeling && (
        <Section style={{ marginBottom: "8px" }}>
          <Text style={{ fontSize: "13px", color: taupe, margin: "0 0 2px" }}>Behandeling:</Text>
          <Text style={{ fontSize: "15px", color: "#2A2827", margin: "0 0 16px" }}>{behandeling}</Text>
        </Section>
      )}

      {bericht && (
        <>
          <Hr style={{ borderColor: "#E0D8CE", margin: "8px 0 20px" }} />
          <Text style={{ fontSize: "13px", color: taupe, margin: "0 0 4px" }}>Bericht:</Text>
          <Text style={{ fontSize: "14px", color: "#2A2827", margin: 0, lineHeight: "1.6", whiteSpace: "pre-wrap" as const }}>
            {bericht}
          </Text>
        </>
      )}
    </EmailLayout>
  );
}

ContactNotificationEmail.PreviewProps = {
  naam: "Sophie de Vries",
  email: "sophie@example.nl",
  telefoon: "+31 6 98 76 54 32",
  behandeling: "Microblading",
  bericht: "Hallo! Ik zou graag een afspraak willen maken voor microblading. Zijn er nog plekken beschikbaar in maart?",
  timestamp: "4 maart 2026, 14:32",
} as ContactNotificationProps;

export default ContactNotificationEmail;
```

---

### Task 5: Create Contact Server Action with Zod Validation

**Files:**
- Create: `actions/contact.ts`

**Step 1: Create the server action**

```tsx
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

  const emailFrom = process.env.EMAIL_FROM ?? "Gwyneth PMU <info@socialsprint.nl>";
  const emailTo = process.env.EMAIL_TO ?? "info@socialsprint.nl";

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
```

**Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit`
Expected: No errors

---

### Task 6: Update Contact Form with Submission Logic

**Files:**
- Modify: `components/sections/contact-section.tsx`

**Step 1: Rewrite contact-section.tsx**

Key changes:
- Add `useActionState` hook for the Server Action
- Add `name` attributes to all form inputs (required for FormData)
- Add loading state (pending) on submit button
- Add success message after send
- Add error display for validation / send failures
- Import `sendContactEmail` action
- Keep all existing styling and layout intact

The full updated component replaces the form's `onSubmit={(e) => e.preventDefault()}` with the real Server Action, adds `name` attributes to inputs, and adds success/error states below the form.

Critical details:
- Use `useActionState` from `react` (Next.js 16 / React 19)
- Form uses `action={formAction}` instead of `onSubmit`
- Button shows "Versturen..." + disabled while pending
- Success state replaces form with green checkmark + message
- Error state shows red message above submit button
- Add `required` to naam, email, bericht fields
- Add `name` prop to every input/select/textarea matching the Zod schema field names

---

### Task 7: Create Cal.com Embed + Update Booking Page

**Files:**
- Create: `components/booking/cal-embed.tsx`
- Modify: `app/boeken/booking-form.tsx`

**Step 1: Create Cal.com embed wrapper**

```tsx
// components/booking/cal-embed.tsx
"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalEmbedProps {
  /** Cal.com event type slug, e.g. "microblading" */
  calLink: string;
  className?: string;
}

export function CalEmbed({ calLink, className }: CalEmbedProps) {
  const username = process.env.NEXT_PUBLIC_CALCOM_USERNAME ?? "elwyndeneve";

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: {
          branding: { brandColor: "#A0845C" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      calLink={`${username}/${calLink}`}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
      className={className}
    />
  );
}
```

**Step 2: Update booking-form.tsx**

Key changes:
- When a treatment is selected, show the Cal.com embed for that treatment's event type instead of steps 2 + 3
- Remove the placeholder date selector and personal details form
- Add a "Liever boeken via Treatwell?" link below the embed
- Keep step 1 (treatment selection cards) exactly as-is

The flow becomes:
1. User sees treatment cards (existing design, untouched)
2. User clicks a treatment → Cal.com embed appears below with that event type
3. Below the embed: "Liever boeken via Treatwell?" text link

The `placeholderDates` array, step 2 date buttons, step 3 form inputs, and the "Boek Nu" button are all removed and replaced with the `CalEmbed` component.

---

### Task 8: Build Verification + Commit

**Step 1: Add env vars to Vercel**

**CRITICAL:** Before pushing, the user must add these env vars to Vercel:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = `5ifzz9k4`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `NEXT_PUBLIC_SANITY_API_VERSION` = `2025-03-04`
- `SANITY_API_READ_TOKEN` = (the token from .env.local)
- `RESEND_API_KEY` = (the Resend key)
- `EMAIL_FROM` = `Gwyneth PMU <info@socialsprint.nl>`
- `EMAIL_TO` = `info@socialsprint.nl`
- `NEXT_PUBLIC_CALCOM_USERNAME` = `elwyndeneve`
- `NEXT_PUBLIC_TREATWELL_URL` = `https://www.treatwell.nl/salon/gwyneth-pmu/`

**Step 2: Run local build**

Run: `npx next build`
Expected: Build passes with all pages

**Step 3: Test contact form manually**

1. Start dev server: `npm run dev`
2. Go to `/contact`
3. Fill out the form and submit
4. Verify: loading state on button
5. Verify: success message appears
6. Check email inbox for both confirmation and notification

**Step 4: Test booking page manually**

1. Go to `/boeken`
2. Click a treatment card
3. Verify: Cal.com embed appears
4. Verify: Treatwell link is visible

**Step 5: Commit all changes**

```bash
git add actions/ emails/ components/booking/ components/sections/contact-section.tsx app/boeken/booking-form.tsx
git commit -m "feat: add Resend email system for contact form + Cal.com booking integration"
```

**Step 6: Push to remote**

```bash
git push origin main
```
