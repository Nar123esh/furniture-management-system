import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import "../styles/admin-addp.css";
import { toast } from "react-toastify";

import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Addproducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      setLoading(true);

      const docRef = await collection(db, "products");
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress if needed
        },
        (error) => {
          console.error("Error uploading image:", error);
          toast.error("Image not uploaded!");
          setLoading(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(docRef, {
              productName: enterTitle,
              ShortDesc: enterShortDesc,
              Description: enterDescription,
              Category: enterCategory,
              Price: enterPrice,
              imgUrl: downloadURL,
            });
            setLoading(false)
            toast.success("Product successfully added!");
            navigate("/dashboard/all-products");
          } catch (error) {

            console.error("Error adding product:", error);
            setLoading(false)
            toast.error("Failed to add product!");
          } finally {
            setLoading(false);
          }
        }
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred!");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="13">
           {
            loading ? <h4 className="py-5">Loading.......</h4> : <>
             <h4 className="md-5"> Add Product</h4>
            <Form onSubmit={addProduct}>
              <FormGroup className="form__group">
                <span>Product title</span>
                <input
                  type="text"
                  placeholder="Double sofa"
                  value={enterTitle}
                  onChange={(e) => setEnterTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Short Description</span>
                <input
                  type="text"
                  placeholder="lorem..."
                  value={enterShortDesc}
                  onChange={(e) => setEnterShortDesc(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Description</span>
                <input
                  type="text"
                  placeholder="Description....."
                  value={enterDescription}
                  onChange={(e) => setEnterDescription(e.target.value)}
                  required
                />
              </FormGroup>

              <div className="d-flex align-item-center justify-content-between gap-5">
                <FormGroup className="form__group w-50">
                  <span>Price</span>
                  <input
                    type="number"
                    placeholder="₹100"
                    value={enterPrice}
                    onChange={(e) => setEnterPrice(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group w-100 ">
                  <span>Category</span>
                  <select
                    className="w-100 p-2"
                    value={enterCategory}
                    onChange={(e) => setEnterCategory(e.target.value)}
                    required
                  >
                    <option>Select Category</option>
                    <option value="chair">Chair</option>
                    <option value="table">Table</option>
                    <option value="sofa">Sofa</option>
                    <option value="lamp">lamp</option>
                  </select>
                </FormGroup>
              </div>

              <div>
                <FormGroup className="form__group">
                  <span>Product Image</span>
                  <input type="file" onChange={(e) => setEnterProductImg(e.target.files[0])} required />
                </FormGroup>
              </div>

              <button className="primary__btn" type="submit">
                Add product
              </button>
            </Form>
            </>
           }
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Addproducts;
