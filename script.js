// Function to get the menu
function getMenu() {
    return fetch('menu.json')
      .then(response => response.json())
      .then(menu => {
        const menuContainer = document.getElementById('menu-container');
        menu.forEach(item => {
          const menuItem = document.createElement('div');
          menuItem.classList.add('menu-item');
          
          const img = document.createElement('img');
          img.src = item.image;
          menuItem.appendChild(img);
          
          const name = document.createElement('h3');
          name.textContent = item.name;
          menuItem.appendChild(name);
          
          const description = document.createElement('p');
          description.textContent = item.description;
          menuItem.appendChild(description);
          
          const price = document.createElement('p');
          price.textContent = '$' + item.price.toFixed(2);
          menuItem.appendChild(price);
          
          menuContainer.appendChild(menuItem);
        });
      })
      .catch(error => {
        console.error('Error fetching menu:', error);
      });
  }
  
  // Function to handle taking the order
  function takeOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const burgers = ['Burger A', 'Burger B', 'Burger C'];
        const randomBurgers = [];
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * burgers.length);
          randomBurgers.push(burgers[randomIndex]);
        }
        const order = {
          burgers: randomBurgers
        };
        resolve(order);
      }, 2500);
    });
  }
  
  // Function to handle order preparation
  function orderPrep() {
    return new Promise(resolve => {
      setTimeout(() => {
        const orderStatus = {
          order_status: true,
          paid: false
        };
        resolve(orderStatus);
      }, 1500);
    });
  }
  
  // Function to handle payment
  function payOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const orderStatus = {
          order_status: true,
          paid: true
        };
        resolve(orderStatus);
      }, 1000);
    });
  }
  
  // Function to display thank you message
  function thankyouFnc() {
    alert('Thank you for eating with us today!');
  }
  
  // Function to handle the ordering process
  async function handleOrder() {
    try {
      const orderScreen = document.getElementById('order-screen');
      const preparationScreen = document.getElementById('preparation-screen');
      const servingScreen = document.getElementById('serving-screen');
      const paymentScreen = document.getElementById('payment-screen');
  
      const orderBtn = document.getElementById('order-btn');
      const prepareBtn = document.getElementById('prepare-btn');
      const serveBtn = document.getElementById('serve-btn');
      const paymentBtn = document.getElementById('payment-btn');
      const thankyouBtn = document.getElementById('thankyou-btn');
  
      orderBtn.addEventListener('click', async () => {
        orderBtn.disabled = true;
        const order = await takeOrder();
        const orderDetails = document.getElementById('order-details');
        orderDetails.textContent = `Order: ${order.burgers.join(', ')}`;
        orderScreen.classList.remove('active');
        preparationScreen.classList.add('active');
      });
  
      prepareBtn.addEventListener('click', async () => {
        prepareBtn.disabled = true;
        const orderStatus = await orderPrep();
        const preparationStatus = document.getElementById('preparation-status');
        preparationStatus.textContent = 'Preparation Status: Order prepared and cooking in progress.';
        preparationScreen.classList.remove('active');
        servingScreen.classList.add('active');
      });
  
      serveBtn.addEventListener('click', async () => {
        serveBtn.disabled = true;
        const paymentStatus = await payOrder();
        const servingStatus = document.getElementById('serving-status');
        servingStatus.textContent = 'Serving Status: Food served to the customer.';
        servingScreen.classList.remove('active');
        paymentScreen.classList.add('active');
      });
  
      paymentBtn.addEventListener('click', async () => {
        paymentBtn.disabled = true;
        const paymentStatus = await payOrder();
        const paymentStatusElement = document.getElementById('payment-status');
        paymentStatusElement.textContent = 'Payment Status: Payment successful.';
        paymentScreen.classList.remove('active');
        thankyouFnc();
      });
  
      const menuScreen = document.getElementById('menu-screen');
      menuScreen.classList.add('active');
      await getMenu();
    } catch (error) {
      console.error('Ordering process error:', error);
    }
  }
  
  // Call the handleOrder function to start the ordering process
  handleOrder();
  