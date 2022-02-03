const filterByType = (type, ...values) => values.filter(value => typeof value === type), //функция возвращает новый массив, состоящий из элементов переданного типа

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // получаем все блоки с результатом преобразование NodeList в массив
		responseBlocksArray.forEach(block => block.style.display = 'none'); // скрываем каждый элемент массива
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //функция, которая показывает 
		hideAllResponseBlocks(); //скрыть все блоки результата
		document.querySelector(blockSelector).style.display = 'block'; //показать нужный блок из аргументов
		if (spanSelector) { //если это span
			document.querySelector(spanSelector).textContent = msgText; //добавить сообщение 
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //показать блок ошибки

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // показать результат

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // если результата нет

	tryFilterByType = (type, values) => { //функция фильтрации
		try { //блок "попытки"
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");//функция eval выполняет код, представленный строкой. В данном случае вызывает ф-цию фильтрации
			const alertMsg = (valuesArray.length) ? // если длина массива не 0
				`Данные с типом ${type}: ${valuesArray}` : // записываем в alertMsg результат фильтрации
				`Отсутствуют данные типа ${type}`; // иначе показываем что такого типа нет
			showResults(alertMsg); //выводим блок с сообщением 
		} catch (e) { // блок обработки исключений
			showError(`Ошибка: ${e}`); //выводим блок с ошибкой
		}
	};

const filterButton = document.querySelector('#filter-btn'); // получаем кнопку "Фильтровать"

filterButton.addEventListener('click', e => { // вешаем обработчик на кнопку "Фильтровать"
	const typeInput = document.querySelector('#type'); // получаем селект с типами
	const dataInput = document.querySelector('#data'); // получаем инпут с данными от пользователя

	if (dataInput.value === '') { //если поле данных от пользователя пустое
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //сообщаем об этом пользователю
		showNoResults(); // показываем блок с сообщением, что результата нет
	} else { //если поле данных от пользователя не пустое
		dataInput.setCustomValidity('');//убираем сообщение о валидации
		e.preventDefault();//выключаем обработку событий по умолчанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вызываем функцию фильтрации, предварительно удалив лишние пробелы у данных
	}
});

