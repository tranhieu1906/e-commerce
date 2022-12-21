async function showCart(id) {
  try {
    const { data: response } = await axios.get(
      `http://localhost:3000/user/home/show-cart`
    );
    let data = response.data[0].items;
    let html = "";
    data.forEach((element, index) => {
      html += `<li class="clearfix">
                    <a href="/user/single/product">
                        <img src="/images/product/product@1x.jpg" alt="Product">
                        <span class="mini-item-name">${
                          element.product.title
                        }</span>
                        <span class="mini-item-price">${element.product.price.toLocaleString(
                          "it-IT",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}</span>
                        <span class="mini-item-quantity"> x ${
                          element.quantity
                        } </span>
                    </a>
                </li>`;
    });

    document.getElementById("list-cart").innerHTML = html;
  } catch (error) {
    console.log(error);
  };
  try {
    const { data: response } = await axios.get(
      `http://localhost:3000/user/home/cart-total`
    );
    let html = ` <span class="mini-total-heading float-left">Total:</span>
                <span class="mini-total-price float-right">${response.data.toLocaleString(
                  "it-IT",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                )}</span>`;
    

    document.getElementById("total-cart").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}
