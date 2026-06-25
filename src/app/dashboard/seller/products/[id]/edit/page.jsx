// import EditProductForm from "./EditProductForm";

import EditProductForm from "@/components/EditProductForm";

const EditPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:5000/api/products/${id}`,
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