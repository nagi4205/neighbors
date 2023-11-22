import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

export const Chat = () => {
  window.Pusher = Pusher;

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    // wsHost: 'realtime-pusher.ably.io',
    wsPort: 443,
    disableStats: true,
    encrypted: true,
  });

  console.log('window.Echo', window.Echo);

  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const echo = new Echo({
  //     broadcaster: 'pusher',
  //     client: new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_APP_KEY}`, {
  //       cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  //       //ここから
  //       // wsPath: process.env.NEXT_PUBLIC_PUSHER_APP_PATH,
  //       // wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST,
  //       // wssPort: process.env.NEXT_PUBLIC_PUSHER_PORT ?? 443,
  //       // wsPort: process.env.NEXT_PUBLIC_PUSHER_PORT ?? 80,
  //       // forceTLS:
  //       //   (process.env.NEXT_PUBLIC_PUSHER_SCHEME ?? 'https') === 'https',
  //       // enableStats: false,
  //       // enabledTransports: ['ws', 'wss'],
  //       //ここまでコメントアウト
  //       //   channelAuthorization: {
  //       //       transport: 'ajax',
  //       //       endpoint: `...`,
  //       //       headersProvider: () => {
  //       //           //
  //       //       },
  //       //   },
  //     }),
  //   });

  //   const channel = echo.channel('chat');
  //   const allMessage = [];

  //   channel
  //     .subscribed(() => {
  //       console.log('You are subscribed');
  //     })
  //     .listen('.chat_message', (event) => {
  //       // setMessages((oldMessages) => [...oldMessages, event.message]);
  //       allMessage.push(event.message);
  //       setMessages(allMessage);
  //       setMessage('');
  //     });
  // }, []);

  // const sendMessage = async (e) => {
  //   e.preventDefault();

  //   if (message !== '') {
  //     axios.post('chat-message', {
  //       message: message,
  //     });
  //   }
  // };
};
