import '../Styles/AdminStyles/CreateProduct.css'
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function CreateProduct() {
    return (
        <>
            <Navbar />
            <PageTitle title="Create Product" />
            <div className="create-product-container">
                <h1 className="form-title">Create Product</h1>
                <form className="product-form" encType='multipart/form-data'>

                </form>
            </div>

            <Footer />
        </>
    )
}

export default CreateProduct