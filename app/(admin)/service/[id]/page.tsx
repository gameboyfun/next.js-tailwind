import ServiceForm from "@/components/serviceForm";

type Params = {
  params: {
    id: string;
  };
};

// export async function generateMetadata({ params }: any) {
//   return {
//     title: `DTN | Service | ${params.id}`,
//   description: "DTN Backoffice",
//   icons: {
//     icon: '/admin/favicon.ico',
//   },
//   }
// }

export default function ServiceEdit({ params }: Params) {

  return (
    <>
      <ServiceForm id={params.id} />
    </>
  );
}
