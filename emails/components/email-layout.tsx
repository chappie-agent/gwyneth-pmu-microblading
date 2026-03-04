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
