import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:3001";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [types, setTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            axios.get(`${API_URL}/clothes`),
            axios.get(`${API_URL}/clothe_types`)
        ])
            .then(([clothesResponse, typesResponse]) => {
                const clothes = clothesResponse.data || [];
                const types = typesResponse.data || [];

                const typeMap = types.reduce((acc, type) => {
                    acc[type.type_id] = type.type_name;
                    return acc;
                }, {});

                const updatedProducts = clothes
                    .map(product => ({
                        ...product,
                        type_name: typeMap[product.type_id] || "Không xác định"
                    }))
                    .sort((a, b) => b.quantity - a.quantity);

                setProducts(updatedProducts);
                setFilteredProducts(updatedProducts);
                setTypes(types);
            })
            .catch(error => console.error("Error fetching products or types:", error));
    }, []);

    useEffect(() => {
        let result = products;
        if (searchTerm.trim() !== "") {
            result = result.filter(p =>
                p.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedType) {
            result = result.filter(p => p.type_id.toString() === selectedType);
        }
        setFilteredProducts(result);
    }, [searchTerm, selectedType, products]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Danh sách sản phẩm</h1>
            <div className="row mb-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">Tất cả loại sản phẩm</option>
                        {types.map(type => (
                            <option key={type.type_id} value={type.type_id}>
                                {type.type_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4 text-end">
                    <Link to="/add">
                        <button className="btn btn-primary">Thêm mới sản phẩm</button>
                    </Link>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <h5 className="text-center text-danger mt-4">Không tìm thấy sản phẩm</h5>
            ) : (
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Id</th>
                        <th>Tên sản phẩm</th>
                        <th>Ngày nhập</th>
                        <th>Số lượng</th>
                        <th>Loại sản phẩm</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.import_date}</td>
                            <td>{product.quantity}</td>
                            <td>{product.type_name}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => navigate(`/edit/${product.id}`)}
                                >
                                    Sửa
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
