import React, { useEffect, useState } from "react";
import { db } from "../Firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import pendingIcon from "../images/Prop=Light.png";
import timeIcon from "../images/varient=Light.png";
import tableIcon from "../images/Property1=Light.png";
import { TimeConvert } from "./TimeConvert";
import { Link } from "react-router-dom";
import Task from "../images/Task.png";

export default function CompletedBills() {
  const [users, setUsers] = useState([]);
  const [finishedBills, setFinishedBills] = useState([]);
  // const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [showOrders, setShowOrders] = useState(-1);
  const [pendingOrders, setPendingOrders] = useState(-1);

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
            ...doc.data(),
          })
        );
        setUsers(
          userData.filter(
            (item) =>
              item.orderStatus === "ACCEPTED" &&
              item.orderAcceptedTime !== null &&
              item.orderFinishedTime !== null &&
              item.paymentStatus === "PENDING"
          )
        );
        setFinishedBills(
          userData.filter(
            (item) =>
              item.orderStatus === "ACCEPTED" &&
              item.orderAcceptedTime !== null &&
              item.orderFinishedTime !== null &&
              item.paymentStatus === "ACCEPTED"
          )
        );
      } catch (error) {
        setError("Error fetching users");
      }
    };
    getUsersData();
  }, []);

  const finishOrder = async (id, status) => {
    const orderDoc = doc(db, "ORDERS", id);
    const paymentStatus = { paymentStatus: status };
    console.log("Updated the Data on System");
    await updateDoc(orderDoc, paymentStatus);
    console.log("Updated the Data on the Server");
    window.location.reload(false);
  };


  return (
    <>
      <h1 id="orderhead">Completed Bills <Link to="/billing" className="text-decoration-none text-dark"><span style={{fontSize:"18px"}}>Back</span></Link></h1>
      <div className="orders">
       
       
        {/*Finished */}
        <div>
          <div className="pendingdiv">
            <div className="d-flex">
              <p id="pending">
                {" "}
                <img src={Task} alt="Pending Icon" width="40px" /> Finished
              </p>
            </div>
          
          </div>
          <div className="ordershistory">
            {finishedBills.length > 0 ? (
              finishedBills
              .sort((a, b) => {
                // Convert seconds and nanoseconds to total milliseconds for both orders
                const timeA = a.orderTime.seconds * 1000 + a.orderTime.nanoseconds / 1e6;
                const timeB = b.orderTime.seconds * 1000 + b.orderTime.nanoseconds / 1e6;
                // Sort in descending order (most recent first)
                return timeB - timeA;
              })
              .map((item, index) => (
                <div
                  className="order2"
                  key={index}
                  onClick={() => {
                    setPendingOrders(prevIndex => {
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
                      Order served at{"  "}
                      <TimeConvert
                        seconds={item.orderFinishedTime.seconds}
                        nanoseconds={item.orderFinishedTime.nanoseconds}
                      />
                    </div>
                  </div>
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
                      Payment Completed
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
}
