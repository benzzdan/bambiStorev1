import React, {
    Component
} from 'react';

class OrderSummary extends Component {

    render() {
        const orderID = localStorage.getItem('orderID');
        const orderAmount = localStorage.getItem('orderAmount');
        const orderAuthCode = localStorage.getItem('orderAuthCode');

        console.log('This is the order ID: ' + orderID);
        //TODO: Arreglar la vista de la confirmacion de orden
        return (
            <div>
                <h1> Gracias por su Orden </h1>
                <p>Informacion de la orde:</p>
                <p>ID de la orden: {orderID}</p>
                <p>Total de la orden: $ {orderAmount}</p>
                <p>Codigo de la orden: {orderAuthCode}</p>
            </div >
        );
    }
}

export default OrderSummary;