// Chat list data structure
export interface ChatData {
  id: string;
  name: string;
  adTitle: string;
  avatar: string;
  isActive: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
}

// Message data structure
export interface MessageData {
  id: string;
  senderId: string;
  senderAvatar: string;
  text: string;
  time: string;
  date?: string;
  showDate?: boolean;
  image?: string;
}

// Mock chat list data
export const chatListData: ChatData[] = [
  {
    id: '1',
    name: 'Иванов Иван Иванович',
    adTitle: 'Название объявления',
    avatar: 'https://placehold.co/36x36',
    isActive: true,
    lastMessage: 'Я закрываю объявление',
    lastMessageTime: '10:02',
  },
  {
    id: '2',
    name: 'Петров Петр Петрович',
    adTitle: 'Квартира в центре',
    avatar: 'https://placehold.co/36x36',
    isActive: true,
    lastMessage: 'Когда можно посмотреть?',
    lastMessageTime: '09:45',
  },
  {
    id: '3',
    name: 'Сидоров Сидор Сидорович',
    adTitle: 'Дом за городом',
    avatar: 'https://placehold.co/36x36',
    isActive: false,
    lastMessage: 'Спасибо за информацию',
    lastMessageTime: '08:30',
  },
  {
    id: '4',
    name: 'Козлов Козьма Козьмич',
    adTitle: 'Студия на Невском',
    avatar: 'https://placehold.co/36x36',
    isActive: true,
    lastMessage: 'Договорились на завтра',
    lastMessageTime: '07:15',
  },
  {
    id: '5',
    name: 'Волков Владимир Владимирович',
    adTitle: 'Офисное помещение',
    avatar: 'https://placehold.co/36x36',
    isActive: false,
    lastMessage: 'Не подходит',
    lastMessageTime: 'Вчера',
  },
  {
    id: '6',
    name: 'Медведев Михаил Михайлович',
    adTitle: 'Загородный коттедж',
    avatar: 'https://placehold.co/36x36',
    isActive: true,
    lastMessage: 'Отлично, жду встречи',
    lastMessageTime: 'Вчера',
  },
];

// Mock messages data - organized by chat ID
export const messagesData: Record<string, MessageData[]> = {
  '1': [
    {
      id: 'm1',
      senderId: '1',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Текст',
      time: '10:02',
      showDate: false,
    },
    {
      id: 'm2',
      senderId: '1',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Deserunt nobis beatae enim debitis animi itaque dolore esse. Voluptates tempore impedit autem. Vero aliquid harum est quia esse inventore veritatis aut. Nam necessitatibus magni autem aliquam fugiat. Rerum porro minima autem deserunt et incidunt corporis sint. Cumque ad quo natus dolore non quisquam tempora molestias. Debitis facilis recusandae officiis cum ut dolores nesciunt earum. Aut unde in dolor. Id dolores alias libero incidunt est rem incidunt eveniet. Maxime autem maxime ullam soluta qui sequi ut. Earum ut itaque nulla. Nostrum quam tempore dicta molestiae odit omnis aut. Pariatur dicta ullam aliquid. Quam ratione blanditiis exercitationem. Consequuntur numquam harum aut voluptatem. Est dolores laborum consectetur soluta cumque assumenda harum. Molestiae dicta cupiditate.',
      time: '10:02',
      showDate: false,
    },
    {
      id: 'm3',
      senderId: 'me',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Текст',
      time: '10:02',
      showDate: false,
    },
    {
      id: 'm4',
      senderId: '1',
      senderAvatar: 'https://placehold.co/36x36',
      text: '',
      time: '10:02',
      showDate: true,
      date: '3 сентября, 2025',
      image: 'https://placehold.co/441x177',
    },
    {
      id: 'm5',
      senderId: 'me',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Текст',
      time: '10:02',
      showDate: false,
    },
    {
      id: 'm6',
      senderId: 'me',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Много текст',
      time: '10:02',
      showDate: false,
    },
    {
      id: 'm7',
      senderId: 'me',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Много текст',
      time: '10:02',
      showDate: false,
    },
    {
      id: 'm8',
      senderId: '1',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Я закрываю объявление',
      time: '10:02',
      showDate: false,
    },
  ],
  '2': [
    {
      id: 'm2_1',
      senderId: '2',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Здравствуйте! Интересует ваша квартира',
      time: '09:30',
      showDate: false,
    },
    {
      id: 'm2_2',
      senderId: 'me',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Добро пожаловать! Что именно вас интересует?',
      time: '09:32',
      showDate: false,
    },
    {
      id: 'm2_3',
      senderId: '2',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Когда можно посмотреть?',
      time: '09:45',
      showDate: false,
    },
  ],
  '3': [
    {
      id: 'm3_1',
      senderId: '3',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Добрый день! Расскажите подробнее о доме',
      time: '08:15',
      showDate: false,
    },
    {
      id: 'm3_2',
      senderId: 'me',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Дом двухэтажный, участок 10 соток, все коммуникации подведены',
      time: '08:20',
      showDate: false,
    },
    {
      id: 'm3_3',
      senderId: '3',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Спасибо за информацию',
      time: '08:30',
      showDate: false,
    },
  ],
  '4': [
    {
      id: 'm4_1',
      senderId: '4',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Студия еще свободна?',
      time: '07:00',
      showDate: false,
    },
    {
      id: 'm4_2',
      senderId: 'me',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Да, свободна. Можем встретиться завтра в 15:00',
      time: '07:10',
      showDate: false,
    },
    {
      id: 'm4_3',
      senderId: '4',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Договорились на завтра',
      time: '07:15',
      showDate: false,
    },
  ],
  '5': [
    {
      id: 'm5_1',
      senderId: '5',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Какая площадь офиса?',
      time: 'Вчера',
      showDate: false,
    },
    {
      id: 'm5_2',
      senderId: 'me',
      senderAvatar: 'https://placehold.co/36x36',
      text: '120 квадратных метров, открытая планировка',
      time: 'Вчера',
      showDate: false,
    },
    {
      id: 'm5_3',
      senderId: '5',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Не подходит',
      time: 'Вчера',
      showDate: false,
    },
  ],
  '6': [
    {
      id: 'm6_1',
      senderId: '6',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Коттедж в хорошем состоянии?',
      time: 'Вчера',
      showDate: false,
    },
    {
      id: 'm6_2',
      senderId: 'me',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Да, недавно сделан ремонт. Есть баня и гараж',
      time: 'Вчера',
      showDate: false,
    },
    {
      id: 'm6_3',
      senderId: '6',
      senderAvatar: 'https://placehold.co/36x36',
      text: 'Отлично, жду встречи',
      time: 'Вчера',
      showDate: false,
    },
  ],
};

// Helper function to get chat by ID
export function getChatById(chatId: string): ChatData | undefined {
  return chatListData.find(chat => chat.id === chatId);
}

// Helper function to get messages for a chat
export function getMessagesByChatId(chatId: string): MessageData[] {
  return messagesData[chatId] || [];
}

// Helper function to add a new message
export function addMessage(
  chatId: string,
  message: Omit<MessageData, 'id'>
): void {
  if (!messagesData[chatId]) {
    messagesData[chatId] = [];
  }

  const newMessage: MessageData = {
    ...message,
    id: `m_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };

  messagesData[chatId].push(newMessage);

  // Update last message in chat list
  const chat = chatListData.find(c => c.id === chatId);
  if (chat) {
    chat.lastMessage = message.text;
    chat.lastMessageTime = message.time;
  }
}
