const telegramApi = require("node-telegram-bot-api")
//const Sequelize = require('sequelize');
const {gameOptions, againOptions} = require('./options')
const token = "6593991829:AAHJITf9CPVVecUVDkk7l25jcWuPxtCdNBI"
const bot = new telegramApi(token, {polling: true})


//const sequelize = new Sequelize(
  //  'u1821578_enco', 
   // 'u1821578_enco',
  //   'uS2gB8fM7anV5sX3', {
 // host: 'localhost',
 //// port: '3306',
 // dialect: 'mysql',
//});

const UserModel = sequelize.define('user', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  chatId: {type: Sequelize.STRING, unique: true},
  right: {type: Sequelize.INTEGER, defaultValue: 0},
  wrong: {type: Sequelize.INTEGER, defaultValue: 0}
});
const chats = {} // Некая БД для игры угадай цифру
const startGame = async (chatId) => {
    bot.sendMessage(chatId, `Сейчас загадаю цифру от 0 до 9, а ты должен ее угадать!`)
    const randomNumber = Math.floor(Math.random() * 10) // умножение для получения целового числа
    chats[chatId] = randomNumber; 
    bot.sendMessage(chatId, 'Отгадывай!', gameOptions);
}
// БД ЛОГИ
const start = async () => {

try {
await sequelize.authenticate();
console.log('Подключение к базе данных прошло успешно!');
await sequelize.sync();
} catch (e) {
    console.log('Подключение к бд сломалось!')
}
// CMD
    bot.setMyCommands([ 
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/help', description: 'Команды бота'},
        {command: '/stats', description: 'Статистика'},
        {command: '/game', description: 'Игра - отгадай число!'}
    ])
    bot.on('message', msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    try {
        if (text === '/start') {
             UserModel.create({chatId})
            return bot.sendMessage(chatId, `Привет! Это тестовое сообщение`, { "from": bot.username });   }
            
            if (text === '/game') {
             return startGame(chatId);
            }
            //if (text === '/stats') {
                //return bot.sendMessage(chatId, 
                 //   `Имя и Фамилия: ${first_name} ${last_name}
                 //   Твой ID: ${user_id}
                 //   Побед в играх: ${user.right}
                 //   Поражений в играх: ${user.wrong}`
                 //   )
            //   }
              
              
            
                if (text === '/help') {
                
                    return bot.sendMessage(chatId, `Привет ${msg.from.first_name} ${msg.from.last_name} Это тестовое сообщение! Вот список команд:`, { "from": bot.username });   }
                
                    return bot.sendMessage(chatId, 'Такой команды не существует!')
    } catch (e) {
return bot.sendMessage(chatId, 'Произошла какая то ошибка!')
    }

    })
    bot.on("callback_query", callbackQuery => {
        console.log(msg)
        const data = msg.data;
        const chatId = msg.message.chat.id;
    
        if (data === '/again') {
            return startGame(chatId)
        }

        if ( data === chats[chatId]) {
            user.right += 1;
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}!`, againOptions)
        }
       
            else {
                user.wrong += 1;
                return bot.sendMessage(chatId, `К сожалению ты не отгадал цифру! Бот загадал ${chats[chatId]}`, againOptions)

        }

    })

}
start() 