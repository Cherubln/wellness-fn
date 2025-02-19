import { Bubble } from "@typebot.io/nextjs";

const typebotUrl = process.env.NEXT_PUBLIC_TYPEBOT_LINK;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Bubble
        typebot={`${typebotUrl}`}
        previewMessage={{
          message: "We value your feedback !",
          autoShowDelay: 5000,
          avatarUrl:
            "https://s3.typebot.io/public/workspaces/cm0e2rygi001bjy9sb9r7l5sd/typebots/cm6epanxr0001mqnco92cqbd5/hostAvatar?v=1739523130990",
        }}
        theme={{
          button: { backgroundColor: "#2d7331", size: "medium" },
          previewMessage: {
            backgroundColor: "#2d7331",
            textColor: "#FFFFFF",
            closeButtonBackgroundColor: "#FFFFFF",
            closeButtonIconColor: "#598E71",
          },
        }}
      />
    </>
  );
}
