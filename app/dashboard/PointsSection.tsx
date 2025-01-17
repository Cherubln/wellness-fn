import React from "react";
import CountUp from "react-countup";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import {} from "react-icons/fa";
// import { AppDispatch, RootState } from "../store";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createQRCode,
//   IServiceProvider,
//   updateQRCode,
// } from "../store/slices/authSlice";

interface BalanceSectionProps {
  user: {
    points?: number;
    qrCode?: {
      image: string;
    };
  };
  isServiceExist: boolean;
}

const PointsSection: React.FC<BalanceSectionProps> = ({
  user,
  isServiceExist,
}) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const dispatch = useDispatch<AppDispatch>();
  // const auth = useSelector((state: RootState) => state.auth);

  // const handleGenerate = async () => {
  //   setIsLoading(true);
  //   if ((auth.user as IServiceProvider).qrCode?.image) {
  //     await dispatch(
  //       updateQRCode({
  //         qrCodeId: (auth.user as IServiceProvider).qrCode!._id,
  //         qrCodeData: {
  //           name: (auth.user as IServiceProvider).qrCode!.name,
  //           owner: (auth.user as IServiceProvider).qrCode!.owner,
  //         },
  //       })
  //     );
  //     setIsLoading(false);
  //   } else {
  //     await dispatch(
  //       createQRCode({
  //         name: (auth.user as IServiceProvider).name,
  //         owner: (auth.user as IServiceProvider)._id!,
  //       })
  //     );
  //     setIsLoading(false);
  //   }
  // };

  const handleDownload = async () => {
    const response = await fetch(user.qrCode!.image);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "QRCode.png"; // You can set the desired file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-100">
      <p className="text-lg font-semibold">
        {user.points ? "Points" : user.qrCode?.image ? "Your QR Code" : ""}
      </p>
      {user.points ? (
        <p className="text-4xl my-1 text-secondary font-bold">
          <CountUp end={user.points!} />
        </p>
      ) : user.qrCode?.image && isServiceExist ? (
        <div className="flex flex-col justify-center items-center">
          <Image
            src={user.qrCode?.image}
            alt="QR Code"
            width={100}
            height={100}
            className="w-40 h-40"
          />
          <button
            onClick={handleDownload}
            className="mt-2 px-2 py-1 bg-secondary text-white text-sm rounded-lg shadow-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:ring-opacity-75 transition duration-300 sm:px-4 sm:py-2 sm:text-base flex items-center justify-center"
          >
            <FaDownload className="inline-block mr-2" />
            Download QR Code
          </button>
        </div>
      ) : (
        <div className="w-32 h-32 border text-center text-sm text-neutral flex flex-col items-center justify-center p-2 gap-3">
          Your QR Code will appear here, once you have at least a service.
        </div>
      )}
    </div>
  );
};

export default PointsSection;
