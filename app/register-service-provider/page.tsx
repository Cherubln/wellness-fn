import Link from "next/link";
import ServiceProviderForm from "../components/ServiceProviderForm";

export default function ServiceProviderRegisterPage() {
  return (
    <div className="py-6 px-4 flex flex-col items-center sm:pt-8 h-screen gap-4 ">
      <div className={`"w-full md:w-2/3 lg:w-1/2`}>
        <h1 className="capitalize text-2xl  text-secondary font-bold w-full  text-center ">
          welcome to the biggest health challenge 2025
        </h1>

        <div className="sm:mt-6 w-full  flex flex-col gap-8 sm:border border-secondary p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-center text-secondary capitalize">
            Register
          </h2>
          <ServiceProviderForm />
          <Link href={`/`} className="text-center">
            Already have an account?
            <span className="ml-1 text-secondary font-bold cursor-pointer">
              Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
