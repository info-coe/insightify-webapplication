import React, { useEffect, useState } from "react";
import { db } from "../Firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import Task from "../images/Task.png";
import timeIcon from "../images/varient=Light.png";
import tableIcon from "../images/Property1=Light.png";
import { TimeConvert } from "./TimeConvert";
import { Link } from "react-router-dom";

export default function Finishedorders() {
    const [users, setUsers] = useState([]);
    // const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const [showOrders, setShowOrders] = useState(-1);
  
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
                item.orderFinishedTime !== null
            )
          );
        } catch (error) {
          setError("Error fetching users");
        }
      };
      getUsersData();
    }, []);
  
    return (
      <>
        <h1 id="orderhead">Confirm Orders <Link to="/orders" className="text-decoration-none text-dark"><span style={{fontSize:"18px"}}>Back</span></Link></h1>
        <div className="orders">
        <div className="pendingdiv">
            <div className="d-flex">
              <p id="pending">
                {" "}
                <img src={Task} alt="Pending Icon" width="40px" /> Finished
              </p>
            </div>
          </div>
          {( users.length>0) ?(
          <div className="order1">
            <p>
              Tap on the order to see, Order details and information about the
              order.
            </p>
          </div>
          ) : (<h5 className="text-center p-2"><b>No orders</b></h5>)
          }
          <div className="ordershistory mt-3">
          {users.length > 0 ? (
              users.map((item, index) => (
                <div
                  className="order2"
                  key={index}
                  onClick={() => {
                    setShowOrders(prevIndex => {
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
                        <b>${item.amount.Dollars}</b>
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
                  {index === showOrders && (
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
                          <li key={index1}>{Object.keys(item1)} : ${Object.values(item1)}</li>
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
                          <li key={index1}>{Object.keys(item1)} : ${Object.values(item1)}</li>
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
                          <li key={index1}>{Object.keys(item1)} : ${Object.values(item1)}</li>
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
                          <li key={index1}>{Object.keys(item1)} : ${Object.values(item1)}</li>
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
                          <li key={index1}>{Object.keys(item1)} : ${Object.values(item1)}</li>
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
                      Order served at {" "}                       
                      <TimeConvert
                          seconds={item.orderFinishedTime.seconds}
                          nanoseconds={item.orderFinishedTime.nanoseconds}
                        />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h5 className="text-center p-2"><b>No orders</b></h5>
            )}
          </div>
        </div>
      </>
    );
}
