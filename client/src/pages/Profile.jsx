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
    const answer = window.confirm("Do you want to logout?");

    if (answer) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("Username");
      window.location.href = "/login";
    }
  };

  const handleRemove = () => {
    const answer = window.confirm(
      "Are you sure you want to remove your account?"
    );
    if (answer) {
      axios
        .post(`${Url}/removeUser`, {
          username: localStorage.getItem("Username"),
        })
        .then((response) => {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("Username");
          window.location.href = "/login";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
          params: {
            username:localStorage.getItem('Username')
          },
        })
        .then((response) => {
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
          <thead>
            <tr>
              <th className="rb">Order Id</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orderexist ? (
            
              orders.map((ord) => {
                let date=new Date(ord.Time);
                return (
                  
                    <tr key={ord._id}>
                      <td style={{width: "100px"}}>
                        Order Id: {ord._id}
                        <br></br>
                        Date:{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}
                        <br></br>
                        Time:{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
                      </td>
                      <td style={{width: "400px"}}>
                        {ord.Items.map((item) => {
                          return (
                            <div key={item._id}>
                              <span>{item.amount}</span>x
                              <span>{item.Name}</span>=<span>{item.Price}</span>
                            </div>
                          );
                        })}
                      </td>
                    </tr>
                  
                );
              })
            ) : (
              <tr>
                <td>No orders yet!</td>
              </tr>
            )}
          </tbody>
        </table>
        
      </div>
      <Footer />
    </>
  );
}
