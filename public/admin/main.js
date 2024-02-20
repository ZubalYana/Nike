axios.get('http://localhost:3000/getorders')
.then(res => {
    console.log(res.data)

    for(let el of res.data){
        let time = new Date(el.time)

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
            <div class='orderElement_orderTime'>            <div>${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}</div>
            <div>${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}</div></div>
            <div class='separativeLine'></div>

            <button class='orderElement_btn deleteGood' id="code${el.time}">Delete</button>
            <button class='orderElement_btn' id="archiveGood">Archive</button>

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

    $('.gearPopup_container').hide(0)

    $('#gear').click(()=>{
        $('.gearPopup_container').slideDown(300)
    })
    $('#popupXmark').click(()=>{
        $('.gearPopup_container').slideUp(300)

    })
    $('#addNewGoods').click(()=>{
        $('.gearPopup_firstPage').css('display', 'none');
        $('.gearPopup_secondPage').css('display', 'flex');

    })
    $('#popupXmark2').click(()=>{
        $('#gearPopup_secondPage_addingGoods').css('display', 'none');
        $('.gearPopup_firstPage').css('display', 'flex');

    })
    $('#editExistingGoods').click(()=>{
        $('.gearPopup_firstPage').css('display', 'none');
        $('.gearPopup_EditingPage').css('display', 'flex');
    
    })
    $('#popupXmark333').click(()=>{
        $('.gearPopup_EditingPage').css('display', 'none');
        $('.gearPopup_firstPage').css('display', 'flex');
    
    })
    $('#archivedOrders').click(()=>{
        $('.gearPopup_firstPage').css('display', 'none');
        $('.gearPopup_archivedPage').css('display', 'flex');

    })
    $('#popupXmark4').click(()=>{
        $('.gearPopup_archivedPage').css('display', 'none');
        $('.gearPopup_firstPage').css('display', 'flex');

    })

    $('#createANewGood').click(() => {
        let name = $('#goodsName').val();
        let price = $('#goodsPrice').val();
        let img = $('#goodsImg').val();
        let bg = $('#goodsBg').val();
    
        let newItem = {
            name: name,
            price: price,
            img: img,
            bg: bg,
            previousPrice: '', 
            backGroundColor: bg, 
        };
    
        axios.post('/saveNewItem', newItem)
            .then(response => {
                console.log(response.data); 
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
    
    



    
$(document).on('click', '#archiveGood', function() {
    let orderElement = $(this).closest('.orderElement');
    let orderName = orderElement.find('.orderElement_name').text();
    let orderPhone = orderElement.find('.orderElement_phone').text();
    
    axios.delete('http://localhost:3000/delete-order', {
        data: {
            name: orderName,
            phone: orderPhone
        }
    })
    .then(res => {
        console.log(res.data);
        orderElement.remove();
        orderElement.appendTo('.archivedGoodsContainer');
        orderElement.find('.orderElement_orderSum').css('display', 'none');
        orderElement.find('.separativeLine').css('display', 'none');
        orderElement.find('.orderElement_orderTime').css('display', 'none');
        orderElement.find('.orderElement_btn').css('display', 'none');
        orderElement.find('.orderItems').css('display', 'none');

        

    })
    .catch(err => {
        console.error('Error deleting order:', err);
    });
});




    
})
$('.wrap').click((e)=>{
    console.log(e.target.id)
    if(e.target.id != ''){
        if((e.target.id).substring(0,4) == 'code'){
            let orderId = (e.target.id).substring(4)
            console.log(orderId)
            axios.post('http://localhost:3000/remove-order', {id:orderId})
            location.reload();
        }

    }
})