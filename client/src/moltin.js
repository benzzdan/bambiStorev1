const MoltinGateway = require('@moltin/sdk').gateway;

let client_id = 'dZagSTdB7VhiFB4vDJ80rtkutUQdCFLJ9xom1u8b2H';

if (process.env.REACT_APP_MOLTIN_CLIENT_ID) {
    client_id = process.env.REACT_APP_MOLTIN_CLIENT_ID;
}

const Moltin = MoltinGateway({
    client_id,
    application: 'react-Store'
});

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

//Getting only new products collection
// export const GetNewProducts = () => Moltin.Collections.Get('cf3652b9-0f99-472e-a8e7-5d03c17271bf');

