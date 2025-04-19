import Image from "next/image";
import React from "react";

export function LogoComponent({width=100, height=100}:{width?:number, height?:number}) {
  return (
    <div>
      <Image
        src={"/images/3.png"}
        alt="biggest health challenge"
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
}
export function BimaComponent({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <div>
      <Image
        src={"/images/5.jpg"}
        alt="biggest health challenge"
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
}
