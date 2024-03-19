

axios.get('https://jsonplaceholder.typicode.com/users')
.then((res)=>{
    // console.log(res.data)
    for(let user of res.data){
        $('.usersContainer').append(
            `<div class='userCard'>
            <h3>${user.name}</h3>
            <h5><i class="fa-solid fa-envelope"></i>${user.email}</h5>
            <a  href="tel:${user.phone}"><i class="fa-solid fa-phone"></i>${user.phone}</a>
            <h5><i class="fa-solid fa-location-dot"></i>${user.address.city}, ${user.address.street}</h5>

            </div>`
        )
    }
})



axios.get('https://jsonplaceholder.typicode.com/posts')
.then((res)=>{
    console.log(res.data)
    for(let post of res.data){
        $('.postsContainer').append(
            `<div class='postCard'>
            <h3>${post.title}</h3>
            <h5>${post.body}</h5>

            </div>`
        )
        
    }
})




$('#postBtn').click(()=>{
    $('.messagePopup').css('display', 'flex')

    let data = {
        title: $('#title').val(),
        text: $('#body').val(),
   }
   axios.post('https://jsonplaceholder.typicode.com/posts', data)
   .then((res)=>{
       console.log(res)
   })
$('#title').val('')
$('#body').val('')
})

$('#okeyBtn').click(()=>{
    $('.messagePopup').css('display', 'none')

})




$(document).ready(function() {
    var currentPage = 0;
    var postsPerPage = 10;
    
    showPage(currentPage);

    function showPage(page) {
        var startIndex = (page - 1) * postsPerPage;
        var endIndex = startIndex + postsPerPage;
        
        $(".postCard").hide();

        $(".postCard").slice(startIndex, endIndex).show();
    }

    $("#nextPage").on("click", function() {
        if (currentPage < Math.ceil($(".postCard").length / postsPerPage)) {
            currentPage++;
            showPage(currentPage);
        }
    });

    $("#prevPage").on("click", function() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });
});
