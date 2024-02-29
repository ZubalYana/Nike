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
            <button class='orderElement_btn' id="archive${el.time}">Archive</button>

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
        let time = Date.now();
    
        let newItem = {
            time: time,
            name: name,
            price: price,
            img: img,
            bg: bg,
            backGroundColor: bg, 
        };
        console.log(newItem.time)
    
        axios.post('/saveNewGoods', newItem)
            .then(response => {
                console.log(response.data); 
            })
            .catch(error => {
                console.error('Error:', error);
            });


            if ($('#goodsName').val() != '' && $('#goodsPrice').val() != '' && $('#goodsImg').val() != '' && $('#goodsBg').val() != '') {
                $('#goodsName').val('');
                $('#goodsPrice').val('');
                $('#goodsImg').val('');
                $('#goodsBg').val('');
            
                $('.gearPopup_container_notification').css('display', 'flex');
            
                setTimeout(() => {
                    $('.gearPopup_container_notification').css('display', 'none');
                }, 3000);
            } else {
                $('.gearPopup_container_notification').text('Fill in all the info');
            
                $('.gearPopup_container_notification').css('display', 'flex');
            
                setTimeout(() => {
                    $('.gearPopup_container_notification').css('display', 'none');
                }, 3000);
            }
            

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
