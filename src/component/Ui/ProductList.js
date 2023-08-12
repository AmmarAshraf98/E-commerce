import ProductCard from "./ProductCard";

function ProductList(props) {
  console.log(props);
  return (
    <>
      {props.data?.map((item) => (
        <ProductCard key={item.id} data={item} />
      ))}
    </>
  );
}
export default ProductList;
