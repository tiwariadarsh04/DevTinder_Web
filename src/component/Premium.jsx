import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const user = useSelector((store) => store?.user?.user);
  const [isUserPremium, setIsUserPremium] = useState(false);
  console.log("Frist Render");

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      // console.log("Order is :", order);
      const { keyId } = order.data;

      const { orderId, amount } = order?.data?.order;

      const { firstName, lastName, emailId } = order?.data?.order?.notes;

      // console.log(keyId, orderId, amount, firstName, lastName, emailId);

      const options = {
        key: keyId, // Enter the Key ID generated from the Dashboard
        amount: amount, 
        currency: "INR",
        name: "DevTinder", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId,
        // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: firstName + " " + lastName, //your customer's name
          email: emailId,
          contact: "9000090000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async (response) => {
          try {
            const paymentVerifyOptions = {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            };

            const verifyPaymentResponse = await axios.post(
              BASE_URL + "/payment/verify",
              paymentVerifyOptions,
              { withCredentials: true }
            );

            console.log("Verify Paymet Resoponse is :", verifyPaymentResponse);

            if (verifyPaymentResponse.data?.paymentVerified) {
              // payment verified
              // i can navigate the user on other page
              console.log(
                "Payment verified and you have been successfully inrolled in the course"
              );
              setIsUserPremium(true);
            }
          } catch (error) {
            console.log("Error in payment verificition handler :", error);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Hello Error in creating an Order :", error);
    }
  };

  if (!user) return;

  if (user?.isPremium) {
    return (
      <div className="m-10">
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{`${user?.firstName} You're are already a premium user`}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="m-10">
      {isUserPremium ? (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{`${user?.firstName} Your purchase has been confirmed!`}</span>
        </div>
      ) : (
        <div className="flex w-full">
          <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
            <h1 className="font-bold text-3xl">Silver Membership</h1>
            <ul>
              <li> - Blue Tick</li>
              <li> - 3 months</li>
            </ul>
            <button
              onClick={() => handleBuyClick("silver")}
              className="btn btn-secondary"
            >
              Buy Silver
            </button>
          </div>
          <div className="divider divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
            <h1 className="font-bold text-3xl">Gold Membership</h1>
            <ul>
              <li> - Blue Tick</li>
              <li> - 6 months</li>
            </ul>
            <button
              onClick={() => handleBuyClick("gold")}
              className="btn btn-primary"
            >
              Buy Gold
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premium;
