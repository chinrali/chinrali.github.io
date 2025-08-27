document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const payButton = document.getElementById('pay-button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const quantityInput = button.previousElementSibling;
            const quantity = parseInt(quantityInput.value, 10);

            if (quantity > 0) {
                addToCart(name, price, quantity);
            }
        });
    });

    payButton.addEventListener('click', () => {
        alert('Lo sentimos, estamos borrachos');
    });

    function addToCart(name, price, quantity) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCart();
    }

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}€`;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Quitar';
            removeButton.style.cssText = 'background: #555; color: #fff; border: none; padding: 3px 8px; border-radius: 3px; cursor: pointer;';
            removeButton.onclick = () => removeFromCart(item.name);

            li.appendChild(removeButton);
            cartItemsElement.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotalElement.textContent = total.toFixed(2);
    }
    
    function removeFromCart(name) {
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex > -1) {
            const item = cart[itemIndex];
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }
        }
        updateCart();
    }
});
