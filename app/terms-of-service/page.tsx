import React from "react";

interface Subpoint {
  title: string;
  description: string;
}

interface Term {
  title: string;
  description?: string;
  subpoints?: Subpoint[];
}

const termsAndConditions: Term[] = [
  {
    title: "1. Introduction",
    description:
      "These Terms and Conditions (“Terms”) govern the participation of individuals (“Participants”) in ApertaCura’s Biggest Health Challenge (“BHC”). By registering for and participating in the BHC, Participants agree to comply with these Terms and all applicable laws and regulations.",
  },
  {
    title: "2. Eligibility",
    subpoints: [
      {
        title: "2.1 Age Requirement",
        description:
          "Participants must be at least 18 years of age to register and participate.",
      },
      {
        title: "2.2 Fitness Level",
        description:
          "Participants are responsible for assessing their own physical fitness and health condition before engaging in any activities related to the BHC.",
      },
      {
        title: "2.3 Registration",
        description:
          "Participation is subject to successful registration through ApertaCura’s designated platform and acceptance of these Terms.",
      },
    ],
  },
  {
    title: "3. Participation Requirements",
    subpoints: [
      {
        title: "3.1 Adherence to Challenge Rules",
        description:
          "Participants must follow all rules and instructions provided by ApertaCura and its authorized service providers.",
      },
      {
        title: "3.2 Accurate Information",
        description:
          "Participants must provide truthful and accurate information during registration and throughout the BHC.",
      },
      {
        title: "3.3 Use of QR Codes",
        description:
          "Participants must scan QR codes at service provider locations to earn points for eligible activities.",
      },
      {
        title: "3.4 Fair Participation",
        description:
          "Participants shall not engage in fraudulent or dishonest activities, including but not limited to falsifying activity records or scanning QR codes without completing the associated activities.",
      },
      {
        title: "3.5 Voluntary Participation",
        description:
          "Participation in any BHC activities is purely voluntary. Participants may delete their accounts without prior notice to ApertaCura. Upon deletion, Participants must register afresh to rejoin the challenge and cannot claim previously earned points.",
      },
    ],
  },
  {
    title: "4. Health and Safety",
    subpoints: [
      {
        title: "4.1 Personal Responsibility",
        description:
          "Participants acknowledge that participation in wellness and fitness activities involves inherent risks. Participants are solely responsible for their safety and well-being.",
      },
      {
        title: "4.2 Medical Conditions",
        description:
          "Participants with pre-existing medical conditions should seek medical advice before engaging in the BHC activities.",
      },
      {
        title: "4.3 Emergency Situations",
        description:
          "Participants must follow all safety protocols and emergency procedures at service provider premises.",
      },
    ],
  },
  {
    title: "5. Points and Rewards",
    subpoints: [
      {
        title: "5.1 Earning Points",
        description:
          "Points are awarded for completing eligible activities as verified by QR code scans.",
      },
      {
        title: "5.2 Redemption",
        description:
          "Points may be redeemed for rewards as specified by ApertaCura. Rewards are subject to availability and specific terms.",
      },
      {
        title: "5.3 Non-Transferability",
        description:
          "Points are non-transferable and cannot be exchanged for cash.",
      },
      {
        title: "5.4 Fraudulent Activity",
        description:
          "ApertaCura reserves the right to revoke points and disqualify Participants found engaging in fraudulent activities.",
      },
      {
        title: "5.5 Challenge Duration and Points Expiry",
        description:
          "The BHC ends on December 31 each year. Points do not carry over to the following year.",
      },
    ],
  },
  {
    title: "6. Data Protection and Privacy",
    subpoints: [
      {
        title: "6.1 Data Collection",
        description:
          "Participants consent to the collection and processing of their personal data for the purpose of administering the BHC.",
      },
      {
        title: "6.2 Data Usage",
        description:
          "ApertaCura may use aggregated and anonymized data for research and marketing purposes.",
      },
      {
        title: "6.3 Data Security",
        description:
          "ApertaCura will implement reasonable measures to protect Participants’ personal data.",
      },
    ],
  },
  {
    title: "7. Limitation of Liability",
    subpoints: [
      {
        title: "7.1 General Disclaimer",
        description:
          "ApertaCura and its affiliates shall not be liable for any direct, indirect, incidental, or consequential damages arising from participation in the BHC.",
      },
      {
        title: "7.2 Service Provider Liability",
        description:
          "ApertaCura is not responsible for the acts or omissions of service providers participating in the BHC.",
      },
      {
        title: "7.3 Force Majeure",
        description:
          "ApertaCura shall not be held liable for failure to perform its obligations due to events beyond its reasonable control.",
      },
    ],
  },
  {
    title: "8. Disqualification and Termination",
    subpoints: [
      {
        title: "8.1 Violation of Terms",
        description:
          "ApertaCura reserves the right to disqualify Participants who violate these Terms or engage in fraudulent activities.",
      },
      {
        title: "8.2 Withdrawal",
        description:
          "Participants may withdraw from the BHC without any notice to ApertaCura.",
      },
    ],
  },
  {
    title: "9. Dispute Resolution",
    subpoints: [
      {
        title: "9.1 Good Faith Negotiations",
        description:
          "Parties agree to attempt to resolve disputes amicably through good faith negotiations.",
      },
      {
        title: "9.2 Arbitration",
        description:
          "If negotiations fail, disputes shall be resolved through binding arbitration under the Laws of Kenya, with the venue in Nairobi.",
      },
    ],
  },
  {
    title: "10. Amendments and Notices",
    subpoints: [
      {
        title: "10.1 Amendments",
        description:
          "ApertaCura reserves the right to amend these Terms at any time. Participants will be notified of material changes.",
      },
      {
        title: "10.2 Notices",
        description:
          "Notices regarding the BHC will be communicated through official channels, including email and the ApertaCura platform.",
      },
    ],
  },
  {
    title: "11. Governing Law",
    description:
      "These Terms shall be governed by and construed in accordance with the laws of Kenya.",
  },
  {
    title: "12. Declaration",
    description:
      "By registering for and participating in ApertaCura’s Biggest Health Challenge, Participants declare that they have read, understood, and agree to be bound by these Terms and Conditions.",
  },
];

const Terms: React.FC = () => {
  return (
    <section className="w-full xl:w-4/5 mx-auto bg-white shadow-md rounded-lg">
      <div className="bg-slate-100 p-8">
        <h1 className=" text-2xl xl:text-4xl font-bold mb-6 text-center">
          Terms & Conditions for Participants in ApertaCura's Biggest Health
          Challenge (BHC)
        </h1>
        <p className="text-gray-500 text-sm text-center">
          Effective Date: January 01, 2025,
          <br />
          Last Updated Date: February 03, 2025
        </p>
      </div>
      <div className="py-8 px-12">
        <div className="space-y-6">
          {termsAndConditions.map((term, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold mb-2">{term.title}</h2>
              {term.description && (
                <p className="text-gray-700">{term.description}</p>
              )}
              {term.subpoints && (
                <ul className="pl-4 text-gray-800 mt-3">
                  {term.subpoints.map((subpoint, i) => (
                    <li key={i} className="pb-2">
                      <span className="font-semibold">{subpoint.title}:</span>{" "}
                      {subpoint.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Terms;
