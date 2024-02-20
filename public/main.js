let db = [
    {
        id: 1,
        name: 'Nike Air',
        price: 180,
        img: './imgs/nike air.png',
        bg: '#7BE498',
        previousPrice: '$289',
        backGroundColor: '#7BE498',
        picWidth: 354,
        picHeight: 312, 
    },
    {
        id: 2,
        name: 'Air Jordan',
        price: 199,
        img: './imgs/air jordan.png',
        bg: '#F5E6FF',
        previousPrice: '$289',
        backGroundColor: '#F5E6FF',
        picWidth: 322,
        picHeight: 265, 
    },
    {
        id: 3,
        name: 'Nike Nitro',
        price: 135,
        img: './imgs/nike netro.png',
        bg: '#F7C29B',
        previousPrice: '$289',
        backGroundColor: '#F7C29B',
        picWidth: 447,
        picHeight: 448, 
    },
    {
        id: 4,
        name: 'Air Spain',
        price: 149,
        img: './imgs/nike spain.png',
        bg: '#68EAEB',
        previousPrice: '$199',
        backGroundColor: '#68EAEB',
        picWidth: 336,
        picHeight: 284, 
    },
];
$('.cartPopup').hide(0);
for(let el of db){
    $('.productContainer').append(
        `<div class="productItem">
        <div class='productItem_imgBg' style="background-color: ${el.backGroundColor};">
        <img class='sneakersImg' src='${el.img}' style="width: ${el.picWidth}px; height: ${el.picHeight}px; margin-right: 22px" ></div>
        <div class='productItem_infoContainer'>
        <h3>${el.name}</h3>
        <div class='productItem_prices'>
        <p>$${el.price}</p>
        <p class='previousPrice'><s>${el.previousPrice}</s></p>
        </div>
        <div class="colorsContainer">
        <div class="colorBtn">color</div>
        <div class="colorsCircles">
            <div class="colorCircle" id="main"></div>
            <div class="colorCircle" id="red"></div>
            <div class="colorCircle" id="orange"></div>
            <div class="colorCircle" id="yellow"></div>
            <div class="colorCircle" id="green"></div>
        </div>
    </div>
        <button class='addItem' id='${el.id}'><i class="fa-solid fa-cart-shopping"></i>Add to cart</button>
        </div>
        </div>`
    )

}
let cardList = [];
$('.addItem').click((e)=>{
    for(let el of db){
        if(el.id == e.target.id){
            cardList.push(el);
            $('.cartPopup_ordersContainer_orders').append(
                `<div class="cardPopupContainer_order">
                <div class="cardPopupContainer_order_textPart">
                    <h2>${el.name}</h2>
                    <h3 class="cartPopup_ordersContainer_price">$${el.price}</h3>
                    <div class="cardPopupContainer_order_buttons">
                        <button class="order_btn">View</button>
                        <button class="order_btn">Delete</button>
                    </div>
                </div>
                <img class="cardPopupContainer_orderImg" src="${el.img}" alt="">
        
            </div>`
            )
        }
    }
    let totalPrice = 0;
    $.each(cardList, function(index, product) {
        const price = Number(product.price);
        totalPrice += price;
    });
    $('#confirmBtn').text(`Pay: $${totalPrice}`)
    $('#header_icons_cardCount').text(`${cardList.length}`);
})
function showCartInner(cardList){
    $('.cardPopupContainer').empty();
    for(let el of cardList){
        $('.cardPopupContainer').append(
            `<div>${el.name}</div>`
        )
    }
}
$('#confirmBtn').click(()=>{
    let currentDate = new Date();
    let expectedArrivalDate = new Date(currentDate);
    expectedArrivalDate.setDate(currentDate.getDate() + 2);
    let day = expectedArrivalDate.getDate();
    let month = expectedArrivalDate.getMonth() + 1; 
    let year = expectedArrivalDate.getFullYear();
    let formattedDate = day + '/' + month + '/' + year;

    let data = {
        list: cardList,
        name: $('#userName').val(),
        phone: $('#phone').val(),
        cardNum: $('#cardNum').val(),
        expiryDate: $('#expiryDate').val(),
        securityCode: $('#securityCode').val(),
        postOffice: $('#postOffice').val(),
        time: Date.now(),
    }
    console.log(data.time);
    axios.post('http://localhost:3000/save-order', data)
    
    $('.cartPopup_paymentContainer').css('display', 'none')
    $('.cartPopup_orderDetails').css('display', 'flex')


    $('.cartPopup_orderDetails_infoContainer').append(
        `<h3>Your order was successful! Here is your info:</h3>
        <h5>Name: ${$('#userName').val()}</h5>
        <h5>Phone:  ${$('#phone').val()}</h5>
        <h5>Post Office: ${$('#postOffice').val()}</h5>

        <h5>Expected arrival date: ${formattedDate}</h5>
        <p>*We could phone you or send a message to clarify some details of your order.</p>`
    )
})
$('#cart').click(()=>{
    $('.cartPopup').slideToggle(500);
})
$('.xmark').click(()=>{
    $('.cartPopup').slideUp(500);

})
$('.cardPopupContainer_orderBtn').click(()=>{
    $('.cartPopup_ordersContainer').css('display', 'none')
    $('.cartPopup_paymentContainer').css('display', 'flex')
})
$('.xmark2').click(()=>{
    $('.cartPopup_ordersContainer').css('display', 'flex')
    $('.cartPopup_paymentContainer').css('display', 'none')
})
$('.xmark3').click(()=>{
    $('.cartPopup').slideUp(500);
    setTimeout(() => {
        $('.cartPopup_orderDetails').css('display', 'none')
        $('.cartPopup_ordersContainer').css('display', 'flex')
    }, 500);


})


    
