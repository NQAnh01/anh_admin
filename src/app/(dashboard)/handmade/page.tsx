"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/handmade/HandmadeColumns";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";

const HandmadePage = () => {
  const [loading, setLoading] = useState(true);
  const [handmade, setHandmade] = useState([]);

  const getHandmade = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/handmade`);
      const data = await res.json();
      setHandmade(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("[Handmade_GET", err);
    }
  };

  useEffect(() => {
    getHandmade();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Handmade Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={handmade} searchKey="title" />
    </div>
  );
};

export default HandmadePage;
