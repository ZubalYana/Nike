let db = [
    {
        id: 1,
        name: 'Nike Air',
        price: '$180',
        img: './imgs/nike air.png',
        bg: '#7BE498',
        previousPrice: '$289',
    },
    {
        id: 2,
        name: 'Air Jordan',
        price: '$199',
        img: './imgs/air jordan.png',
        bg: '#F5E6FF',
        previousPrice: '$289',
    },
    {
        id: 3,
        name: 'Nike Nitro',
        price: '$135',
        img: './imgs/nike netro.png',
        bg: '#F7C29B',
        previousPrice: '$289',
    },
    {
        id: 4,
        name: 'Air Spain',
        price: '$149',
        img: './imgs/nike spain.png',
        bg: '#68EAEB',
        previousPrice: '$199',
    },
];

for(let el of db){
    $('.productContainer').append(
        `<div class="productItem">
        <div class='productItem_imgBg'>
        <img class='sneakersImg' src='${el.img}' ></div>
        <div class='productItem_infoContainer'>
        <h3>${el.name}</h3>
        <div class='productItem_prices'>
        <p>${el.price}</p>
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
        <button class='addItem' id='${el.id}'><img class='sneakersBtnIcon' src='./imgs/sneakersBtn icon.png'>Add to cart</button>
        </div>
        </div>`
    )
}


let cardList = [];
$('.addItem').click((e)=>{
    for(let el of db){
        if(el.id == e.target.id){
            cardList.push(el);
        }
    }
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
    let data = {
        list: cardList,
        name: $('#userName').val(),
        phone: $('#phone').val(),
    }
    axios.post('http://localhost:3000/save-order', data)
})