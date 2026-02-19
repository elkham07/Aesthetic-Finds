let currentMode = "";

const words = [
    { ru: "Привет", kz: "Сәлем" },
    { ru: "Здравствуйте", kz: "Сәлеметсіз бе" },
    { ru: "Как дела?", kz: "Қалайсың?" },
    { ru: "Спасибо", kz: "Рахмет" },
    { ru: "Пожалуйста", kz: "Өтінемін" },
    { ru: "Да", kz: "Иә" },
    { ru: "Нет", kz: "Жоқ" },
    { ru: "До свидания", kz: "Сау бол" },
    { ru: "Доброе утро", kz: "Қайырлы таң" },
    { ru: "Добрый вечер", kz: "Қайырлы кеш" },
    { ru: "Добрый день", kz: "Қайырлы күн" },
    { ru: "Друг", kz: "Дос" },
    { ru: "Семья", kz: "Отбасы" },
    { ru: "Мама", kz: "Ана" },
    { ru: "Папа", kz: "Әке" },
    { ru: "Брат", kz: "Аға" },
    { ru: "Сестра", kz: "Әпке" },
    { ru: "Дом", kz: "Үй" },
    { ru: "Школа", kz: "Мектеп" },
    { ru: "Университет", kz: "Университет" },
    { ru: "Учитель", kz: "Мұғалім" },
    { ru: "Студент", kz: "Студент" },
    { ru: "Город", kz: "Қала" },
    { ru: "Страна", kz: "Ел" },
    { ru: "Еда", kz: "Тамақ" },
    { ru: "Вода", kz: "Су" },
    { ru: "Хлеб", kz: "Нан" },
    { ru: "Работа", kz: "Жұмыс" },
    { ru: "Деньги", kz: "Ақша" },
    { ru: "Время", kz: "Уақыт" },
    { ru: "Сегодня", kz: "Бүгін" },
    { ru: "Завтра", kz: "Ертең" },
    { ru: "Вчера", kz: "Кеше" },
    { ru: "Любовь", kz: "Махаббат" },
    { ru: "Красивый", kz: "Әдемі" },
    { ru: "Сильный", kz: "Күшті" },
    { ru: "Большой", kz: "Үлкен" },
    { ru: "Маленький", kz: "Кішкентай" },
    { ru: "Быстро", kz: "Тез" },
    { ru: "Медленно", kz: "Баяу" }
    ];
    

    const slang = [
        "Круто – Күшті ",
        "Топ – Мықты ",
        "Жесть – Масқара ",
        "Ок – Жарайды ",
        "Брат – Братан ",
        "Друг – Дос ",
        "Кайф – Рахат ",
        "Лайк – Ұнайды ",
        "Чётко – Нақты ",
        "Уважение – Құрмет ",
        "Базар жоқ – Сөз жоқ ",
        "Серьезно? – Шынымен бе? ",
        "Капец – Ойбай ",
        "Красавчик – Жарайсың ",
        "Не тупи – Асықпа ",
        "Все норм – Бәрі жақсы ",
        "Погнали – Кеттік ",
        "Давай – Кәне ",
        "Хорош – Жетер ",
        "Прикол – Қызық ",
        "Реально – Шын ",
        "Отстой – Нашар ",
        "Трэш – Сұмдық ",
        "Имба – Өте мықты ",
        "Жиза – Өмір шындығы ",
        "Зачет – Өтті ",
        "Супер – Керемет ",
        "Улет – Ғажап ",
        "Норм – Қалыпты ",
        "Легко – Оңай ",
        "Тяжело – Қиын ",
        "Не парься – Уайымдама ",
        "Спокойно – Сабыр ",
        "Вау – Ого ",
        "Флекс – Көрсету ",
        "Хайп – Танымал ",
        "Чилл – Демалу ",
        "Краш – Ұнату ",
        "Токсик – Уытты ",
        "Лол – Күлкілі"
        ];
        

let currentQuestion = null;

function addMessage(text, sender) {
    const chatBox = document.getElementById("chatBox");
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.innerText = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function lessonMode() {
    currentMode = "lesson";
    const randomWord = words[Math.floor(Math.random() * words.length)];
    addMessage(`📖 ${randomWord.kz} – ${randomWord.ru}`, "bot");
}

function quizMode() {
    currentMode = "quiz";
    currentQuestion = words[Math.floor(Math.random() * words.length)];
    addMessage(`🧠 Переведи: ${currentQuestion.ru}`, "bot");
}

function slangMode() {
    currentMode = "slang";
    const randomSlang = slang[Math.floor(Math.random() * slang.length)];
    addMessage(`🔥 ${randomSlang}`, "bot");
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const userText = input.value.trim();
    if (userText === "") return;

    addMessage(userText, "user");

    if (currentMode === "quiz" && currentQuestion) {
        if (userText.toLowerCase() === currentQuestion.kz.toLowerCase()) {
            addMessage("✅ Дұрыс! Молодец!", "bot");
        } else {
            addMessage(`❌ Неправильно. Правильный ответ: ${currentQuestion.kz}`, "bot");
        }
        currentQuestion = null;
    } else {
        addMessage("Выбери режим выше 👆", "bot");
    }

    input.value = "";
}
function clearChat() {
    document.getElementById("chatBox").innerHTML = "";
}
function openInstagram() {
    window.open("https://instagram.com/ВАШ_АККАУНТ", "_blank");
}

function openTikTok() {
    window.open("https://tiktok.com/@ВАШ_АККАУНТ", "_blank");
}
