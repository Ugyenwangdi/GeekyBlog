import { showAlert } from "./alert.js"

var obj 
if (document.cookie) {
    obj = JSON.parse(document.cookie.substring(6))
} else {
    obj = JSON.parse('{}')
}

var articleId = document.getElementById("article_id").value;
var liked = document.getElementById("liked").value;
var slug = document.getElementById("article_slug").value;
let booleanValue = JSON.parse(liked); //returns true

// console.log(obj['_id']);

const likeBtn = document.querySelector(".like_btn");
let clicked = false;

// likes.includes(userId)
if (booleanValue){
    clicked = true;
} else {
    clicked = false;
}



likeBtn.addEventListener("click", () => {
    if(!clicked) {
        clicked = true;
        console.log('clicked')

        if (obj['_id'] === 'undefined') location.assign('/login')

        likeBtn.innerHTML = `<img id="icon" class="love-2" src="/img/vector-Sb8.png"/>`
        
        let url = "http://localhost:4002/articles/like"
        let payload = {
            postId: articleId,
            userId: obj['_id']
        }
        let options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(payload)
        }

        fetch(url, options)
        .then(response => console.log(response.status))
         
        showAlert('success', 'Liked!')
        // window.setTimeout(() => {
        //     location.assign('/articles/'+slug)
        // }, 1500)
        
    } else {
        clicked = false;
        console.log('unclicked')
        likeBtn.innerHTML = `<img id="icon" class="love-k6P" src="/img/vector-Sb8.png"/>`

        let url = "http://localhost:4002/articles/unlike"
        let payload = {
            postId: articleId,
            userId: obj['_id']
        }
        let options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(payload)
        }

        fetch(url, options)
        .then(response => console.log(response.status))
        showAlert('error', 'Unliked!')
        // window.setTimeout(() => {
        //     location.assign('/articles/'+slug)
        // }, 1500)

    }

});



var bookmarked = document.getElementById("bookmarked").value;

let booleanValue2 = JSON.parse(bookmarked); //returns true

// console.log(obj['_id']);

const bookmarkBtn = document.querySelector(".bookmark_btn");
let clicked3 = false;

if (booleanValue2){
    clicked3 = true;
} else {
    clicked3 = false;
}


bookmarkBtn.addEventListener("click", () => {

    if(!clicked3) {
        clicked3 = true;
        bookmarkBtn.innerHTML = `<img id="icon" class="bookmark-2" src="/img/bookmark.png"/>`

        console.log('clicked')

        // if (obj['_id'] === 'undefined') location.assign('/login')

        // bookmarkBtn.innerHTML = `<img id="icon" class="love-2" src="/img/vector-Sb8.png"/>`
        
        let url = "http://localhost:4002/api/v1/users/bm"
        let payload = {
            postId: articleId,
            userId: obj['_id']
        }
        let options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(payload)
        }

        fetch(url, options)
        .then(response => console.log(response.status))
         
        showAlert('success', 'Bookmarked!')
        // window.setTimeout(() => {
        //     location.assign('/articles/'+slug)
        // }, 1500)

        
        
    } else {
        clicked3 = false;
        console.log('unclicked')
        bookmarkBtn.innerHTML = `<img id="icon" class="bookmark-nom" src="/img/bookmark.png"/>`

        // console.log('unclicked')
        // likeBtn.innerHTML = `<img id="icon" class="love-k6P" src="/img/vector-Sb8.png"/>`

        let url = "http://localhost:4002/api/v1/users/removebm"
        let payload = {
            postId: articleId,
            userId: obj['_id']
        }
        let options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(payload)
        }

        fetch(url, options)
        .then(response => console.log(response.status))
        showAlert('error', 'Removed from bookmarks!')
        // window.setTimeout(() => {
        //     location.assign('/articles/'+slug)
        // }, 1500)

    }

});



var el = document.querySelector('.frame-4-q23')

if (obj._id) {
    el.innerHTML = ' <div class="frame-6-kAw"> <img class="pencil-TLF" src="/img/pencil-F5p.png"/><a href="/articles/new" class="write-kaF">Write</a></div> <a href="/me"><img class="user-PNK" src="/img/user-B7c.png"/></a>' 

} else {

    el.innerHTML = '<div class="login-registerdiv"><a  href="/login" class="logindiv">Login</a></div><a  href="/signup" class="registerdiv">Register</a></div> '

}



