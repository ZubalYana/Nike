let db = [];
$('.cartPopup').hide(0);
$('.cardPopupContainer_orderBtn').hide(0);


axios.get('/getGoodsData')
.then(response => {
    for(let el of response.data){
        db.push(el);
        $('.productContainer').append(
            `<div class="productItem">
            <div class='productItem_imgBg' style="background-color: ${el.backGroundColor};">
            <img class='sneakersImg' src='${el.img}' style="width: 200px; height: ${el.picHeight}px; margin-top: -35px" ></div>
            <div class='productItem_infoContainer'>
            <h3>${el.name}</h3>
            <div class='productItem_prices'>
            <p>$${el.price}</p>
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
            <button class='addItem' id='${el.time}'><i class="fa-solid fa-cart-shopping"></i>Add to cart</button>
            </div>
            </div>`
        )
    }
    console.log(db);
    console.log(response.data);

    let cardList = [];
$('.addItem').click((e)=>{

    $('#cartPopup_ordersContainer_h3').html('You chose:')
    $('.cardPopupContainer_orderBtn').show(1);
    for(let el of db){
        if(el.time == e.target.id){
            cardList.push(el);
            console.log(cardList)
            $('.cartPopup_ordersContainer_orders').append(
                `
                <div class="cardPopupContainer_order">
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
$('.xmark3').click(()=>{
    $('.cartPopup').slideUp(500);
    setTimeout(() => {
        $('.cartPopup_orderDetails').css('display', 'none')
        $('.cartPopup_ordersContainer').css('display', 'flex')
    }, 500);

    $('#userName').val('');
    $('#phone').val('');
    $('#cardNum').val('');
    $('#expiryDate').val('');
    $('#securityCode').val('');
    $('#postOffice').val('');
    cardList = [];
    showCartInner(cardList);
    $('#header_icons_cardCount').text(`${cardList.length}`);
    $('.cartPopup_ordersContainer_orders').empty();
    $('.cardPopupContainer_orderBtn').hide(0);
    $('#cartPopup_ordersContainer_h3').html('You have no orders now. Check our goods!')
    $('.cartPopup_orderDetails_infoContainer').empty();
})



$('#confirmBtn').click(()=>{
    if ($('#userName').val() != '' && $('#phone').val() != '' && $('#cardNum').val() != '' && $('#expiryDate').val() != '' && $('#securityCode').val() != ''){
        let currentDate = new Date();
        let expectedArrivalDate = new Date(currentDate);
        expectedArrivalDate.setDate(currentDate.getDate() + 2);
        let day = expectedArrivalDate.getDate();
        let month = expectedArrivalDate.getMonth() + 1; 
        let year = expectedArrivalDate.getFullYear();
        let formattedDate = day + '/' + month + '/' + year;

        console.log(cardList)
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
    }else{
        alert('Fill in the info!')
    }

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

    

})
.catch(error => {
    console.error('Error:', error);
});
