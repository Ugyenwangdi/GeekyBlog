import { showAlert } from "./alert.js"

// Logging Out 
const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:4002/api/v1/users/logout',
        })
        if (res.data.status === 'success') {
            location.reload(true)
        }
    } catch (err) {
        showAlert('error', 'Error logging out! Try again.')
    }
}

var obj 
if (document.cookie) {
    obj = JSON.parse(document.cookie.substring(6))
} else {
    obj = JSON.parse('{}')
}

var el = document.querySelector('.frame-6-2jx')
var el2 = document.querySelector(".logout")
if (obj._id) {

    el.innerHTML = '<div class="privatediv"><div class="writediv"><img class="pencil" src="/img/pencil-F5p.png"/><a href="/articles/new" class="writetext">Write</a></div></div> <a href="/me"><img src="img/users/' + obj.photo + '" alt = "Photo of ${user.name}" class="user" /></a>' 
    el2.innerHTML = '<a href="#" id = "logout" class="about-Hze">Logout</a>' 
    
    var doc = document.querySelector('#logout')

    doc.addEventListener('click', (e) => logout())
} else {

    el.innerHTML = '<a href="/login" class="frame-6-Bcr">Login</a><a href="/signup" class="frame-3-Rn6">Register</a>'

}



