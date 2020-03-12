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
            <div id="highlights" class="row container">
                <h1 class="center"> Gracias por su Orden </h1>
                <p class="light center">Informacion de la orde:</p>
                <p class="light center">ID de la orden: {orderID}</p>
                <p class="light center">Total de la orden: $ {orderAmount}</p>
                <p class="light center">Codigo de la orden: {orderAuthCode}</p>
            </div >
        );
    }
}

export default OrderSummary;