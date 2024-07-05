import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./pages.css";

export default function BookInfo({ ServerUrl }) {
    const navigate=useNavigate();
    
    const id = useParams();
    var added=false;
    console.log(id.added);
    if(id.added=="true"){
        added=true;
    }
    const name = id.id;

    const [book, setBook] = useState([]);
    const [addedtocart,setAddedtocart]=useState(added);
    const [avgReviewScore,setAvgReviewScore]=useState('');
    const [totalReviews,setTotalReviews]=useState(0);
   
    
    var data;

    const handleAddtoCart=async()=>{
    axios.post(`${ServerUrl}/addtocart`,{
      username:localStorage.getItem('Username'),
      item:data
    }).then(response=>{
           setAddedtocart(true);
           navigate(`/book/${data.Name}/true`)
    }).catch(err=>{
      console.log('Error!');
    });

}

  const handleSubmitReview=()=>{
      const review=document.getElementById('ReviewInput').value;
      const uname=localStorage.getItem("Username");
      axios.post(`${ServerUrl}/addReview`,{
        BookName:name,
        Username:uname,
        Review:review
      }).then((r)=>{
       alert("Review Submitted");
      }).catch(err=>{
        console.log(err);
      })
  }

  useEffect(() => {
    axios.get(`${ServerUrl}/findBook`, {
        params: {
          Name: name,
        },
      })
      .then((resp) => {
        console.log(resp.data.book);
        setBook(resp.data.book);
        setAvgReviewScore(resp.data.finalScore);
        setTotalReviews(resp.data.totalReviews);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

 


  return (
    <>
      <Header />
      <div className="BookInfoContainer">
        {book.map((b) => {
          data = {
            Name: b.Name,
            Price: b.Price,
            amount: 1,
            Url: b.Url,
          };
          return (
            <div className="BookInfo">
              <div className="BookInfoHead">
                <div className="BookInfoLeft">
                  <p id="BookTitle">{b.Name}</p>
                  {/* <p id="BookPrice">{b.Price}/-</p> */}
                  Genres:<p>[{b.Genre}]</p>
                </div>
                <img src={b.Url} style={{ height: "300px" }} />
              </div>
              <div>
                <p>{b.Description}</p>
              </div>
              <div className="BookBottom">
              <p id="BookPrice">{b.Price}/-</p>
              <button
                id="add-to-cart"
                onClick={handleAddtoCart}
                className={addedtocart ? "disabled" : ""}
              >
                {addedtocart ? <p>Added to Cart</p> : <p>Add to Cart</p>}
              </button>
              </div>
            </div>
          );
        })}

        <div className="Reviews">
          <div>
            <input type="text" id="ReviewInput" placeholder="Leave a Review" />
            <button id="SubmitReview" onClick={handleSubmitReview}>
              Submit
            </button>
          </div>

          <div>
          <p>Average Score:</p>
            {avgReviewScore} ({totalReviews})
          </div>

          <div className="ReviewBlock">
            {book.map((b) => {
              return (
                <div className="ReviewsFlex">
                  {b.Reviews.map((r) => {
                    return (
                      <>
                        <div className="Review">
                          <p>{r.Username} left a review:</p>
                          <p>{r.Review}</p>
                        </div>
                      </>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
