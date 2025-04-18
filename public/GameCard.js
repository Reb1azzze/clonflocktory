// весь скрипт — это одна большая функция
(function(){

    //  объявляем объект, внутри которого будет происходить основная механика игры
    var Memory = {

        // создаём карточку
        init: function(cards){
            //  получаем доступ к классам
            this.$game = $(".game");
            this.$modal = $(".modal");
            this.$overlay = $(".modal-overlay");
            this.$restartButton = $("button.restart");
            this.$greetingContainer = $(".greeting-container");
            // собираем из карточек массив — игровое поле
            this.cardsArray = $.merge(cards, cards);
            // перемешиваем карточки
            this.shuffleCards(this.cardsArray);
            // и раскладываем их
            this.setup();
            $(".greeting-button").on("click", function () {
                $(".game").removeClass("disabled");
            });
        },

        // как перемешиваются карточки
        shuffleCards: function(cardsArray){
            // используем встроенный метод .shuffle
            this.$cards = $(this.shuffle(this.cardsArray));
        },

        // раскладываем карты
        setup: function(){
            // подготавливаем код с карточками на страницу
            this.html = this.buildHTML();
            // добавляем код в блок с игрой
            this.$game.html(this.html);
            // получаем доступ к сформированным карточкам
            this.$memoryCards = $(".card-game");
            // на старте мы не ждём переворота второй карточки
            this.paused = false;
            // на старте у нас нет перевёрнутой первой карточкм
            this.guess = null;
            // добавляем элементам на странице реакции на нажатия
            this.binding();
        },

        // как элементы будут реагировать на нажатия
        binding: function(){
            // обрабатываем нажатие на карточку
            this.$memoryCards.on("click", this.cardClicked);
            // и нажатие на кнопку перезапуска игры
            this.$restartButton.on("click", $.proxy(this.reset, this));
        },

        // что происходит при нажатии на карточку
        cardClicked: function(){
            // получаем текущее состояние родительской переменной
            var _ = Memory;
            // и получаем доступ к карточке, на которую нажали
            var $card = $(this);
            // если карточка уже не перевёрнута и мы не нажимаем на ту же самую карточку второй раз подряд
            if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
                // переворачиваем её
                $card.find(".inside").addClass("picked");
                // если мы перевернули первую карточку
                if(!_.guess){
                    // то пока просто запоминаем её
                    _.guess = $(this).attr("data-id");
                    // если мы перевернули вторую и она совпадает с первой
                } else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
                    // оставляем обе на поле перевёрнутыми и показываем анимацию совпадения
                    $(".picked").addClass("matched");
                    // обнуляем первую карточку
                    _.guess = null;
                    // если вторая не совпадает с первой
                } else {
                    // обнуляем первую карточку
                    _.guess = null;
                    // не ждём переворота второй карточки
                    _.paused = true;
                    // ждём полсекунды и переворачиваем всё обратно
                    setTimeout(function(){
                        $(".picked").removeClass("picked");
                        Memory.paused = false;
                    }, 600);
                }
                // если мы перевернули все карточки
                if($(".matched").length == $(".card-game").length){
                    // показываем победное сообщение
                    _.win();
                }
            }
        },

        // показываем победное сообщение
        win: function(){
            // не ждём переворота карточек
            this.paused = true;
            // плавно показываем модальное окно с предложением сыграть ещё
            setTimeout(function(){
                Memory.showModal();
                Memory.$game.fadeOut();
                Memory.$greetingContainer.fadeOut().css("display", "none");
                window.parent.postMessage({ gameEnded: true }, "*");
            }, 1000);
        },

        // показываем модельное окно
        showModal: function(){
            // плавно делаем блок с сообщением видимым
            this.$overlay.show();
            this.$modal.fadeIn("slow");
        },

        // прячем модальное окно
        hideModal: function(){
            this.$overlay.hide();
            this.$modal.hide();
        },

        // перезапуск игры
        reset: function(){
            // прячем модальное окно с поздравлением
            this.hideModal();
            // перемешиваем карточки
            this.shuffleCards(this.cardsArray);
            // раскладываем их на поле
            this.setup();
            // показываем игровое поле
            this.$game.show("slow");
        },

        // Тасование Фишера–Йетса - https://bost.ocks.org/mike/shuffle/
        shuffle: function(array){
            var counter = array.length, temp, index;
            while (counter > 0) {
                index = Math.floor(Math.random() * counter);
                counter--;
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },

        // код, как добавляются карточки на страницу
        buildHTML: function(){
            // сюда будем складывать HTML-код
            var frag = '';
            // перебираем все карточки подряд
            this.$cards.each(function(k, v){
                // добавляем HTML-код для очередной карточки
                frag += '<div class="card-game" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://podruge.ru/local/templates/main/assets/img/logo-sm.svg"\
				alt="Codepen" /></div></div>\
				</div>';
            });
            // возвращаем собранный код
            return frag;
        }
    };

    // карточки
    var cards = [
        {
            // название
            name: "php",
            // адрес картинки
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/297px-PHP-logo.svg.png",
            // порядковый номер пары
            id: 1,
        },
        {
            name: "css3",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/160px-CSS3_logo.svg.png",
            id: 2
        },
        {
            name: "html5",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/160px-HTML5_logo_and_wordmark.svg.png",
            id: 3
        },

    ];

    // запускаем игру
    Memory.init(cards);


})();
/*
{https://podruge.ru/local/templates/main/assets/img/logo-sm.svg
https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/160px-CSS3_logo.svg.png
        {
            name: "jquery",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/JQuery-Logo.svg/440px-JQuery-Logo.svg.png",
            id: 4
        },
        {
            name: "javascript",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/160px-Unofficial_JavaScript_logo_2.svg.png",
            id: 5
        },
        {
            name: "node",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/262px-Node.js_logo.svg.png",
            id: 6
        },

            name: "photoshop",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/164px-Adobe_Photoshop_CC_icon.svg.png",
            id: 7
        },
        {
            name: "python",
            img: "https://www.python.org/static/img/python-logo@2x.png",
            id: 8
        },
        {
            name: "rails",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ruby_On_Rails_Logo.svg/425px-Ruby_On_Rails_Logo.svg.png",
            id: 9
        },
        {
            name: "sass",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/213px-Sass_Logo_Color.svg.png",
            id: 10
        },
        {
            name: "sublime",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Breezeicons-apps-48-sublime-text.svg/160px-Breezeicons-apps-48-sublime-text.svg.png",
            id: 11
        },
        {
            name: "wordpress",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/WordPress_logo.svg/440px-WordPress_logo.svg.png",
            id: 12
        },

 */