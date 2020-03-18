const accordionCalc = () => {
  const accordionOne = document.getElementById('accordion'),
    panelHeading = accordionOne.querySelectorAll('.panel-heading'),
    panelCollapse = accordionOne.querySelectorAll('.panel-collapse'),
    popupDiscount = document.querySelector('.popup-discount'),
    nextStep = accordionOne.querySelectorAll('.construct-btn'),
    myonoffswitch = document.getElementById('myonoffswitch'),
    secondWell = document.getElementById('second-well'),
    btnOrder = document.querySelector('.btn-order'),
    captureForm = document.querySelectorAll('.capture-form');  

    // Открытие по клику на заголовки

    panelHeading.forEach((elem) => {
        elem.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target.closest('.panel');    

            panelCollapse.forEach((section) => {
                if(target.contains(section)){                  
                    section.classList.toggle('in');
                } else {
                    section.classList.remove('in');
                }                 
            }); 
        });    
    });   
    
    // Переход по кнопке следующий шаг, а получить расчет - открывается модалка

    nextStep.forEach((e) => {
        if(e.tagName !== 'BUTTON'){
            e.addEventListener('click', (event) => {
                event.preventDefault();
                let target = event.target.closest('.panel-default');
                let panel = target.nextElementSibling.childNodes[3];
                
                panel.classList.toggle('in');       
                target.childNodes[3].classList.toggle('in');      
            });
        } else {
            e.addEventListener('click', () => {
                popupDiscount.style.display = 'block';
                if(myonoffswitch.checked){
                    calcCostOne();
                } else {
                    calcCostOne();
                    calcCostTwo();
                } 
            });
        }
     });   

    //Переключатель switch одно-двухкамерный

    const customerData = {};
        
    secondWell.style.display = 'none';
    customerData['Тип септика'] = 'Однокамерный'; 

    myonoffswitch.addEventListener('change', () => {
        if(myonoffswitch.checked){
            secondWell.style.display = 'none';
            calcCostOne();            
        } else {
            secondWell.style.display = 'block';
            customerData['Тип септика'] = 'Двухкамерный'; 
            calcCostTwo();  
        }
     });
            
    //Сам калькулятор

    const diameter = document.querySelectorAll('.diameter'),
        amountRings = document.querySelectorAll('.amount-rings'),
        bottom = document.getElementById('myonoffswitch-two'),
        distance = document.querySelector('.distance'),        
        calcResult = document.getElementById('calc-result'),
        priceOneTotal = {},
        priceTwoTotal = {},
        select = accordionOne.querySelectorAll('select');

        select.forEach((e) => {
            e.addEventListener('change', () => {
                if(myonoffswitch.checked){
                    calcCostOne();
                } else {
                    calcCostOne();
                    calcCostTwo();
                }            
            });
        });
    
        bottom.checked = false; 

        bottom.addEventListener(('change'), () => {
            if(myonoffswitch.checked){
                calcCostOne();
            } else {
                calcCostOne();
                calcCostTwo();
            }
        });

        let priceOne = 10000,            
        priceTwo = 5000;
        
        distance.addEventListener('input', () => {
            distance.value = distance.value.replace(/[^\d,]/g, '');
        });

    //калькулятор первого блока
   
    const calcCostOne = () => {
        
            if(diameter[0].value === '1.4 метра'){ 
                priceOneTotal['Диаметр (м)'] = 1.4;              
            } else if (diameter[0].value === '2 метра'){
                priceOneTotal['Диаметр (м)'] = 2;                                       
            }

            if(amountRings[0].value === '1 штука'){
                    priceOneTotal['Кол.колец'] = 1;
                if(diameter[0].value === '1.4 метра'){
                    priceOneTotal['Цена'] = priceOne;
                } else if (diameter[0].value === '2 метра') {
                    priceOneTotal['Цена'] = (priceOne * 0.2) + priceOne;
                }
            } else if (amountRings[0].value === '2 штуки') {
                    priceOneTotal['Кол.колец'] = 2;
                if(diameter[0].value === '1.4 метра'){
                    priceOneTotal['Цена'] = (priceOne * 0.3) + priceOne;
                } else if (diameter[0].value === '2 метра') {
                    priceOneTotal['Цена'] = (priceOne * 0.2) + ((priceOne * 0.2 + priceOne) * 0.3) + priceOne;
                }
            } else if (amountRings[0].value === '3 штуки') {
                priceOneTotal['Кол.колец'] = 3;
                if(diameter[0].value === '1.4 метра'){
                    priceOneTotal['Цена'] = (priceOne * 0.5) + priceOne;
                } else if (diameter[0].value === '2 метра') {
                    priceOneTotal['Кол.колец'] = 3;
                    priceOneTotal['Цена'] = (priceOne * 0.2) + ((priceOne * 0.2 + priceOne) * 0.5) + priceOne;
                }
            }

            if(bottom.checked){
                priceOneTotal['Днище'] = true;
                priceOneTotal['Цена'] = priceOneTotal['Цена'] + 1000;
            } else{
                priceOneTotal['Днище'] = false;
            }
            for (let key in priceOneTotal){
                customerData[key] = priceOneTotal[key];
            }   
            
            if(distance.value){
                customerData['Дистанция '] = distance.value;
            }
            calcResult.value = priceOneTotal['Цена'];
        };  

        calcCostOne();   
        
    //калькулятор второго блока(если выбран двух камерный)

    const calcCostTwo = () => {
        
            if(diameter[1].value === '1.4 метра'){ 
                priceTwoTotal['Диаметр 2 (м)'] = 1.4;              
            } else if (diameter[1].value === '2 метра'){
                priceTwoTotal['Диаметр 2 (м)'] = 2;                                       
            }

            if(amountRings[1].value === '1 штука'){
                    priceTwoTotal['Кол.колец 2'] = 1;
                if(diameter[1].value === '1.4 метра'){
                    priceTwoTotal['Цена 2'] = priceTwo;
                } else if (diameter[1].value === '2 метра') {
                    priceTwoTotal['Цена 2'] = (priceTwo * 0.2) + priceTwo;
                }
            } else if (amountRings[1].value === '2 штуки') {
                    priceTwoTotal['Кол.колец 2'] = 2;
                if(diameter[1].value === '1.4 метра'){
                    priceTwoTotal['Цена 2'] = (priceTwo * 0.3) + priceTwo;
                } else if (diameter[1].value === '2 метра') {
                    priceTwoTotal['Цена 2'] = (priceTwo * 0.2) + ((priceTwo * 0.2 + priceTwo) * 0.3) + priceTwo;
                }
            } else if (amountRings[1].value === '3 штуки') {
                priceTwoTotal['Кол.колец 2'] = 3;
                if(diameter[1].value === '1.4 метра'){
                    priceTwoTotal['Цена 2'] = (priceTwo * 0.5) + priceTwo;
                } else if (diameter[1].value === '2 метра') {
                    priceTwoTotal['Кол.колец 2'] = 3;
                    priceTwoTotal['Цена 2'] = (priceTwo * 0.2) + ((priceTwo * 0.2 + priceTwo) * 0.5) + priceTwo;
                }
            }

            if(bottom.checked){
                priceTwoTotal['Днище'] = true;
                priceTwoTotal['Цена 2'] = priceTwoTotal['Цена 2'] + 2000;
            } else{
                priceTwoTotal['Днище'] = false;
            }
            for (let key in priceTwoTotal){
                customerData[key] = priceTwoTotal[key];
            }       
            if(distance.value){
                customerData['Дистанция '] = distance.value;
            }  
            priceTwoTotal['Итоговая цена'] = priceTwoTotal['Цена 2'] + priceOneTotal['Цена'];
            delete customerData['Цена 2'];
            delete customerData['Цена'];
            calcResult.value = priceTwoTotal['Итоговая цена'];  
    };
    
    // Оповещение о статусе формы

    const successMessage = 'Спасибо, мы с вами свяжемся!',
        errorMessage = 'Что-то пошло не так',
        loadMessage = 'Загрузка...',
        statusMessage = document.createElement('div');
        statusMessage.style.cssText = `font-size: 2.3rem; color: #F28C07`;

    // Объединение двух объектов (данные калькулятора и данные заказчика) в один

    const body = {};
    const inp = captureForm[2].querySelectorAll('input');
    btnOrder.disabled = true;
    inp.forEach((e) => {
        e.addEventListener('input', () => {
            if (inp[0].value === '' || inp[1].value === ''){
                btnOrder.disabled = true;
            }  else {
                btnOrder.disabled = false;
            }
        });
        
    });
    btnOrder.addEventListener('click', () => {        
        
        captureForm[2].appendChild(statusMessage);
        statusMessage.textContent = loadMessage;

        const formData = new FormData(captureForm[2]);
        formData.forEach((val, key) => {
            body[key] = val;
        });
        const customerDataNew = Object.assign(customerData, body);

        postData(customerDataNew, () => {
            statusMessage.textContent = successMessage;
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, 2000);
            }, (error) => {
                console.error('Номер ошибки: ' + error);
                statusMessage.textContent = errorMessage;
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, 2000);
        });    
        
        //После отправки удаляет из объекта все свойства

        for(let key in customerDataNew){delete customerDataNew[key];} 
        btnOrder.disabled = true; 
    });    
    
    
    // Отправка данных на сервер

    const postData = (customerDataNew, succses, error) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            
            if (request.readyState !==4) {
                return;
            }
            if (request.status === 200) {
                succses();
            } else {
                error(request.status);
            }
        });

        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        
        request.send(JSON.stringify(customerDataNew)); 
    }; 
};

export default accordionCalc;