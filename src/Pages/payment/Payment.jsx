import React from 'react'
import Test from './Test'
import Axios, { loadScript } from './Helpers'

export default function Payment() {

    const order = async (e) => {
        try {
            e.preventDefault()
            const { data } = await Axios.post('user/createOrder', {
                "address": {
                    "street": "123 Main Street",
                    "buildingFloor": "3rd Floor",
                    "houseOrFlatNumber": "A-302",
                    "landmark": "Near Central Park",
                    "city": "New York",
                    "state": "NY",
                    "postalCode": "10001",
                    "country": "USA",
                    "phone": "+1 212-555-7890",
                    "identifier": "Home"
                }
            })

            if (!data.status) throw new Error("Failed to create order");
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );
            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }

debugger
            const options = {
                key: "rzp_test_8yAxkM6TR2ggyI",
                amount: data.data.amount,
                currency: data.data.currency,
                name: "Your Company",
                description: "Payment for Order",
                order_id: data.data.id,
                handler: async function (response) {
                    debugger
                    const verifyRes = await Axios.post("user/verify-payment", response);
                    if (verifyRes.data.status) {
                        alert("Payment successful!");
                    } else {
                        alert("Payment verification failed.");
                    }

                },
                prefill: {
                    name: "saju",
                    email: "saju@example.com",
                    contact: "971XXXXXXXXX",
                },
                theme: { color: "#3399cc" },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <Test />
            <button onClick={order}>Create ORDER</button>

        </div>
    )
}
