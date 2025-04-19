"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";

export default function AddService() {
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    availability: "",
    price: "",
    location: "",
    images: null,
    category: "",
    physicalOrOnline: "physical",
    maxSlots: "",
    tags: "",
    calendarDetails: "",
    priceDetail: "per session",
    isActive: true,
  });

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files?.[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.serviceName || !formData.category) {
      alert("Service Name and Category are required");
      return;
    }

    // Simulated API request

    alert("Service created successfully");
    router.push("/dashboard");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Create a Service</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="serviceName"
          placeholder="Service Name"
          value={formData.serviceName}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        ></textarea>
        <input
          name="availability"
          placeholder="Availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="price"
          type="number"
          placeholder="Price (KES)"
          value={formData.price}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="location"
          placeholder="Location or Virtual Link"
          value={formData.location}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="maxSlots"
          type="number"
          placeholder="Max Slots"
          value={formData.maxSlots}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="calendarDetails"
          placeholder="Calendar Details"
          value={formData.calendarDetails}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Choose a service</option>
          <option value="yoga">Yoga Class</option>
          <option value="nutrition">Nutrition Consultation</option>
        </select>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="radio"
            name="physicalOrOnline"
            value="physical"
            checked={formData.physicalOrOnline === "physical"}
            onChange={handleChange}
          />{" "}
          Physical
          <input
            type="radio"
            name="physicalOrOnline"
            value="online"
            checked={formData.physicalOrOnline === "online"}
            onChange={handleChange}
          />{" "}
          Online
        </div>
        <input
          type="file"
          name="images"
          onChange={handleChange}
          className="w-full mb-3"
        />
        <div className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.checked })
            }
          />{" "}
          Active
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}
