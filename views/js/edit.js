import { showAlert } from './alert.js'


const update = async () => {
    try {
        
        if (res.data.status === 200) {
            showAlert('success', 'Edited successfully')
            
        }      

    } catch (err) {
        let message = typeof err.response !== 'undefined' 
        ? err.response.data.message 
        : err.message 
        showAlert('error', 'Error: Could not update', message)

    }
}

document.querySelector('.form-8kd').addEventListener('submit', (e) => {
    e.preventDefault()
    
    update()
})