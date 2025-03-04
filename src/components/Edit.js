import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:3001";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        import_date: "",
        quantity: 1,
        type_id: ""
    });
    const [types, setTypes] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/clothes/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error("Error fetching product:", error));

        axios.get(`${API_URL}/clothe_types`)
            .then(response => setTypes(response.data))
            .catch(error => console.error("Error fetching types:", error));
    }, [id]);

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === "name" && value.length > 100) {
            alert("Tên sản phẩm không được dài quá 100 ký tự!");
            return;
        }

        if (name === "import_date") {
            const today = new Date().toISOString().split("T")[0];
            if (value > today) {
                alert("Ngày nhập không được lớn hơn ngày hiện tại!");
                return;
            }
        }

        if (name === "quantity") {
            value = parseInt(value, 10);
            if (isNaN(value) || value <= 0) {
                alert("Số lượng phải là số nguyên lớn hơn 0!");
                return;
            }
        }

        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${API_URL}/clothes/${id}`, product)
            .then(() => {
                alert("Cập nhật sản phẩm thành công!");
                navigate("/");
            })
            .catch(error => console.error("Error updating product:", error));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Chỉnh sửa sản phẩm</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Tên sản phẩm</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        maxLength="100"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ngày nhập</label>
                    <input
                        type="date"
                        className="form-control"
                        name="import_date"
                        value={product.import_date}
                        onChange={handleChange}
                        required
                        max={new Date().toISOString().split("T")[0]}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Số lượng</label>
                    <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Loại sản phẩm</label>
                    <select
                        className="form-control"
                        name="type_id"
                        value={product.type_id}
                        onChange={handleChange}
                        required
                        disabled={types.length === 0}
                    >
                        <option value="">Chọn loại sản phẩm</option>
                        {types.map(type => (
                            <option key={type.type_id} value={type.type_id}>
                                {type.type_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
            </form>
        </div>
    );
}
