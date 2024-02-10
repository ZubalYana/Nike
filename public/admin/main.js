axios.get('http://localhost:3000/getorders')
.then(res => {
    console.log(res.data)
    for(let el of res.data){
        let str = '';
        for(let item of el.list){
            str += item.name + ' ';
        }
        let sum = 0;
        for(let item of el.list){
            sum += item.price;
        }
        $('.ordersContainer').append(
            `<div class="orderElement">
            <img class='orderElement_userImg' src="./img/userImg.png">
            <div class='orderElement_nameAndPhoneCon'>
            <h3 class='orderElement_name'>${el.name}</h3>
            <h3 class='orderElement_phone'>${el.phone}</h3>
            </div>
            <div class='separativeLine'></div>

            <h3 class='orderItems'></h3>
            <div>$${sum}</div>
        </div>`
        )
        
        for(let item of el.list){
            $('.orderItems').append(
                
                `<div class='orderItem'>
                <div class='orderItem_orderElName'>${item.name}</div>

                </div>
                `
            )
        }
    }
    
})

