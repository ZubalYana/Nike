axios.get('http://localhost:3000/getorders')
.then(res => {
    console.log(res.data)

    for(let el of res.data){
        console.log(el)
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

            <div class='orderItems'></div>
            <div class='separativeLine'></div>

            <div class='orderElement_orderSum'>$${sum}</div>
            <div class='separativeLine'></div>
            <div class='orderElement_orderTime'>Order time:${el.orderTime}</div>


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

