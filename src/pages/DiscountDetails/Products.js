import React from "react";
import { useParams } from "react-router-dom";

const Products = () => {
	const { did } = useParams();
	return <div>Products</div>;
};

export default Products;
