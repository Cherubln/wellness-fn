// components/ServiceCard.tsx
/* eslint-disable @next/next/no-img-element */
import { Service } from "../store/slices/serviceSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";

interface ServiceCardProps {
  service: Service;
  onEdit: () => void;
}

const isLink = (text: string) => {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const router = useRouter();

  return (
    <div className="card bg-base-100 w-full sm:w-96 shadow-xl hover:cursor-pointer">
      <figure className="w-full h-48 overflow-hidden relative">
        <div className="carousel w-full">
          {service.images.length > 0 ? (
            service.images.map((image, index) => (
              <div
                key={image}
                id={`slide${service._id + index}`}
                className="carousel-item relative w-full"
              >
                <img
                  src={image}
                  alt="Shoes"
                  className="object-contain w-full h-full"
                />
                <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a
                    href={`#slide${
                      index > 0
                        ? service._id +
                          (((index % service.images.length) - 1) %
                            service.images.length)
                        : service._id + (service.images.length - 1)
                    }`}
                    className="btn btn-circle btn-sm hover:bg-[var(--background)] border-none bg-black/60 text-white hover:text-black"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${
                      service._id +
                      (((index % service.images.length) + 1) %
                        service.images.length)
                    }`}
                    className="btn btn-circle btn-sm hover:bg-[var(--background)] border-none bg-black/60 text-white hover:text-black"
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))
          ) : (
            <img
              src="https://th.bing.com/th/id/R.6df44db06f58f2fd89d70daec16e84cb?rik=AHx4gXK%2bke9fgg&riu=http%3a%2f%2fbarcelona-home.com%2fblog%2fwp-content%2fupload%2f2013%2f09%2fgyms-in-barcelona.jpg&ehk=GLe0juvDrln%2fyyK2q7OJplOKBb4mQokRtqFKV9ZqauA%3d&risl=1&pid=ImgRaw&r=0"
              alt="service"
              className="object-contain w-full h-full"
            />
          )}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title capitalize">
          {service.activityName}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <div className="flex flex-col gap-4">
          <div className="badge badge-outline">
            <span className="text-secondary text-sm -my-2">
              {service.category}
            </span>
          </div>
          <div className="badge p-4 rounded-lg text-base bg-secondary">
            {service.price ? `KES ${service.price.toFixed(2)}` : "Free"}
          </div>
        </div>

        <p className="my-2 text-neutral ">
          <span className="line-clamp-3" title={service.description}>
            {service.description}
          </span>
        </p>
        <div className="text-sm flex flex-col gap-2 ">
          <div className="flex flex-row gap-2 items-center">
            <div>
              <FaMapMarkerAlt className="inline-flex w-4 h-4" />
            </div>
            <ol className=" flex flex-wrap gap-2">
              {service.location.slice(0, 3).map((loc) => (
                <li key={loc}>
                  {isLink(loc) ? (
                    <a
                      target="_blank"
                      href={loc}
                      className="text-blue-500 cursor-pointer underline truncate"
                    >
                      View on map
                    </a>
                  ) : (
                    <p className="">{loc}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-2 flex gap-2">
            <p className="bg-secondary/80 rounded-lg max-w-fit p-3 truncate capitalize">
              {service.availability}
            </p>
          </div>
        </div>
        {user.role !== "service_provider" ? (
          <div className="mt-4">
            <span className="text-neutral capitalize">Brought to you By </span>
            <span className="font-bold text-black">
              {service.provider.name}
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="card-actions justify-end mt-4 -mb-4">
          <span
            className="btn btn-sm text-blue-500  hover:text-blue-700"
            onClick={() => {
              router.push(`/dashboard/activities/${service._id}`);
            }}
          >
            View more
            <FaChevronRight className="inline" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
