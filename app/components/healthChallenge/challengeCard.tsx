"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { MdStart } from "react-icons/md";

interface Props {
  id: number;
  image: StaticImageData;
  icon: React.JSX.Element;
  title: string;
  link: string;
  description: string;
}

const ChallengeCard = ({ challenge }: { challenge: Props }) => {
  const { description, link, id, icon, image, title } = challenge;
  return (
    <div className="card overflow-hidden flex flex-col rounded-lg bg-base-100 min-w-60 max-w-96 duration-300 shadow-md hover:shadow-xl">
      {id === 3 ? (
        <div className="w-full h-[470px] relative">
          <Image
            src={image}
            alt={title}
            width={400}
            height={500}
            className="object-top duration-300 transition"
          />
        </div>
      ) : (
        <div className="w-full h-80 relative">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-110 duration-300 transition"
          />
        </div>
      )}

      {id === 3 ? (
        <div className="absolute bottom-0 bg-white w-full py-3 card-actions justify-center">
          <a target="_blank" rel="noopener noreferrer" href={link}>
            <motion.button
              whileHover={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="hover:bg-teal-100 border rounded-full py-3 px-4 flex items-center gap-2 border-secondary"
            >
              Register Now <MdStart className="text-secondary font-bold" />
            </motion.button>
          </a>
        </div>
      ) : (
        <div className="card-body p-4">
          <h2 className="card-title flex items-center gap-2">
            {title} {icon}
          </h2>
          <p className="text-slate-500 py-2">{description}</p>
          <div className="card-actions justify-center">
            <Link href={link}>
              <motion.button
                whileHover={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="hover:bg-teal-100 border rounded-full py-3 px-4  flex items-center gap-2 border-secondary"
              >
                Join Event <MdStart className="text-secondary font-bold" />
              </motion.button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;
