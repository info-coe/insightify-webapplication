import React from "react";
import { Link, useNavigate } from "react-router-dom";
import forwardArrow from "../images/Arrow-forward.png";
import aboutusImage from "../images/Frame12.png";

const Home = () => {
  const navigate = useNavigate();
  const orderClick = (e) => {
    e.preventDefault();
    navigate("/orders");
  };

  return (
    <>
      <div  id="homehead" className="d-flex justify-content-between">
        <h1 id="headmain">Insightify</h1>
        <div className="aboutImage">
          <span>About us</span>{" "}
          <img src={aboutusImage} alt="about" width="40px"/>
        </div>
      </div>
      <div className="d-flex homemain">
        <div className="col-5 leftdiv"></div>
        <div className="col-7 rightdiv">
          <h1>Hey there,</h1>
          <p>
            New orders are waiting for you. Tap on See Orders to review and
            finish your orders."
          </p>
          <div className="d-flex homebtndiv">
            <button className="col-6 ordersbtn" onClick={orderClick}>
              See Orders
            </button>
            <div className="col-6 contactbtn">Contact us</div>
          </div>
        </div>
      </div>
      <div className="homediv">
        <Link to="/billing" className="text-decoration-none text-white">
          <div className="homeText">
            <h3 className="">Simplified Delivery Experience</h3>
            <p className="homePara">
              <span>Say goodbye to order confusion!</span>
              <span>
                Our user-friendly interface ensures seamless food ordering,
              </span>
              <span>
                eliminating the need for guessing who placed the order.
              </span>
            </p>
            <div>
              <span>
                <b>Try now</b>
              </span>
              <span>
                <b>
                  <img
                    src={forwardArrow}
                    alt="forward arrow"
                    width="40px"
                  ></img>
                </b>
              </span>
            </div>
          </div>
        </Link>
      </div>
      <div className="faqmaindiv">
        <div className="faqdiv">
          <h1>FAQ’s</h1>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  <strong> How to accept the order from orders menu?</strong>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the first item's accordion body.</strong> It
                  is shown by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <strong>
                    What should i do if the ordered item is not available in the
                    kitchen or out of stock?
                  </strong>
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  If the ordered item is out of stock, contact the Restaurant
                  manager or the kitchen manager to replace the order.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <strong>
                    {" "}
                    The bill is in pending but the items are prepared? What
                    should i do?
                  </strong>
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
