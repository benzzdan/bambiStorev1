import {
    Customer
} from 'conekta';

const MoltinGateway = require('@moltin/sdk').gateway;

let client_id = 'dZagSTdB7VhiFB4vDJ80rtkutUQdCFLJ9xom1u8b2H';
let client_secret: '8u9gGYDSiyNsaKBwRWsIrQFcW6Su0Lpt5520lm409V';

if (process.env.REACT_APP_MOLTIN_CLIENT_ID) {
    client_id = process.env.REACT_APP_MOLTIN_CLIENT_ID;
}

const Moltin = MoltinGateway({
    client_id,
    client_secret
});

const customer = {
    email: 'john@moltin.com',
    name: 'John Doe'
}

const billing = {

    first_name: 'John',
    last_name: 'Doe',
    line_1: '2nd Floor British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle Upon Tyne',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'United Kingdom'

}

const shipping = {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '2nd Floor British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle Upon Tyne',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'United Kingdom'

}



export const GetProducts = () =>
    Moltin.Products.With('files, main_images, collections').All();

// export const GetProducts = () => Moltin.Products.All();

export const GetCategories = () => Moltin.Categories.All();

export const GetCollections = () => Moltin.Collections.All();

export const AddCart = (id, quantity) => Moltin.Cart().AddProduct(id, quantity);

export const UpdateCartPlus = (ID, quantity) =>
    Moltin.Cart().UpdateItemQuantity(ID, quantity + 1);

export const UpdateCartMinus = (ID, quantity) =>
    Moltin.Cart().UpdateItemQuantity(ID, quantity - 1);

export const UpdateCart = (ID, quantity) =>
    Moltin.Cart().UpdateItemQuantity(ID, quantity);

export const GetCartItems = () => Moltin.Cart().Items();

export const Checkout = data => Moltin.Cart().Checkout(data.customer, data.billing_address, data.shipping_address);


export const OrderPay = (ID, data) => Moltin.Orders.Payment(ID, data);

export const UpdateOrder = (ID, data) => Moltin.Orders.Update(ID, data);

export const DeleteCart = () => Moltin.Cart().Delete();


//Getting only new products collection
// export const GetNewProducts = () => Moltin.Collections.Get('cf3652b9-0f99-472e-a8e7-5d03c17271bf');