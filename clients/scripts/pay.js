

window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const payButton = document.getElementById("pay");

    paypal.Buttons({
        // Order is created on the server and the order id is returned
        createOrder() {
          return fetch(window.env.host + "/api/paypal/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
              cart: [
                {
                  buyer: "test",
                  amount: 100,
                  sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                  quantity: "YOUR_PRODUCT_QUANTITY",
                },
              ],
            }),
          })
          .then((response) => response.json())
          .then((order) => order.id);
        },
        // Finalize the transaction on the server after payer approval
        onApprove(data) {
          return fetch(window.env.host + "/api/paypal/success", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID,
              data: data
            })
          })
          .then((response) => response.json())
          .then((orderData) => {
            // Successful capture! For dev/demo purposes:
//            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
//            const transaction = orderData.purchase_units[0].payments.captures[0];
//            alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
            // When ready to go live, remove the alert and show a success message within this page. For example:
             const element = document.getElementById('paypal-pay-button-alert');
             element.innerHTML = '<h3>Thank you for your payment!</h3>';
            // Or go to another URL:  window.location.href = 'thank_you.html';
          });
        }
      }).render('#paypal-pay-button');

    
})