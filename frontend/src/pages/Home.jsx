import React from 'react'
import Footer from '../components/Footer'
import '../pageStyles/Home.css'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/Product'
import PageTitle from '../components/PageTitle'

const products= [
        {
            "_id": "68b9c9af041fa54f15bc7d1c",
            "name": "Products",
            "description": "mast product",
            "price": 800,
            "ratings": 0,
            "image": [
                {
                    "public_id": "This is test id",
                    "url": "This is test url 1",
                    "_id": "68b9c9af041fa54f15bc7d1d"
                }
            ],
            "category": "shirt",
            "stock": 1,
            "numOfReviews": 0,
            "reviews": [],
            "createdAt": "2025-09-04T17:17:35.612Z",
            "__v": 0
        },
        {
            "_id": "68b9ca8477cb3dd03e5bdf26",
            "name": "Products2",
            "description": "very good product",
            "price": 700,
            "ratings": 0,
            "image": [
                {
                    "public_id": "This is test id2",
                    "url": "This is test url 2",
                    "_id": "68b9ca8477cb3dd03e5bdf27"
                }
            ],
            "category": "jersey",
            "stock": 1,
            "numOfReviews": 0,
            "reviews": [],
            "createdAt": "2025-09-04T17:21:08.755Z",
            "__v": 0
        },
        {
            "_id": "68b9c9af041fa54f15bc7d1c",
            "name": "Products",
            "description": "mast product",
            "price": 800,
            "ratings": 0,
            "image": [
                {
                    "public_id": "This is test id",
                    "url": "This is test url 1",
                    "_id": "68b9c9af041fa54f15bc7d1d"
                }
            ],
            "category": "shirt",
            "stock": 1,
            "numOfReviews": 0,
            "reviews": [],
            "createdAt": "2025-09-04T17:17:35.612Z",
            "__v": 0
        },
        {
            "_id": "68b9ca8477cb3dd03e5bdf26",
            "name": "Products2",
            "description": "very good product",
            "price": 700,
            "ratings": 0,
            "image": [
                {
                    "public_id": "This is test id2",
                    "url": "This is test url 2",
                    "_id": "68b9ca8477cb3dd03e5bdf27"
                }
            ],
            "category": "jersey",
            "stock": 1,
            "numOfReviews": 0,
            "reviews": [],
            "createdAt": "2025-09-04T17:21:08.755Z",
            "__v": 0
        }
    ]

function Home() {
  return (
    <>
      <PageTitle title="ShopKart"/>
      <Navbar/>
      <ImageSlider/>
      <div className="home-container">
        <h2 className="home-heading">Trending Now</h2>
        <div className="home-product-container">
          {products.map((product,index)=>(
            <Product product={product}  key={index}/>
          ))}
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Home