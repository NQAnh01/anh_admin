import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

const HandmadeDetails = async ({
  params,
}: {
  params: { handmadeId: string };
}) => {
  const res = await fetch(
    `${process.env.ADMIN_DASHBOARD_URL}/api/handmade/${params.handmadeId}`
  );
  const { handmadeDetails, customer } = await res.json();
  console.log(handmadeDetails);
  return (
    <div className="flex flex-col p-10 gap-5">
      {/* <h1>Orders ID</h1> */}
      <p className="text-base-bold">
        Order ID:{" "}
        <span className="text-base-medium">{handmadeDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Name: <span className="text-base-medium">{customer.name}</span>
      </p>
      <p className="text-base-bold">
        Sdt:{" "}
        <span className="text-base-medium">{handmadeDetails.phoneNumber}</span>
      </p>
      <p className="text-base-bold">
        Address:{" "}
        <span className="text-base-medium">
          {handmadeDetails.shippingAddress}
        </span>
      </p>
      <Separator className="bg-grey-1 -mb-4" />
      <div className="">
        <div className="flex gap-2 my-7">
          <h2 className="text-heading4-bold flex">Products Ordered:</h2>
          <p className="text-body-semibold">{handmadeDetails.title}</p>
        </div>
        <div>
          {handmadeDetails.image && (
            <Image
              src={handmadeDetails.image}
              alt={handmadeDetails.title}
              width={400}
              height={400}
            />
          )}
        </div>
        <div className="gap-2 flex">
          <p>Mô tả:</p>
          <p>{handmadeDetails.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HandmadeDetails;
