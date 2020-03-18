const modalDiscount = () => {
 
     const discountBtn = document.querySelectorAll('.discount-btn'),
     popupDiscount = document.querySelector('.popup-discount'),
     popup = document.querySelectorAll('.popup'),
     allInputs = document.querySelectorAll('input');
    
     for(let i = 0; i < discountBtn.length; i++){
        discountBtn[i].addEventListener('click', () => {
            popupDiscount.style.display = 'block';
        });
     }
     
     popup[1].addEventListener('click', (event) => {
        let target = event.target;

        if(target.classList.contains('popup-close') || 
            target.classList.contains('popup')){
                allInputs.forEach((e) => {            
                    if(!e.closest('#accordion') && !e.closest('#calc-result')){
                        e.value = '';
                    }
                });
            popupDiscount.style.display = 'none';
        } 
        
    });


};

export default modalDiscount;