import "./pages.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import User from "../assets/UserImg.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Url from "../utils/ServerUrl";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderexist, setOrderExist] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("Username");
  };

  const handleRemove = () => {};

  const uname = localStorage.getItem("Username");
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${Url}/user_info`, {
        params: {
          username: uname,
        },
      });
      if (response.status == 200) {
        setUsername(uname);
        setEmail(response.data.email);
      } else {
        alert(`Error fetching your data:${response.data}`);
      }
      axios
        .get(`${Url}/getOrders`, {
          username: localStorage.getItem("Username"),
        })
        .then((response) => {
          console.log(response.data[0].Orders);
          setOrders(response.data[0].Orders);
          setOrderExist(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="profile-page">
        <p>User Details</p>
        <img
          src={User}
          className="UserProfile"
          style={{ width: 80, height: 80 }}
        />
        <div>Username:{username}</div>
        <div>Email:{email}</div>
        <div className="profile-buttons">
          <button onClick={handleLogout}>Log out</button>
          <button onClick={handleRemove}>Remove account</button>
        </div>
      </div>
      <div className="orders">
        <h3 style={{ marginBottom: "20px" }}>Orders</h3>

        <table style={{ border: "1px solid black", width: "80%" }}>
          <th
            style={{
              borderBottom: "1px solid black",
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <td>Orders</td>
            <td>Items</td>
          </th>

          {orderexist ? (
            orders.map((ord) => {
              return (
                <>
                  <tr style={{ height: "150px" }}>
                    <td style={{width:'200px'}}>Order Id: {ord._id}<br></br>
                    Time:{ord.Time}
                    </td>
                    <td style={{width:'400px'}}>
                      {ord.Items.map((item) => {
                        return (
                          <div style={{ height: "100px", display: "flex" }}>
                            <img src={item.Url} height="50px" />
                            <div>
                              <p>{item.Price}</p>
                            </div>
                            <p>{item.amount}</p>
                          </div>
                        );
                      })}
                    </td>
                  </tr>
                </>
              );
            })
          ) : (
            <>
              <p>No orders yet!</p>
            </>
          )}
        </table>
      </div>
      <Footer />
    </>
  );
}
