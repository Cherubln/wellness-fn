/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useRef } from "react";
import { AppDispatch, RootState } from "@/app/store";
import {
  deleteService,
  updateService,
  fetchServiceById as getServiceById,
} from "@/app/store/slices/serviceSlice";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaClock, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";
import { motion } from "framer-motion";
import { useAppContext } from "@/app/context";
import CenterModal from "@/app/components/model/centerModel";
import BookingCard from "@/app/components/activities/bookingCard";
import { CollapsibleInfo } from "@/app/components/activities/cancellationPolicy";
import AddSessionCard from "@/app/components/activities/addSessionCard";
import { ServiceType } from "@/app/type";
import { ExtractDateTime } from "@/app/utils/convertDate";
import { LuCalendarDays } from "react-icons/lu";
import { GrValidate } from "react-icons/gr";

const ServiceDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // Get the 'id' parameter from the URL
  const { user } = useSelector((state: RootState) => state.auth);
  const { status, services } = useSelector(
    (state: RootState) => state.services
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editService, setEditService] = useState<ServiceType>(
    {} as ServiceType
  );
  const [service, setService] = useState<ServiceType>(
    services.find((service) => service._id === id)!
  );
  const [whatsappLink, setWhatsappLink] = useState(""); // Added whatsappLink state
  const [instagramLink, setInstagramLink] = useState(""); // Added instagramLink state
  const dispatch = useDispatch<AppDispatch>();
  const {activeModalId, setActiveModalId } = useAppContext();

  useEffect(() => {
    if (services.length == 0) {
      router.push("/dashboard");
    }
    if (!isEditing) {
      setService(services.find((service) => service._id === id)!);
      setEditService(service);
    }
  }, [id, activeModalId]);

  const handleDelete = async () => {
    setIsDeleting(true);
    await dispatch(deleteService(service._id));
    setIsDeleting(false);
    // Navigate back after deletion
    router.push("/services");
  };

  const handleSave = async () => {
    await dispatch(
      updateService({
        id: editService._id,
        service: {
          ...editService,
          provider: {
            ...service?.provider,
            whatsappLink: whatsappLink
              ? whatsappLink
              : service?.provider?.whatsappLink,
            instagramLink: instagramLink
              ? instagramLink
              : service?.provider?.instagramLink,
          },
        },
      })
    );
    // Retrieve updated data from backend using getServiceById
    const updatedService = await dispatch(getServiceById(editService._id));
    setService(updatedService.payload as ServiceType);
    setEditService(updatedService.payload as ServiceType);
    setIsEditing(false);
  };

  function isValidLink(link: string, type: "instagram" | "whatsapp") {
    const patterns = {
      instagram: /^(https?:\/\/)?((w{3}\.)?)instagram\.com\/.+/i,
      whatsapp: /^(https?:\/\/)?((w{3}\.)?)wa\.me\/.+/i,
    };

    return patterns[type].test(link);
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditService((prev) => ({
      ...prev,

      [name]:
        name === "location" ? value.trim().split(",").filter(Boolean) : value,
    }));
  };
  const [isTyping, setIsTyping] = useState({
    whatsapp: false,
    instagram: false,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = e.target.value;
    type === "whatsapp" ? setWhatsappLink(value) : setInstagramLink(value);

    setIsTyping((prevTyping) => ({
      ...prevTyping,
      [type]: true,
    }));
  };

  // Inside the component
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [isEditing]);

  const isLink = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  if (services.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="md:container md:mx-auto md:max-w-4xl">
      <motion.div
        onClick={() => router.back()}
        whileHover={{ scale: 0.9 }}
        className="duration-100 hover:bg-slate-200  cursor-pointer bg-slate-100 py-3 px-2 shadow-lg rounded-md border-b flex items-center gap-2 w-fit"
      >
        <IoChevronBack className="text-lg" />
        <span className="font-semibold text-lg">Go back</span>
      </motion.div>

      {isEditing ? (
        <div className="flex md:justify-center">
          <div className="flex flex-col gap-5 my-4 px-4 w-full md:w-2/3">
            <h1 className="text-3xl font-bold">Edit Service</h1>
            <div>
              <label className="label font-semibold">
                <span className="label-text">Service Name</span>
              </label>
              <input
                type="text"
                name="activityName"
                value={editService.activityName}
                onChange={handleChange}
                className="input input-bordered"
                ref={inputRef}
              />
            </div>
            <div>
              <label className="label font-semibold">
                <span className="label-text">Images</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {editService.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`service-${index}`}
                      className="w-40 h-40 object-cover rounded border border-gray-400"
                    />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => {
                        const updatedImages = editService.images.filter(
                          (_, i) => i !== index
                        );
                        setEditService({
                          ...editService,
                          images: updatedImages,
                        });
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              {editService.images.length < 3 && (
                <div className="flex items-center mt-2">
                  <label
                    className="btn btn-sm bg-secondary cursor-pointer"
                    htmlFor="imageUpload"
                  >
                    Add an Image
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files![0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditService({
                            ...editService,
                            images: [
                              ...editService.images,
                              reader.result as string,
                            ],
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </div>
              )}
            </div>
            <div className="">
              <label className="label font-semibold">
                <span className="label-text">Price: KES</span>
              </label>
              <input
                type="number"
                name="price"
                value={editService.price || 0.0}
                onChange={handleChange}
                className="input input-bordered w-40"
              />
            </div>
            <div>
              <label className="label  font-semibold">
                <span className="label-text">Availability</span>
              </label>
              <input
                type="text"
                name="availability"
                value={editService.availability}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <div className="">
              <label className="label  font-semibold">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                value={editService.description}
                onChange={handleChange}
                className="input input-bordered w-full  min-h-20"
              />
            </div>
            <div>
              <label className="label font-semibold">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                value={editService.location}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <section className="w-full flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">
                      WhatsApp Link <span className="">(Optional)</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="WhatsApp Link"
                    className="input input-bordered w-full"
                    value={whatsappLink}
                    onChange={(e) => handleInputChange(e, "whatsapp")}
                    required
                  />
                  {isTyping.whatsapp &&
                    !isValidLink(whatsappLink, "whatsapp") && (
                      <span className="text-red-400 text-sm">
                        Please enter a valid WhatsApp link.
                      </span>
                    )}
                </label>
              </div>
              <div className="w-full">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">
                      Instagram Link <span className="">(Optional)</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Instagram Link"
                    className="input input-bordered w-full"
                    value={instagramLink}
                    onChange={(e) => handleInputChange(e, "instagram")}
                    required
                  />
                  {isTyping.instagram &&
                    !isValidLink(instagramLink, "instagram") && (
                      <span className="text-red-400 text-sm">
                        Please enter a valid Instagram link.
                      </span>
                    )}
                </label>
              </div>
            </section>
            <div className="flex items-center gap-4 p-4 -mt-4 mb-4">
              <button
                className="btn btn-sm text-gray-500 disabled:text-gray-500 bg-neutral/30 rounded-lg px-2 py-1 border border-neutral hover:bg-neutral/50 w-20 transition-colors"
                onClick={handleSave}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Saving..." : "Save"}
              </button>
              <button
                className="btn btn-sm text-red-500 bg-neutral/30 rounded-lg px-2 py-1 border border-neutral hover:bg-neutral/50 w-20 transition-colors"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 my-4 px-4">
          <div className="flex w-full flex-wrap gap-3 items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{service?.activityName}</h1>
              <p className="text-lg text-secondary font-semibold">
                {service?.category}
              </p>
            </div>
            {user.role === "user" && (
              <div className="w-fit flex justify-center">
                <motion.button
                  key="submit-button"
                  onClick={() => setActiveModalId(`${id}`)}
                  initial={{ opacity: 0, scale: 0, y: 100 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                  className=" border-secondary  hover:bg-secondary hover:text-white hover:scale-90 cursor-pointer hover:duration-200 transition px-8 py-3  border rounded-full font-semibold uppercase"
                >
                  Book now
                </motion.button>
              </div>
            )}
          </div>

          <div>
            <div className="carousel max-w-fit h-80">
              {service?.images.map((image, index) => (
                <div
                  key={image}
                  id={`slide${service._id + index}`}
                  className="carousel-item relative w-full"
                >
                  <img
                    src={image}
                    alt="Shoes"
                    className="object-cover w-full h-full rounded-lg"
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
              ))}
            </div>
          </div>
          <div className="badge p-4 rounded-lg text-base bg-secondary">
            {service.price ? `KES ${service.price.toFixed(2)}` : "Free"}
            {service.priceType && ` / ${service.priceType.toLocaleLowerCase()}`}
          </div>
          <div>
            <p className="">
              <span className="flex items-center gap-2 text-neutral font-bold">
                {" "}
                <GrValidate />
                We Are Available:
              </span>
              <span className="font-semibold">
                {service.availability
                  ? service.availability
                  : service?.sessions[0].recurring
                  ? ` ${service?.sessions[0]?.recurringPattern?.daysOfWeek.at(
                      0
                    )} - ${service?.sessions[0]?.recurringPattern?.daysOfWeek.at(
                      -1
                    )} from ${service?.sessions[0].sessionTime} `
                  : ` ${
                      ExtractDateTime(service?.sessions[0].sessionDate).date
                    }  from  ${service?.sessions[0].sessionTime} ` ||
                    "You can contact the Service provider for Availability"}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-neutral font-semibold">Provider</h2>
              <p className="text-lg font-bold">{service?.provider?.name}</p>
            </div>
            <div className="">{service?.description}</div>
            <div>
              <p className="font-bold text-neutral">Location(s)</p>
              <div className="flex flex-wrap gap-3">
                {service?.location.map((loc) => (
                  <div key={loc} className="flex items-center gap-1">
                    <div>
                      <FaMapMarkerAlt className="inline-flex w-4 h-4" />
                    </div>
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
                  </div>
                ))}
              </div>
            </div>
            {user.role !== "user" && (
              <div className="border p-2 bg-slate-50 rounded w-full ">
                <h1 className="text-center text-neutral font-bold py-2">
                  Our Sessions
                </h1>
                <div className="max-h-[500px] overflow-y-scroll bg-slate-100 rounded-lg p-4 flex gap-4 justify-center flex-wrap">
                  {service.sessions.length < 1 ? (
                    <div className="h-40 text-slate-500 font-bold flex items-center justify-center text-center w-full">
                      No session Available now
                    </div>
                  ) : (
                    service.sessions.map((session, index) => (
                      <section
                        key={index}
                        className="border rounded-lg bg-gray-50 p-2 w-full sm:max-w-60 min-w-64 hover:shadow-md hover:scale-105 duration-300 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="text-sm pt-4 ">
                            <p className="">
                              <span className="font-bold text-slate-800">
                                Session Status:
                              </span>{" "}
                              <span
                                className={`${
                                  session.status === "open"
                                    ? "text-yellow-500"
                                    : "text-red-500"
                                } capitalize transition-transform font-semibold`}
                              >
                                {session.status}
                              </span>
                            </p>
                            <p className="">
                              <span className="font-bold text-slate-800">
                                Total Slots:
                              </span>{" "}
                              {session.slots}
                            </p>
                            <p>
                              <span className="font-bold text-slate-800">
                                Total Booked:
                              </span>{" "}
                              {session.bookedSlots}
                            </p>
                            <p className="">
                              <span className="font-bold text-slate-800">
                                Available Slots:
                              </span>{" "}
                              {session.slots - session.bookedSlots}
                            </p>
                          </div>
                          <LuCalendarDays className="text-lg text-blue-500" />
                        </div>
                        {session.recurring ? (
                          <div className="mt-3 bg-white shadow-sm p-3 space-y-2 rounded-md">
                            <p className="text-gray-800 text-sm flex items-center gap-1">
                              <span className="flex items-center gap-1">
                                <FaClock />{" "}
                                {session.recurringPattern?.daysOfWeek[0]}
                              </span>

                              <span className="flex items-center gap-1">
                                -
                                <FaClock />{" "}
                                {
                                  session.recurringPattern?.daysOfWeek?.[
                                    session.recurringPattern?.daysOfWeek
                                      ?.length - 1
                                  ]
                                }
                              </span>
                            </p>
                            <p className="text-gray-700 text-sm">
                              {session.bookedSlots} booked,{" "}
                              {session.slots - session.bookedSlots} remaining
                            </p>
                          </div>
                        ) : (
                          <div className="mt-3 bg-white shadow-sm p-3 space-y-2 rounded-md">
                            <p className="text-gray-800 text-sm flex items-center gap-1">
                              <span className="flex items-center gap-1">
                                <FaClock />{" "}
                                {ExtractDateTime(session.sessionDate).date}
                              </span>
                            </p>
                            <p className="text-gray-700 text-sm">
                              {session.bookedSlots} booked,{" "}
                              {session.slots - session.bookedSlots} remaining
                            </p>
                          </div>
                        )}
                      </section>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          {user.role === "user" && (
            <CollapsibleInfo addInfo={service.additionalInfo} />
          )}
          <div className="">
            {service?.provider?.whatsappLink ||
            service?.provider?.instagramLink ? (
              <p className="font-semibold my-2">Social Accounts</p>
            ) : (
              ""
            )}
            <div className="flex gap-1">
              {service?.provider?.whatsappLink && (
                <span>
                  <a
                    href={service?.provider?.whatsappLink}
                    target="_blank"
                    className="text-green-500"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                </span>
              )}
              {service?.provider?.instagramLink && (
                <span>
                  <a
                    href={service?.provider?.instagramLink}
                    target="_blank"
                    className="text-pink-500"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                </span>
              )}
            </div>
          </div>
          {user.role === "user" && (
            <div className="w-full flex justify-center">
              <motion.button
                key="submit-button"
                onClick={() => setActiveModalId(`${id}`)}
                initial={{ opacity: 0, scale: 0, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                className=" border-secondary  hover:bg-secondary hover:text-white hover:scale-90 cursor-pointer hover:duration-200 transition px-8 py-3 w-full md:w-1/2 mx-auto  border rounded-full font-semibold uppercase"
              >
                Book now
              </motion.button>
            </div>
          )}

          {user.role === "service_provider" && (
            <div className="flex items-center gap-4 p-4 -mt-4 mb-4">
              <button
                className="btn btn-sm text-gray-500 bg-neutral/30 rounded-lg px-2 py-1 border border-neutral hover:bg-neutral/50 w-20 transition-colors"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className={`btn btn-sm text-red-500 bg-neutral/30 rounded-lg px-2 py-1 border border-neutral hover:bg-neutral/50 w-20 transition-colors ${
                  isDeleting ? "loading" : ""
                }`}
                onClick={handleDelete}
                disabled={isDeleting || status === "loading"}
              >
                Delete
              </button>
              <button
                className={`btn btn-sm text-white bg-secondary rounded-lg p-2 border border-neutral hover:bg-secondary/70 transition-colors`}
                onClick={() => setActiveModalId(`create session`)}
              >
                Add Session
              </button>
            </div>
          )}
        </div>
      )}

      <CenterModal
        children={<BookingCard service={service} user={user} />}
        id={`${id}`}
      />
      <CenterModal
        children={<AddSessionCard service={service} user={user} />}
        id={`create session`}
      />
    </div>
  );
};
export default ServiceDetailsPage;
