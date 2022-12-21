async function myFunction(id, idUser) {
  try {
    const { data: response } = await axios.get(
      `http://localhost:3000/user/home/add-cart/${id}`
    );
    console.log(response.data);
    let html = `            <div class="modal-body">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <!-- Product-zoom-area -->
                  <div class="zoom-area">
                    <img loading="lazy" id="zoom-pro-quick-view" class="img-fluid" src="/images/product/product@4x.jpg"
                      data-zoom-image="/images/product/product@4x.jpg" alt="Zoom Image">
                  </div>
                  <!-- Product-zoom-area /- -->
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <!-- Product-details -->
                  <div class="all-information-wrapper">
                    <div class="section-1-title-breadcrumb-rating">
                      <div class="product-title">
                        <h1>
                          <a href="/user/single/product">${
                            response.data.title
                          }</a>
                        </h1>
                      </div>
                      <ul class="bread-crumb">
                        <li class="has-separator">
                          <a href="">Home</a>
                        </li>
                        <li class="has-separator">
                          <a href="/user/shop-v1">Men's Clothing</a>
                        </li>
                        <li class="has-separator">
                          <a href="shop-v2-sub-category.html">Tops</a>
                        </li>
                        <li class="is-marked">
                          <a href="shop-v3-sub-sub-category.html">Hoodies</a>
                        </li>
                      </ul>
                      <div class="product-rating">
                        <div class='star' title="4.5 out of 5 - based on 23 Reviews">
                          <span style='width:67px'></span>
                        </div>
                        <span>(23)</span>
                      </div>
                    </div>
                    <div class="section-2-short-description u-s-p-y-14">
                      <h6 class="information-heading u-s-m-b-8">Description:</h6>
                      <p>${response.data.description}
                      </p>
                    </div>
                    <div class="section-3-price-original-discount u-s-p-y-14">
                      <div class="price">
                        <h4>${response.data.price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}</h4>
                      </div>
                    </div>
                    <div class="section-6-social-media-quantity-actions u-s-p-y-14">
                      <form action="/user/add/cart/${id}" class="post-form" method="post">
                        <div class="quick-social-media-wrapper u-s-m-b-22">
                          <span>Share:</span>
                          <ul class="social-media-list">
                            <li>
                              <a href="#">
                                <i class="fab fa-facebook-f"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="fab fa-twitter"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="fab fa-google-plus-g"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="fas fa-rss"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="fab fa-pinterest"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="quantity-wrapper u-s-m-b-22">
                          <span>Quantity:</span>
                          <div class="quantity">
                            <input type="number" class="quantity-text-field" value="1" min="1" name="quantity">
                          </div>
                        </div>
                        <div>
                          <button class="button button-outline-secondary" type="submit">Add to cart</button>
                          <button class="button button-outline-secondary far fa-heart u-s-m-l-6"></button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <!-- Product-details /- -->
                </div>
              </div>
            </div>`;
    document.getElementById("Product-details").innerHTML = html;

    return response;
  } catch (error) {
    console.log(error);
  }
  
}
