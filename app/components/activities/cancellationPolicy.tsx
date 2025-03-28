"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export const CollapsibleInfo = ({ addInfo }: { addInfo: string }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full  mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Important Information
      </h2>

      {/* Cancellation Policy */}
      <CollapsibleSection
        title="Cancellation Policy – Please Read Before You Book"
        sectionKey="cancellation"
        isOpen={openSection === "cancellation"}
        toggleSection={toggleSection}
      >
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            We understand that plans can change! Here’s what you need to know
            about canceling your booking:
          </p>

          <PolicyCard
            icon="📅"
            title="Full Refund (48+ Hours Before)"
            bgColor="bg-green-100"
            borderColor="border-green-500"
            textColor="text-green-700"
          >
            Cancel at least <strong>48 hours before</strong> your activity for a{" "}
            <strong>100% refund</strong>—no questions asked!
          </PolicyCard>

          <PolicyCard
            icon="🔄"
            title="Partial Refund (24-48 Hours Before)"
            bgColor="bg-yellow-100"
            borderColor="border-yellow-500"
            textColor="text-yellow-700"
          >
            Cancel between <strong>24 and 48 hours</strong> before the activity
            and receive a <strong>50% refund</strong>.
          </PolicyCard>

          <PolicyCard
            icon="❌"
            title="No Refund (Less Than 24 Hours)"
            bgColor="bg-red-100"
            borderColor="border-red-500"
            textColor="text-red-700"
          >
            If you cancel <strong>less than 24 hours</strong> before or{" "}
            <strong>don’t show up</strong>, we won’t be able to provide a
            refund.
          </PolicyCard>

          <PolicyCard
            icon="📧"
            title="How to Cancel"
            bgColor="bg-blue-100"
            borderColor="border-blue-500"
            textColor="text-blue-700"
          >
            Cancel through our platform or contact us at:
            <br />
            📧{" "}
            <a
              href="mailto:support@apertacura.com"
              className="text-blue-600 underline"
            >
              support@apertacura.com
            </a>
            <br />
            📞 <span className="text-gray-900">+254 728 981 298</span>
          </PolicyCard>

          <PolicyCard
            icon="💳"
            title="Refund Processing"
            bgColor="bg-purple-100"
            borderColor="border-purple-500"
            textColor="text-purple-700"
          >
            If eligible, refunds will be processed within{" "}
            <strong>7 business days</strong> using your original payment method.
          </PolicyCard>

          <PolicyCard
            icon="🚨"
            title="Special Cases"
            bgColor="bg-gray-100"
            borderColor="border-gray-500"
            textColor="text-gray-700"
          >
            Emergencies happen! If you have special circumstances, let us
            know—we’ll do our best to help.
          </PolicyCard>

          <p className="text-gray-600 text-center mt-4">
            By proceeding, you agree to these terms.{" "}
            <span className="font-semibold text-black">Happy booking! 😊</span>
          </p>
        </div>
      </CollapsibleSection>

      {/* Additional Information */}
      {addInfo && (
        <CollapsibleSection
          title="Additional Information"
          sectionKey="additional"
          isOpen={openSection === "additional"}
          toggleSection={toggleSection}
        >
          <p className="text-gray-600 leading-relaxed">{addInfo}</p>
        </CollapsibleSection>
      )}
    </div>
  );
};

// ✅ Reusable Collapsible Section Component
export const CollapsibleSection = ({
  title,
  sectionKey,
  isOpen,
  toggleSection,
  children,
}: {
  title: string;
  sectionKey: string;
  isOpen: boolean;
  toggleSection: (section: string) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-4 border-b">
      <button
        className="flex justify-between items-center w-full font-semibold py-3 text-gray-700 focus:outline-none transition duration-200"
        onClick={() => toggleSection(sectionKey)}
        aria-expanded={isOpen}
      >
        {title}
        {isOpen ? (
          <FaChevronUp size={18} className="text-gray-500" />
        ) : (
          <FaChevronDown size={18} className="text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

// ✅ Reusable Policy Card Component
export const PolicyCard = ({
  icon,
  title,
  bgColor,
  borderColor,
  textColor,
  children,
}: {
  icon: string;
  title: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`p-4 bg-slate-50 border-x-4 ${borderColor} rounded-md`}>
      <h3 className={`font-semibold ${textColor}`}>
        {icon} {title}
      </h3>
      <p className="text-gray-700">{children}</p>
    </div>
  );
};
