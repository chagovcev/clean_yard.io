const modalCheck = () => {
    const checkBtn = document.querySelector('.check-btn'),
        popupCheck = document.querySelector('.popup-check'),
        popup = document.querySelectorAll('.popup'),
        allInputs = document.querySelectorAll('input');

    checkBtn.addEventListener('click', () => {
        popupCheck.style.display = 'block';
    });

    popup[2].addEventListener('click', (event) => {
        let target = event.target;

        if(target.classList.contains('popup-close') || 
            target.classList.contains('popup')){
                allInputs.forEach((e) => {            
                    if(!e.closest('#accordion') && !e.closest('#calc-result')){
                        e.value = '';
                    }
                });  
            popupCheck.style.display = 'none';
        }         
    });
};

export default modalCheck;