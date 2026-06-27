import { getProduct } from "@/lib/api/products";
import BuyProductForm from "@/components/BuyProductForm";

const BuyProductPage = async ({ params }) => {
  const { id } = await params;

  const result = await getProduct();
  const products = result.data || [];

  const product = products.find(
    (p) => p._id === id || p._id?.$oid === id
  );

  return <BuyProductForm product={product} />;
};

export default BuyProductPage;