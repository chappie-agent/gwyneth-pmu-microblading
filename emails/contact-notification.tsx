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

      {/* Contact details */}
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
