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

var el = document.querySelector('.frame-4-nbc')
var el2 = document.querySelector(".logout")
if (obj._id) {

    el.innerHTML = '    <div class="frame-6-Y4z"><img class="pencil-H2a" src="/img/pencil-F5p.png"/><a href="/articles/new" class="write-p2W">Write</a></div> <a href="/me"><img src="img/users/' + obj.photo + '" alt = "Photo of ${user.name}" class="user-upe" /></a>' 
    el2.innerHTML = '<a href="#" id = "logout" class="about-aC2">Logout</a>' 
    
    var doc = document.querySelector('#logout')

    doc.addEventListener('click', (e) => logout())
} else {

    el.innerHTML = '<div class="login-registerdiv"><a  href="/login" class="logindiv">Login</a></div><a  href="/signup" class="registerdiv">Register</a></div>  '

}



