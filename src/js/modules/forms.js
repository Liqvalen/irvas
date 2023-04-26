import { post } from "jquery"
import checkNumInputs from "./checkNumInputs"
const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          windows = document.querySelectorAll('[data-modal]')

    checkNumInputs('input[name="user_phone"]')
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо. Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading
        let res = await fetch(url, {
            method: "POST",
            body: data
        })

        return await res.text()
    }
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = ''
        })
    }
    const closeModal = () => {
        setTimeout(() => {
            windows.forEach(item => {
                item.style.display = 'none'
                document.body.style.overflow = ''
            })
        }, 3000);
    }
    // const clearObject = () => {
    //     for (let q in items) {
    //         delete items[q] 
    //     }
    // }
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault()

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            item.appendChild(statusMessage)

            const formData = new FormData(item)
            if (item.getAttribute('data-calc' === 'end')) {
                for (let key in state) {
                    formData.append(key, state[key])
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs()
                    // changeModalState()
                    closeModal()
                    setTimeout(() => {
                        statusMessage.remove()
                    }, 3000)
                })
        })
    })
}
export default forms