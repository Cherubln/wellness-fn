import React from "react";

const Terms = () => {
  return (
    <>
      <div className="pt-6 px-4 sm:pt-8">
        <h1 className="font-bold pb-5 text-xl">
          FitBeat Concert Terms and Conditions
        </h1>
        <div>
          <p>
            Welcome to the FitBeat Concert! By participating in Fitbeat&apos;s
            points and rewards activities, you agree to the following terms and
            conditions, which outline important information about data usage,
            media rights, and participation guidelines.
          </p>
        </div>
        <h1 className="font-bold py-5">Consent for Media Usage</h1>
        <div className="pl-10">
          <ul className="list-disc flex flex-col gap-y-4">
            <li>
              By attending the FitBeat Concert, you consent to be photographed
              and filmed by the event organizers and partners, including
              ApertaCura.
            </li>
            <li>
              You agree that all images, videos, and other recordings taken
              during the event may be used in future promotional materials,
              social media, websites, and other media platforms by FitBeat,
              ApertaCura, and any event partners.
            </li>
            <li>
              You acknowledge that you will not receive compensation for the use
              of these media assets, which may include identifying you in
              photographs or videos.
            </li>
          </ul>
        </div>
        <h1 className="font-bold py-5">
          Data Collection and Processing for Points Redemption
        </h1>
        <div className="pl-10">
          <ul className="list-disc flex flex-col gap-y-4">
            <li>
              To participate in the concert&apos;s points and rewards system,
              you will be asked to provide personal information (e.g., name,
              email, contact number) during registration and when scanning QR
              codes at the event.
            </li>
            <li>
              The data collected will be processed solely for the purpose of
              tracking your participation and redeeming points earned through
              activities and QR code scans.
            </li>
            <li>
              All data will be handled securely and in compliance with relevant
              data protection laws. Data may be shared with ApertaCura&apos;s
              partners solely for purposes related to point tracking and rewards
              redemption.
            </li>
          </ul>
        </div>
        <h1 className="font-bold py-5">Points and Rewards System</h1>
        <div className="pl-10">
          <ul className="list-disc flex flex-col gap-y-4">
            <li>
              Participants may earn points through activities, including QR code
              scanning and event participation. Points are redeemable according
              to the specific terms outlined for each activity.
            </li>
            <li>
              Points and rewards cannot be exchanged for cash and are non-
              transferable. All rewards are subject to availability and any
              other conditions set by the event organizers or reward partners.
            </li>
          </ul>
        </div>
        <h1 className="font-bold py-5">
          Event Modifications and Cancellations
        </h1>
        <div className="pl-10">
          <ul className="list-disc flex flex-col gap-y-4">
            <li>
              FitBeat and ApertaCura reserve the right to modify or cancel any
              part of the event or these terms as necessary. Any updates will be
              communicated to participants in advance where possible.
            </li>
          </ul>
        </div>
        <div>
          <p className="py-5">
            By participating, you confirm that you have read, understood, and
            agreed to these terms and conditions. If you do not agree with any
            part of these terms, please refrain from participating in the point
            and reward activities.
          </p>
        </div>
      </div>
    </>
  );
};

export default Terms;
