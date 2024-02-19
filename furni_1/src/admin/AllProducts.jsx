import React from "react";
import { Container,Row,Col } from "reactstrap";
import { db } from "../firebase.config";
import { doc, deleteDoc } from 'firebase/firestore';
import useGetData from "../custom-hooks/useGatData";
import { toast } from "react-toastify";

const AllProducts = () => {
    
    const { data:productData, loading} = useGetData('products');

    const deleteProduct =async(id) => {
        await deleteDoc(doc(db,'products' ,id));
        toast.success('Deleted');

    }
    
    return <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            loading ? (<h3 className="py-5 text-center fw-blod">loading....</h3> ):(   
                                productData.map(item=>(
                                 <tr key={item.id}>
                                     <td><img src={item.imgUrl} alt=""></img></td>
                                     <td>{item.title}</td>
                                     <td>{item.Category}</td>
                                     <td>₹{item.Price}</td>
                                     <td> <button onClick={() => {
                                        deleteProduct(item.id)
                                     }}className="btn btn-danger">Delete</button></td>
                                 </tr>
                                ))
   )  }
                          
                        </tbody>
                    </table>
                
                </Col>
            </Row>
        </Container>
    </section>
};
export default AllProducts;
