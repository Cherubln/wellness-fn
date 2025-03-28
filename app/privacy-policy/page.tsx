import React from "react";

const DataProtectionPolicy = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-[80%] mx-auto">
      <div className="bg-slate-100 p-8">
        <h1 className="text-2xl xl:text-4xl font-bold text-gray-800 mb-6 text-center">
          ApertaCura Data Protection and Privacy Policy
        </h1>
      </div>
      <div className="py-6 px-12">
        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-800">
            ApertaCura ("we," "us," or "our") is committed to protecting the
            privacy and security of the personal data we collect from our users.
            This Data Protection and Privacy Policy outlines how we collect,
            use, store, and protect personal data in accordance with global data
            protection standards, including the General Data Protection
            Regulation (GDPR), and Rwandan laws, including Law No. 058/2021 of
            13/10/2021 Relating to the Protection of Personal Data and Privacy.
          </p>
        </section>

        {/* 2. Scope */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">2. Scope</h2>
          <p className="text-gray-800">
            This policy applies to all personal data processed by ApertaCura,
            including data collected through our digital wellness platform,
            associated mobile and web applications, and any other services we
            offer. It applies to all users of our services, including
            individuals, insurance companies, healthcare providers, and any
            other partners.
          </p>
        </section>

        {/* 3. Data Collection */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">3. Data Collection</h2>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            3.1 Types of Data Collected
          </h3>
          <p className="py-2">
            We may collect the following types of personal data:
          </p>
          <ul className="list-disc list-outside pl-6 text-gray-800">
            <li>
              <strong>Personal Identification Information:</strong> Name, email
              address, phone number, date of birth, gender.
            </li>
            <li>
              <strong>Health Data:</strong> Medical history, fitness activity,
              dietary habits, chronic conditions, medication adherence.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact
              with our platform, including device information, IP addresses, and
              browsing behavior.
            </li>
            <li>
              <strong>Communications Data:</strong> Any data exchanged through
              our WhatsApp API or other communication channels.
            </li>
          </ul>

          <h3 className="text-xl font-medium text-gray-800 mt-4">
            3.2 Data Collection Methods
          </h3>
          <p className="py-2">We collect data through:</p>
          <ul className="list-disc list-outside pl-6 text-gray-800">
            <li>
              <strong>Direct interactions:</strong> Information provided
              directly by users through forms, surveys, or communications.
            </li>
            <li>
              <strong>Automated technologies:</strong> Data collected through
              cookies, server logs, and similar tracking technologies.
            </li>
            <li>
              <strong>Third-party sources:</strong> Information obtained from
              insurance companies, healthcare providers, and other partners.
            </li>
          </ul>
        </section>

        {/* 4. Legal Basis for Data Processing */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            4. Legal Basis for Data Processing
          </h2>
          <p className="py-2">
            We process personal data based on the following legal grounds:
          </p>
          <ul className="list-disc list-outside pl-6 text-gray-800">
            <li>
              <strong>Consent:</strong> We obtain explicit consent from users
              before collecting or processing their personal data.
            </li>
            <li>
              <strong>Contractual Obligations:</strong> Data processing is
              necessary to fulfill the services we offer, such as providing
              personalized health recommendations.
            </li>
            <li>
              <strong>Legal Compliance:</strong> We process data to comply with
              legal obligations under Rwandan law and other applicable
              regulations.
            </li>
            <li>
              <strong>Legitimate Interests:</strong> We may process data to
              pursue our legitimate business interests, provided that such
              interests do not override the rights and freedoms of the data
              subjects.
            </li>
          </ul>
        </section>

        {/* 5. Use of Personal Data */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            5. Use of Personal Data
          </h2>
          <p className="py-2">
            We use personal data for the following purposes:
          </p>
          <ul className="list-disc list-outside pl-6 text-gray-800">
            <li>
              <strong>Service Delivery:</strong> To provide, personalize, and
              improve our wellness services, including health tracking, fitness
              plans, and preventive care strategies.
            </li>
            <li>
              <strong>Communication:</strong> To communicate with users, respond
              to inquiries, and provide customer support.
            </li>
            <li>
              <strong>Analytics:</strong> To analyze user behavior, improve our
              platform, and develop new features.
            </li>
            <li>
              <strong>Compliance:</strong> To ensure compliance with legal and
              regulatory requirements, including reporting obligations.
            </li>
            <li>
              <strong>Security:</strong> To protect the integrity and security
              of our platform and user data.
            </li>
          </ul>
        </section>

        {/* 6. Data Sharing and Disclosure */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            6. Data Sharing and Disclosure
          </h2>
          <p className="py-2">
            We may share personal data with third parties under the following
            circumstances:
          </p>
          <ul className="list-disc list-outside pl-6 text-gray-800">
            <li>
              <strong>With User Consent:</strong> We will share personal data
              with third parties when we have the user's explicit consent.
            </li>
            <li>
              <strong>Service Providers:</strong> We may share data with trusted
              third-party service providers who assist us in operating our
              platform, provided they adhere to strict data protection
              standards.
            </li>
            <li>
              <strong>Legal Obligations:</strong> We may disclose personal data
              to comply with legal obligations, including requests from law
              enforcement or regulatory authorities.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of assets, personal data may be transferred
              to the new owner, subject to this policy's terms.
            </li>
          </ul>
        </section>

        {/* 7. Data Security */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">7. Data Security</h2>
          <p className="py-2">
            We implement robust security measures to protect personal data from
            unauthorized access, alteration, disclosure, or destruction. These
            measures include:
          </p>
          <ul className="list-disc list-outside pl-6 text-gray-800">
            <li>
              <strong>Encryption:</strong> We use encryption protocols to secure
              data in transit and at rest.
            </li>
            <li>
              <strong>Access Controls:</strong> We restrict access to personal
              data to authorized personnel only.
            </li>
            <li>
              <strong>Regular Audits:</strong> We conduct regular security
              audits to identify and address potential vulnerabilities.
            </li>
            <li>
              <strong>Data Minimization:</strong> We collect and retain only the
              minimum amount of data necessary for our purposes.
            </li>
          </ul>
        </section>

        {/* 8. Data Retention */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
          <p className="text-gray-800">
            We retain personal data only for as long as necessary to fulfill the
            purposes outlined in this policy, or as required by law. Once the
            data is no longer needed, we will securely delete or anonymize it.
          </p>
        </section>

        {/* 9. User Rights */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            9. Data Subject Rights
          </h2>
          <p className="py-2">
            Users have the following rights regarding their personal data:
          </p>
          <ul className="list-disc list-outside pl-6 text-gray-800">
            <li>
              <strong>Right to Access:</strong>Users can request access to their
              personal data and obtain a copy.
            </li>
            <li>
              <strong>Right to Rectification:</strong>Users can request
              corrections to any inaccurate or incomplete data.
            </li>
            <li>
              <strong>Right to Erasure:</strong>Users can request the deletion
              of their personal data under certain conditions.
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong>Users can request
              the restriction of data processing in specific circumstances.
            </li>
            <li>
              <strong>Right to Data Portability:</strong>Users can request their
              data in a structured, commonly used, and machine-readable format.
            </li>
            <li>
              <strong>Right to Object:</strong>Users can object to the
              processing of their data for certain purposes.
            </li>
          </ul>
          <p className="text-gray-800 mt-4">
            Users can exercise these rights by contacting us at{" "}
            <a href="mailto:info@apertacura.com" className="text-blue-500">
              info@apertacura.com
            </a>
            .
          </p>
        </section>

        {/* 10. International Data Transfers */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            10. International Data Transfers
          </h2>
          <p className="text-gray-800">
            If personal data is transferred outside of Rwanda, we will ensure
            that it is protected in accordance with this policy and applicable
            data protection laws. We will only transfer data to countries that
            provide an adequate level of data protection or where appropriate
            safeguards are in place.
          </p>
        </section>

        {/* 11. Updates & Contact */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">11. Changes & Contact</h2>
          <p className="text-gray-800">
            We may update this policy from time to time to reflect changes in
            our practices or legal requirements. Any updates will be posted on
            our website, and users will be notified of significant changes.
            <br />
            If you have any questions or concerns about this policy or our data
            protection practices, please contact us at:
          </p>
          <p className="text-gray-800">
            <strong>Email:</strong> info@apertacura.com
          </p>
          <p className="text-gray-800">
            <strong>Address 1:</strong> Norrsken House, Kigali, Rwanda
            <br/>
            <strong>Address 2:</strong> Kamburu Drive, Building: Pine Tree Plaza,
            Nairobi Kenya
          </p>
        </section>
      </div>
    </div>
  );
};

export default DataProtectionPolicy;
