const sendForms = () => {

     //Валидация
     

    const nameUser = document.querySelectorAll('.name-user'), 
        phoneUser = document.querySelectorAll('.phone-user');
 
    for (let i = 0; i < nameUser.length; i++){
        nameUser[i].addEventListener('input', () => {
            nameUser[i].value = nameUser[i].value.replace(/[^А-Яа-яЁё\s]/g, '');            
        });
        phoneUser[i].addEventListener('input', () => {
            phoneUser[i].value = phoneUser[i].value.replace(/[^\d+]/g, '');
        });
    }

    const successMessage = 'Спасибо, мы с вами свяжемся!',
        errorMessage = 'Что-то пошло не так',
        loadMessage = 'Загрузка...';
    
    const form = document.querySelectorAll('form');

    const statusMesage = document.createElement('div');
    statusMesage.style.cssText = `font-size: 2.3rem; color: #F28C07`;
    
    for(let i = 0; i < form.length; i++){
        form[i].addEventListener('submit', (event) => {            
            event.preventDefault();

            if(form[i].closest('.popup-discount') || 
               form[i].closest('.director-form') ||
               form[i].closest('.popup-consultation')){
                return;
            }
            form[i].appendChild(statusMesage);
            statusMesage.textContent = loadMessage;
    
            const formData = new FormData(form[i]);
            let body = {};
                
            formData.forEach((val, key) => {
                body[key] = val;
            });
            
    
            postData(body, () => {
                statusMesage.textContent = successMessage;
            }, (error) => {
                console.error('Номер ошибки: ' + error);
                statusMesage.textContent = errorMessage;
            });             
        });
    }
    
     const postData = (body, successData, errorData) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            
            if(request.readyState !==4){
                return;
            }
            if(request.status === 200) {
                successData();
            } else {
                errorData(request.status);
            }
        });

        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        
        request.send(JSON.stringify(body)); 
    }; 

}

export default sendForms;