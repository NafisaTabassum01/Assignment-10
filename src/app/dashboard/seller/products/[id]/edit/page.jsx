// import EditProductForm from "./EditProductForm";

import EditProductForm from "@/components/EditProductForm";

const EditPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  const product = await res.json();

  return (
    <EditProductForm product={product} />
  );
};

export default EditPage;