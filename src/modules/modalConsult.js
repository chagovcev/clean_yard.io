const modalConsult = () => {
    const consultBtn = document.querySelector('.consultation-btn'),
        popupConsult = document.querySelector('.popup-consultation'),
        popup = document.querySelectorAll('.popup'),
        captureForm = document.querySelectorAll('.capture-form'),
        directorForm = document.querySelector('.director-form'),
        allInputs = document.querySelectorAll('input');


    popup[3].addEventListener('click', (event) => {
        let target = event.target;

        if(target.classList.contains('popup-close') || 
            target.classList.contains('popup')){
                allInputs.forEach((e) => {            
                    if(!e.closest('#accordion') && !e.closest('#calc-result')){
                        e.value = '';
                    }
                });
            popupConsult.style.display = 'none';
        }         
    });

    // Объединение двух объектов (данные калькулятора и данные заказчика) в один
    
    const question = {},
        customerData = {},
        statusMessage = document.createElement('div');
        statusMessage.style.cssText = `font-size: 2.3rem; color: #F28C07`;

    const successMessage = 'Спасибо, мы с вами свяжемся!',
        errorMessage = 'Что-то пошло не так',
        loadMessage = 'Загрузка...';

    
    consultBtn.addEventListener(('click'), () => {
        popupConsult.style.display = 'block';
    }); 
    captureForm[4].addEventListener(('submit'), () => {
        captureForm[4].appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const clearMessage = () => {
            setTimeout(() => {
                statusMessage.textContent = '';
            }, 2000);
        };

        const formData1 = new FormData(directorForm);
          formData1.forEach((val, key) => {
              question[key] = val;
          });
          const formData2 = new FormData(captureForm[4]);
          formData2.forEach((val, key) => {
              customerData[key] = val;
          });
          const requestCust = Object.assign(question, customerData);
          postData(requestCust, () => {            
            statusMessage.textContent =  successMessage;
            clearMessage();
          }, (error) => {
              console.error(error);
              statusMessage.textContent = errorMessage;
              clearMessage();
          });
      });

    // Отправка данных на сервер

    const postData = (requestCust, success, error) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            
            if (request.readyState !==4) {
                return;
            }
            if (request.status === 200) {
                success();
            } else {
                error(request.status);
            }
        });

        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        
        request.send(JSON.stringify(requestCust)); 
    };  
};

export default modalConsult;