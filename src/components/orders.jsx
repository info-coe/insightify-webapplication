import React, { useEffect, useState } from "react";
import { db } from "../Firebase-config";
import { collection, getDocs, doc, updateDoc } from "@firebase/firestore";
import pendingIcon from "../images/Prop=Light.png";
import timeIcon from "../images/varient=Light.png";
import tableIcon from "../images/Property1=Light.png";
import { TimeConvert } from "./TimeConvert";
import { Link } from "react-router-dom";
import Task from "../images/Task.png";

const Orders = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [showOrders, setShowOrders] = useState(-1);
  const [pendingOrders, setPendingOrders] = useState(-1);
  const [finishOrders, setFinishOrders] = useState(-1);
  const [pendingItem, setPendingItem] = useState([]);
  const [finish, setFinish] = useState([]);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ORDERS"));
        const userData = querySnapshot.docs.map((doc) =>
          // console.log(doc._document.data.value.mapValue.fields)
          ({
            id: doc.id,
            totalAmount: doc.totalAmount,
            customerName: doc.customerName,
            orderAcceptedTime: doc.orderAcceptedTime,
            orderFinishedTime: doc.orderFinishedTime,
            orderID: doc.orderID,
            orderRejectReason: doc.orderRejectReason,
            orderStatus: doc.orderStatus,
            orderTime: doc.orderTime,
            orders: doc.orders,
            tableNumber: doc.tableNumber,
            paymentStatus: doc.paymentStatus,
            paymentType: doc.paymentType,
            taxes: doc.taxes,
            ...doc.data(),
          })
        );
        // console.log(userData);s
        setUsers(
          userData.filter(
            (item) =>
              item.orderStatus === "PENDING" &&
              item.orderAcceptedTime === null &&
              item.orderFinishedTime === null
          )
        );
        setPendingItem(
          userData.filter(
            (item) =>
              item.orderStatus === "ACCEPTED" &&
              item.orderAcceptedTime !== null &&
              item.orderFinishedTime === null
          )
        );
        setFinish(
          userData.filter(
            (item) =>
              item.orderStatus === "ACCEPTED" &&
              item.orderAcceptedTime !== null &&
              item.orderFinishedTime !== null
          )
        );
      } catch (error) {
        setError("Error fetching users");
      }
    };
    getUsersData();
  }, []);

  console.log(users);
  // console.log(pendingItem);
  // console.log(finish);

  const updateOrder = async (id, status, Timestamp) => {
    const orderDoc = doc(db, "ORDERS", id);
    const orderStatus = { orderStatus: status, orderAcceptedTime: Timestamp };
    console.log("Updated the Data on System");
    await updateDoc(orderDoc, orderStatus);
    console.log("Updated the Data on the Server");
    window.location.reload(false);
  };

  const rejectOrder = async (id, status) => {
    let orderRejectReason = prompt("Enter a reason for rejection");
    while (orderRejectReason === "") {
      orderRejectReason = prompt("Please  enter a valid reason!");
    }
    if (orderRejectReason !== null) {
      const orderDoc = doc(db, "ORDERS", id);
      const orderStatus = {
        orderStatus: status,
        orderRejectReason: orderRejectReason,
      };
      console.log("Updated the Data on System");
      await updateDoc(orderDoc, orderStatus);
      console.log("Updated the Data on the Server");
      window.location.reload(false);
    } else {
      alert("Rejection cancelled");
    }
  };

  const finishOrder = async (id, Timestamp) => {
    console.log(id, Timestamp);
    const orderDoc = doc(db, "ORDERS", id);
    const orderStatus = { orderFinishedTime: Timestamp };
    console.log("Updated the Data on System");
    await updateDoc(orderDoc, orderStatus);
    console.log("Updated the Data on the Server");
    window.location.reload(false);
  };

  // console.log(users);

  return (
    <>
     <div id="orderhead">
     <h1 id="orderhead">Orders <Link to="/home" className="text-decoration-none"><span id="ordersheadmain">Insightify</span></Link></h1>
     {/* <h1 id="headmain">Insightify</h1> */}
     </div>
      <div className="orders">
        <div className="chefdiv">
          <div className="chefText">
            <h3 className="">Hey, Chef</h3>
            <p className="chefPara">
              <span>
                Gratitude for accepting our orders and conjuring up our
                delectable dishes!
              </span>
              <span>
                Your culinaryprowess is truly appreciated, and your efforts are
                savored with every bite.
              </span>
              <span>Cheers to making mealtime a delightful adventure!</span>
            </p>
          </div>
        </div>
        <div className="pendingdiv">
          <div className="d-flex">
            <p id="pending">
              {" "}
              <img src={pendingIcon} alt="Pending Icon" width="40px" /> Pending
            </p>
          </div>
          <div>
            <p id="seemore">
              <Link
                to="/pendingorders"
                className="text-decoration-none text-dark"
              >
                See more
              </Link>
            </p>
          </div>
        </div>
        <div className="ordershistory">
          {pendingItem.length > 0 || users.length > 0 ? (
            <div className="order1">
              <p>
                Tap on the order to see, Order details and information about the
                order.
              </p>
            </div>
          ) : (
            <h5 className="text-center p-2">
              <b>No orders</b>
            </h5>
          )}

          {/*Pending Item History */}
          <div className="ordershistory">
            {pendingItem.length > 0
              ? pendingItem
                  .sort((a, b) => {
                    // Convert seconds and nanoseconds to total milliseconds for both orders
                    const timeA =
                      a.orderTime.seconds * 1000 +
                      a.orderTime.nanoseconds / 1e6;
                    const timeB =
                      b.orderTime.seconds * 1000 +
                      b.orderTime.nanoseconds / 1e6;
                    // Sort in descending order (most recent first)
                    return timeB - timeA;
                  })
                  .reverse()
                  .map((item, index) => (
                    <div
                      className="order2"
                      key={index}
                      onClick={() => {
                        setPendingOrders((prevIndex) => {
                          if (prevIndex === index) {
                            return -1;
                          } else {
                            return index;
                          }
                        });
                      }}
                    >
                      <div className="order2Main">
                        <div>
                          <h5>
                            <b>{item.customerName}</b>
                          </h5>
                          <p>{item.orderID}</p>
                        </div>
                        <div style={{ color: "#B3261E" }}>
                          <h4>
                            <b>${item.totalAmount}</b>
                          </h4>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ padding: "10px 20px 10px 20px" }}
                      >
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#000000",
                          }}
                        >
                          <img src={timeIcon} alt="Time Icon" width="40px" />
                          {
                            <TimeConvert
                              seconds={item.orderTime.seconds}
                              nanoseconds={item.orderTime.nanoseconds}
                            />
                          }
                        </div>
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#000000",
                          }}
                        >
                          <img src={tableIcon} alt="Table Icon" width="40px" />{" "}
                          Table - {item.tableNumber}
                        </div>
                      </div>
                      {/*  */}
                      {index === pendingOrders && (
                        <div
                          style={{
                            width: "100%",
                            padding: "7px",
                            borderRadius: "20px",
                            gap: "30px",
                          }}
                        >
                          {item.orders.soups !== null ? (
                            <>
                              <p
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "600",
                                  lineHeight: "27px",
                                }}
                              >
                                Soups{" "}
                              </p>
                              <ol>
                                {item.orders.soups.map((item1, index1) => (
                                  <li key={index1}>
                                    {Object.keys(item1)} : $
                                    {Object.values(item1)}
                                  </li>
                                ))}
                              </ol>
                            </>
                          ) : null}
                          {item.orders.appetizers !== null ? (
                            <>
                              <p
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "600",
                                  lineHeight: "27px",
                                }}
                              >
                                Appetizers{" "}
                              </p>
                              <ol>
                                {item.orders.appetizers.map((item1, index1) => (
                                  <li key={index1}>
                                    {Object.keys(item1)} : $
                                    {Object.values(item1)}
                                  </li>
                                ))}
                              </ol>
                            </>
                          ) : null}
                          {item.orders.main !== null ? (
                            <>
                              <p
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "600",
                                  lineHeight: "27px",
                                }}
                              >
                                Main Course{" "}
                              </p>
                              <ol>
                                {item.orders.main.map((item1, index1) => (
                                  <li key={index1}>
                                    {Object.keys(item1)} : $
                                    {Object.values(item1)}
                                  </li>
                                ))}
                              </ol>
                            </>
                          ) : null}
                          {item.orders.beverages !== null ? (
                            <>
                              <p
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "600",
                                  lineHeight: "27px",
                                }}
                              >
                                Beverages{" "}
                              </p>
                              <ol>
                                {item.orders.beverages.map((item1, index1) => (
                                  <li key={index1}>
                                    {Object.keys(item1)} : $
                                    {Object.values(item1)}
                                  </li>
                                ))}
                              </ol>
                            </>
                          ) : null}
                          {item.orders.desert !== null ? (
                            <>
                              <p
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "600",
                                  lineHeight: "27px",
                                }}
                              >
                                Desert{" "}
                              </p>
                              <ol>
                                {item.orders.desert.map((item1, index1) => (
                                  <li key={index1}>
                                    {Object.keys(item1)} : $
                                    {Object.values(item1)}
                                  </li>
                                ))}
                              </ol>
                            </>
                          ) : null}
                        </div>
                      )}
                      {/*  */}
                      <div
                        style={{
                          backgroundColor: "#FFD8E4",
                          width: "100%",
                          padding: "7px",
                          borderRadius: "20px",
                          gap: "30px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "24px",
                            fontWeight: "600",
                            lineHeight: "27px",
                            textAlign: "center",
                            margin: "0 5px",
                          }}
                        >
                          Order preparation is in progress.{" "}
                        </p>
                      </div>
                      <div
                        style={
                          {
                            // borderRadius: "20px",
                            // margin: "5px",
                            // fontSize: "20px",
                            // fontWeight: "600",
                            // lineHeight: "27px",
                            // textAlign: "center",
                            // backgroundColor: " #65558F",
                          }
                        }
                      >
                        <button
                          className="penFinishBtn"
                          onClick={() => {
                            finishOrder(item.id, new Date());
                          }}
                        >
                          Finish your order
                        </button>
                      </div>
                    </div>
                  ))
              : // <h5 className="text-center p-2"><b>No orders</b></h5>
                null}
          </div>

          {/*Users Data */}
          {users.length > 0
            ? users
                .slice(0, 3)
                .sort((a, b) => {
                  // Convert seconds and nanoseconds to total milliseconds for both orders
                  const timeA =
                    a.orderTime.seconds * 1000 + a.orderTime.nanoseconds / 1e6;
                  const timeB =
                    b.orderTime.seconds * 1000 + b.orderTime.nanoseconds / 1e6;
                  // Sort in descending order (most recent first)
                  return timeB - timeA;
                })
                .reverse()
                .map((item, index) => (
                  <div
                    className="order2"
                    key={index}
                    onClick={() => {
                      setShowOrders((prevIndex) => {
                        if (prevIndex === index) {
                          return -1;
                        } else {
                          return index;
                        }
                      });
                    }}
                  >
                    <div className="order2Main">
                      <div>
                        <h5>
                          <b>{item.customerName}</b>
                        </h5>
                        <p>{item.orderID}</p>
                      </div>
                      <div style={{ color: "#B3261E" }}>
                        <h4>
                          <b>${item.totalAmount}</b>
                        </h4>
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ padding: "10px 20px 10px 20px" }}
                    >
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          color: "#000000",
                        }}
                      >
                        <img src={timeIcon} alt="Time Icon" width="40px" />
                        {
                          <TimeConvert
                            seconds={item.orderTime.seconds}
                            nanoseconds={item.orderTime.nanoseconds}
                          />
                        }
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          color: "#000000",
                        }}
                      >
                        <img src={tableIcon} alt="Table Icon" width="40px" />{" "}
                        Table - {item.tableNumber}
                      </div>
                    </div>
                    {/*  */}

                    <div
                      className="Parent"
                      style={
                        index === showOrders
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      {item.orders.soups !== null ? (
                        <>
                          <p
                            style={{
                              fontSize: "20px",
                              fontWeight: "600",
                              lineHeight: "27px",
                            }}
                          >
                            Soups{" "}
                          </p>
                          <ol>
                            {item.orders.soups.map((item1, index1) => (
                              <li key={index1}>
                                {Object.keys(item1)} : ${Object.values(item1)}
                              </li>
                            ))}
                          </ol>
                        </>
                      ) : null}
                      {item.orders.appetizers !== null ? (
                        <>
                          <p
                            style={{
                              fontSize: "20px",
                              fontWeight: "600",
                              lineHeight: "27px",
                            }}
                          >
                            Appetizers{" "}
                          </p>
                          <ol>
                            {item.orders.appetizers.map((item1, index1) => (
                              <li key={index1}>
                                {Object.keys(item1)} : ${Object.values(item1)}
                              </li>
                            ))}
                          </ol>
                        </>
                      ) : null}
                      {item.orders.main !== null ? (
                        <>
                          <p
                            style={{
                              fontSize: "20px",
                              fontWeight: "600",
                              lineHeight: "27px",
                            }}
                          >
                            Main Course{" "}
                          </p>
                          <ol>
                            {item.orders.main.map((item1, index1) => (
                              <li key={index1}>
                                {Object.keys(item1)} : ${Object.values(item1)}
                              </li>
                            ))}
                          </ol>
                        </>
                      ) : null}
                      {item.orders.beverages !== null ? (
                        <>
                          <p
                            style={{
                              fontSize: "20px",
                              fontWeight: "600",
                              lineHeight: "27px",
                            }}
                          >
                            Beverages{" "}
                          </p>
                          <ol>
                            {item.orders.beverages.map((item1, index1) => (
                              <li key={index1}>
                                {Object.keys(item1)} : ${Object.values(item1)}
                              </li>
                            ))}
                          </ol>
                        </>
                      ) : null}
                      {item.orders.desert !== null ? (
                        <>
                          <p
                            style={{
                              fontSize: "20px",
                              fontWeight: "600",
                              lineHeight: "27px",
                            }}
                          >
                            Desert{" "}
                          </p>
                          <ol>
                            {item.orders.desert.map((item1, index1) => (
                              <li key={index1}>
                                {Object.keys(item1)} : ${Object.values(item1)}
                              </li>
                            ))}
                          </ol>
                        </>
                      ) : null}
                    </div>

                    {/*  */}

                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          height: "60px",
                        }}
                      >
                        <button
                          className="chefFinishBtn"
                          onClick={() => {
                            rejectOrder(item.id, "REJECTED");
                          }}
                        >
                          Reject order
                        </button>
                        <button
                          className="chefAccepthBtn"
                          onClick={() => {
                            updateOrder(item.id, "ACCEPTED", new Date());
                          }}
                        >
                          Accept order
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            : // <h5 className="text-center p-2"><b>No orders</b></h5>
              null}
        </div>
        {/*Finished */}
        <div>
          <div className="pendingdiv">
            <div className="d-flex">
              <p id="pending">
                {" "}
                <img src={Task} alt="Pending Icon" width="40px" /> Finished
              </p>
            </div>
            <div>
              <p id="seemore">
                <Link
                  to="/finishedorders"
                  className="text-decoration-none text-dark"
                >
                  See more
                </Link>
              </p>
            </div>
          </div>
          <div className="ordershistory">
            {finish.length > 0 ? (
              finish
                .slice(0, 3)
                .sort((a, b) => {
                  // Convert seconds and nanoseconds to total milliseconds for both orders
                  const timeA =
                    a.orderTime.seconds * 1000 + a.orderTime.nanoseconds / 1e6;
                  const timeB =
                    b.orderTime.seconds * 1000 + b.orderTime.nanoseconds / 1e6;
                  // Sort in descending order (most recent first)
                  return timeB - timeA;
                })
                .map((item, index) => (
                  <div
                    className="order2"
                    key={index}
                    onClick={() => {
                      setFinishOrders((prevIndex) => {
                        if (prevIndex === index) {
                          return -1;
                        } else {
                          return index;
                        }
                      });
                    }}
                  >
                    <div className="order2Main">
                      <div>
                        <h5>
                          <b>{item.customerName}</b>
                        </h5>
                        <p>{item.orderID}</p>
                      </div>
                      <div style={{ color: "#B3261E" }}>
                        <h4>
                          <b>${item.totalAmount}</b>
                        </h4>
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ padding: "10px 20px 10px 20px" }}
                    >
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          color: "#000000",
                        }}
                      >
                        <img src={timeIcon} alt="Time Icon" width="40px" />
                        {
                          <TimeConvert
                            seconds={item.orderTime.seconds}
                            nanoseconds={item.orderTime.nanoseconds}
                          />
                        }
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          color: "#000000",
                        }}
                      >
                        <img src={tableIcon} alt="Table Icon" width="40px" />{" "}
                        Table - {item.tableNumber}
                      </div>
                    </div>
                    {/*  */}
                    {index === finishOrders && (
                      <div
                        style={{
                          width: "100%",
                          padding: "7px",
                          borderRadius: "20px",
                          gap: "30px",
                        }}
                      >
                        {item.orders.soups !== null ? (
                          <>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "600",
                                lineHeight: "27px",
                              }}
                            >
                              Soups{" "}
                            </p>
                            <ol>
                              {item.orders.soups.map((item1, index1) => (
                                <li key={index1}>
                                  {Object.keys(item1)} : ${Object.values(item1)}
                                </li>
                              ))}
                            </ol>
                          </>
                        ) : null}
                        {item.orders.appetizers !== null ? (
                          <>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "600",
                                lineHeight: "27px",
                              }}
                            >
                              Appetizers{" "}
                            </p>
                            <ol>
                              {item.orders.appetizers.map((item1, index1) => (
                                <li key={index1}>
                                  {Object.keys(item1)} : ${Object.values(item1)}
                                </li>
                              ))}
                            </ol>
                          </>
                        ) : null}
                        {item.orders.main !== null ? (
                          <>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "600",
                                lineHeight: "27px",
                              }}
                            >
                              Main Course{" "}
                            </p>
                            <ol>
                              {item.orders.main.map((item1, index1) => (
                                <li key={index1}>
                                  {Object.keys(item1)} : ${Object.values(item1)}
                                </li>
                              ))}
                            </ol>
                          </>
                        ) : null}
                        {item.orders.beverages !== null ? (
                          <>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "600",
                                lineHeight: "27px",
                              }}
                            >
                              Beverages{" "}
                            </p>
                            <ol>
                              {item.orders.beverages.map((item1, index1) => (
                                <li key={index1}>
                                  {Object.keys(item1)} : ${Object.values(item1)}
                                </li>
                              ))}
                            </ol>
                          </>
                        ) : null}
                        {item.orders.desert !== null ? (
                          <>
                            <p
                              style={{
                                fontSize: "20px",
                                fontWeight: "600",
                                lineHeight: "27px",
                              }}
                            >
                              Desert{" "}
                            </p>
                            <ol>
                              {item.orders.desert.map((item1, index1) => (
                                <li key={index1}>
                                  {Object.keys(item1)} : ${Object.values(item1)}
                                </li>
                              ))}
                            </ol>
                          </>
                        ) : null}
                      </div>
                    )}
                    {/*  */}

                    <div
                      style={{
                        borderRadius: "20px",
                        margin: "5px",
                        fontSize: "20px",
                        fontWeight: "600",
                        lineHeight: "27px",
                        textAlign: "center",
                        backgroundColor: "#00990F4D",
                      }}
                    >
                      <div
                        style={{
                          padding: "10px",
                          border: "none",
                          color: "#00990F",
                        }}
                      >
                        Order served at{" "}
                        <TimeConvert
                          seconds={item.orderFinishedTime.seconds}
                          nanoseconds={item.orderFinishedTime.nanoseconds}
                        />
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <h5 className="text-center p-2">
                <b>No orders</b>
              </h5>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
