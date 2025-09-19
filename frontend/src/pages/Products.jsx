import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import "../Styles/pageStyles/Products.css";
import Product from "../components/Product";
import { getProduct, removeErrors } from "../features/products/productSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "../Styles/componentStyles/Product.css";
import { useLocation, useNavigate } from "react-router-dom";
import NoProducts from "../components/NoProducts";
import Pagination from "../components/Pagination";

function Products() {
  const { loading, error, products, resultsPerPAge, productCount } =
    useSelector((state) => state.product);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;
  const category = searchParams.get("category");

  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const navigate = useNavigate();
  const categories = ["mobile", "laptop", "cosmetics", "shirt", "television"];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }));
  }, [dispatch, keyword, currentPage, category]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const newSearchParams = new URLSearchParams(location.search);
      if (page === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", page);
      }
      navigate(`?${newSearchParams.toString()}`);
    }
  };

  const handleCategoryChange = (category) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("category", category);
    newSearchParams.delete("page");
    navigate(`?${newSearchParams.toString()}`);
  };

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
              {/* render categories */}
              <ul>
                {categories.map((category) => {
                  return (
                    <li key={category} onClick={() => handleCategoryChange}>
                      {category}
                    </li>
                  );
                })}
              </ul>
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
              <Pagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Products;
