let db = [
    {
        id: 1,
        name: 'Nike Air',
        price: 180
    },
    {
        id: 2,
        name: 'Air Jordan',
        price: 199
    },
    {
        id: 3,
        name: 'Nike Nitro',
        price: 135
    },
    {
        id: 4,
        name: 'Air Spain',
        price: 149
    },
];

for(let el of db){
    $('.productContainer').append(
        `<div class="productItem">
        <h3>${el.name}</h3>
        <p>${el.price}</p>
        <button class='addItem' id='${el.id}'>Add to cart</button>
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
    $('#cart').text(`Cart ${cardList.length}`);
})