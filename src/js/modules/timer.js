function timer(id, deadline) {
    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()), //РАЗНИЦА В МИЛЛИСЕКУНДАХ 
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60)

        return { //возвращение данных в их обличиях(часах, минутах)
            'total': t,
            'days': days, 
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
        
    }
    function addZero(num){ //нуль перед цифрой
        if(num >= 0 && num < 10){
            return `0${num}`
        } else{
            return num
        }
    }
    function setClock(selector, endtime){ //создание переменных содержащих в себе элементы со страницы
                                            //
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000)//интервал между секундами

        updateClock() //вызов функции до начала отсчета

        function updateClock(){
            const t = getTimeRemaining(endtime)
            //подставление полученных чисел в полученные переменные
            days.innerHTML = addZero(t.days) 
            hours.innerHTML = addZero(t.hours)
            minutes.innerHTML = addZero(t.minutes)
            seconds.innerHTML = addZero(t.seconds)


            if(t.total <= 0){ //если время закончилось, то гг
                days.textContent = '00'
                hours.textContent = '00'
                minutes.textContent = '00'
                seconds.textContent = '00'

                clearInterval(timeInterval)
            }
        }
                
    }
    setClock(id, deadline)
}
export default timer