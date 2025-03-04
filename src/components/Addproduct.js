// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
//
// export default function AddProduct() {
//     const navigate = useNavigate();
//     const [productData, setProductData] = useState({
//         name: "",
//         type: "",
//         quantity: 0,
//         importDate: ""
//     });
//     const [productTypes, setProductTypes] = useState([]);
//     const [errorMessage, setErrorMessage] = useState("");
//
//     useEffect(() => {
//         axios.get("http://localhost:3001/clothe_types")
//             .then(response => setProductTypes(response.data))
//             .catch(error => console.error("Error loading product types:", error));
//     }, []);
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProductData({ ...productData, [name]: value });
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const { name, type, quantity, importDate } = productData;
//         const currentDate = new Date();
//         const importDateObj = new Date(importDate);
//
//         if (!name || !type || !quantity || !importDate) {
//             setErrorMessage("Tất cả các trường đều là bắt buộc!");
//             return;
//         }
//         if (importDateObj > currentDate) {
//             setErrorMessage("Ngày nhập không được lớn hơn ngày hiện tại.");
//             return;
//         }
//         if (quantity <= 0 || !Number.isInteger(Number(quantity))) {
//             setErrorMessage("Số lượng phải là số nguyên và lớn hơn 0.");
//             return;
//         }
//
//         const newProduct = {
//             name,
//             type,
//             quantity,
//             importDate: importDateObj.toISOString().split("T")[0] // Định dạng chuẩn YYYY-MM-DD
//         };
//
//         console.log("Dữ liệu gửi lên API:", newProduct);
//
//         axios.post("http://localhost:3001/clothes", newProduct)
//             .then(() => {
//                 alert("Thêm sản phẩm thành công!");
//                 navigate("/");
//             })
//             .catch(error => {
//                 console.error("Error adding product:", error);
//                 setErrorMessage("Đã xảy ra lỗi khi thêm sản phẩm.");
//             });
//     };
//
//     return (
//         <div className="container mt-4">
//             <h1 className="mb-4">Thêm mới sản phẩm</h1>
//
//             {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
//
//             <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
//                 <div className="mb-3">
//                     <label htmlFor="name" className="form-label">Tên sản phẩm:</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         className="form-control"
//                         value={productData.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//
//                 <div className="mb-3">
//                     <label htmlFor="type" className="form-label">Loại sản phẩm:</label>
//                     <select
//                         id="type"
//                         name="type"
//                         className="form-select"
//                         value={productData.type}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Chọn loại sản phẩm</option>
//                         {productTypes.map((type) => (
//                             <option key={type.type_id} value={type.type_id}>
//                                 {type.type_name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//
//                 <div className="mb-3">
//                     <label htmlFor="quantity" className="form-label">Số lượng:</label>
//                     <input
//                         type="number"
//                         id="quantity"
//                         name="quantity"
//                         className="form-control"
//                         min="1"
//                         value={productData.quantity}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//
//                 <div className="mb-3">
//                     <label htmlFor="importDate" className="form-label">Ngày nhập:</label>
//                     <input
//                         type="date"
//                         id="importDate"
//                         name="importDate"
//                         className="form-control"
//                         value={productData.importDate}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//
//                 <button type="submit" className="btn btn-primary">Thêm sản phẩm</button>
//             </form>
//         </div>
//     );
// }
