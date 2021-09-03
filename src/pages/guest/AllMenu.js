import React from 'react';
import Login from '../access/Login';
import Register from '../access/Register';
import CardAllCoffee from './cardsProducts/CardAllCoffee';
import './css/style.css';
import { useQuery } from 'react-query';
import { getProducts } from '../../config/api';
import FadeLoader from 'react-spinners/FadeLoader';

const AllMenu = () => {
  const { data: products, isLoading, error } = useQuery('productsCache', getProducts);

  if (isLoading)
    return (
      <div className="custom-status">
        <div className="custom-status">
          <FadeLoader color={'#BD0707'} loading={true} size={60} />
        </div>
      </div>
    );

  if (error) return <div className="custom-status">Error fetching data</div>;

  return (
    <>
      <title>WaysBucks | All Menu</title>
      <section className="all-menu varian">
        <div className="container">
          <h3>All Menu</h3>
          <div className="row">
            {products.map((data) => (
              <CardAllCoffee coffee={data} key={data.id} />
            ))}
          </div>
        </div>
      </section>
      <Login />
      <Register />
    </>
  );
};

export default AllMenu;
