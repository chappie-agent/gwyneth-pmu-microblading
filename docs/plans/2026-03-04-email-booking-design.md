# Email System + Booking Integration Design

**Date:** 2026-03-04
**Status:** Approved

## Overview

Add functional email handling to the contact form using Resend + React Email, and integrate Cal.com for direct online booking. All credentials and addresses are configurable via environment variables.

## Environment Variables

```
# Email (Resend)
RESEND_API_KEY=re_xxx                    # Resend API key
EMAIL_FROM=info@socialsprint.nl          # Sender address (verified domain)
EMAIL_TO=info@socialsprint.nl            # Recipient for notification emails

# Booking (Cal.com)
NEXT_PUBLIC_CALCOM_USERNAME=elwyndeneve  # Cal.com username for embed
```

## Part 1: Contact Form Email System

### Architecture

- **Server Action** (`actions/contact.ts`) handles form submission
- **Zod** schema for server-side validation
- **Resend** SDK sends emails
- **React Email** templates for branded HTML emails

### Email Flow

```
Client submits contact form
  -> Client-side validation (required fields)
  -> Server Action sendContactEmail(formData)
    -> Validate with Zod schema
    -> Resend.emails.send() -> confirmation to customer
    -> Resend.emails.send() -> notification to business owner
    -> Return { success: true } or { error: "..." }
  -> Show success message or error in form
```

### Email Templates

**Confirmation to customer (`emails/contact-confirmation.tsx`):**
- Header with "Gwyneth PMU" branding (accent colors matching website)
- "Bedankt voor je bericht, [naam]!"
- Summary of submitted treatment + message
- "We nemen zo snel mogelijk contact met je op"
- Footer with contact details + social links

**Notification to business (`emails/contact-notification.tsx`):**
- "Nieuw contactbericht ontvangen"
- All fields: naam, telefoon, email, behandeling, bericht
- Reply-To set to customer's email address

**Shared layout (`emails/components/email-layout.tsx`):**
- Gwyneth PMU header with logo/text
- Consistent color scheme (accent, linen, cream tones)
- Footer with address, phone, social links
- Responsive design

### Contact Form UX Updates

- Loading state on submit button
- Success message after sending (green checkmark + text)
- Error message on failure (red, retry option)
- Form resets after successful submission

## Part 2: Booking Page (Cal.com + Treatwell)

### Architecture

- **`@calcom/embed-react`** for inline Cal.com widget
- Custom wrapper component with website theming
- Treatment selection (step 1) remains custom UI
- Cal.com handles date/time + personal details (step 2-3)

### Booking Flow

```
User visits /boeken
  -> Step 1: Custom treatment cards (existing design)
  -> User selects treatment
  -> Cal.com embed opens for that event type
  -> Cal.com handles scheduling + confirmation
```

### Cal.com Theming

- Brand color: accent color from website
- Background: linen/cream tones
- Border radius: matching site radius
- Font: match website body font where possible

### Treatwell Fallback

- "Liever boeken via Treatwell?" link remains as alternative
- Treatwell URL stored as env var: `NEXT_PUBLIC_TREATWELL_URL`

## New Files

| File | Purpose |
|------|---------|
| `actions/contact.ts` | Server Action: validation + Resend |
| `emails/contact-confirmation.tsx` | React Email: customer confirmation |
| `emails/contact-notification.tsx` | React Email: business notification |
| `emails/components/email-layout.tsx` | Shared email layout with branding |
| `components/booking/cal-embed.tsx` | Cal.com embed wrapper with theming |

## Modified Files

| File | Changes |
|------|---------|
| `components/sections/contact-section.tsx` | Form submission logic, loading/success/error states |
| `app/boeken/booking-form.tsx` | Replace steps 2-3 with Cal.com embed |
| `.env.local` | Add email + booking env vars |
| `package.json` | Add resend, @react-email/components, @calcom/embed-react |

## Dependencies to Install

- `resend` - Email sending API
- `@react-email/components` - React Email component library
- `@calcom/embed-react` - Cal.com embed for React
- `zod` - Schema validation for form data
