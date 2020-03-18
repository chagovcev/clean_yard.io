const modalCall = () => {

    const callBtn = document.querySelectorAll('.call-btn'),
        popupCall = document.querySelector('.popup-call'),
        popup = document.querySelectorAll('.popup'),
        allInputs = document.querySelectorAll('input');
     

    for (let i = 0; i < callBtn.length; i++){
        
        callBtn[i].addEventListener('click', () => {
            if (callBtn[i].matches('button')){
                return;
            }
            popupCall.style.display = 'block';
        });
    }

    popup[0].addEventListener('click', (event) => {
        let target = event.target;

        if(target.classList.contains('popup-close') || 
            target.classList.contains('popup')){
                allInputs.forEach((e) => {            
                    if(!e.closest('#accordion') && !e.closest('#calc-result')){
                        e.value = '';
                    }
                });
            popupCall.style.display = 'none';
        } 
        
    });
    

};

export default modalCall;