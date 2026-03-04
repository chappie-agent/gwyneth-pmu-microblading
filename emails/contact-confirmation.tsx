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
