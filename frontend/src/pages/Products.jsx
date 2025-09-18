import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import "../pageStyles/Products.css";
import Product from "../components/Product";
import { getProduct, removeErrors } from "../features/products/productSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "../componentStyles/Product.css";
import { useLocation } from "react-router-dom";
import NoProducts from "../components/NoProducts";

function Products() {
  const { loading, error, products, resultsPerPAge, productCount } =
    useSelector((state) => state.product);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct({ keyword }));
  }, [dispatch, keyword]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);
  console.log("Madharchod", products);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="All Products" />
          <Navbar />
          <div className="products-layout">
            <div className="filter-section">
              <h3 className="filter-heading">CATEGORIES</h3>
            </div>

            <div className="products-section">
              {products.length > 0 ? (
                <div className="products-product-container">
                  {products.map((product, index) => (
                    <Product product={product} key={index} />
                  ))}
                </div>
              ) : (
                <NoProducts keyword={keyword} />
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Products;
