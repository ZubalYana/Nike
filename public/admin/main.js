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
            <h3>${el.name}</h3>
            <h3>${el.phone}</h3>
            <h3 class='orderItems'></h3>
            <div>${sum}</div>
        </div>`
        )
        
        for(let item of el.list){
            $('.orderItems').append(
                
                `<h3 class='orderItem'
                <div>${item.name}</div>

                </h3>
                `
            )
        }
    }
    
})

