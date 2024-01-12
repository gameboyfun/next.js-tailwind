"use client";
import LogsForm from "@/components/logsForm";

type Params = {
  params: {
    id: string;
  };
};

export default function LogsDetail({ params }: Params) {

  return (
    <>
      <LogsForm id={params.id} />
    </>
  );
}
