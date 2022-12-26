import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {
    CheckoutItemContainer,
    ImageContainer,
    BaseSpan,
    Quantity,
    Value,
    Arrow,
    RemoveButton,
} from './checkout-item.styles.jsx';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;

    const { clearItemFromCart, addItemToCart, removeItemFromCart } =
        useContext(CartContext);

    const addItemHandler = () => {
        addItemToCart(cartItem);
    };
    const removeItemHandler = () => {
        removeItemFromCart(cartItem);
    };
    const clearItemHander = () => {
        clearItemFromCart(cartItem);
    };
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHander}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;
