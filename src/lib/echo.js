import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export const Chat = () => {
  if (typeof window !== 'undefined') {
    window.Pusher = Pusher;
    window.Pusher.logToConsole = true;

    const echo = new Echo({
      broadcaster: 'pusher',
      key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
      // wsHost: 'realtime-pusher.ably.io',
      wsPort: 443,
      enableStats: false,
      encrypted: true,
    });

    return echo; // Echoインスタンスを返す
  } else {
    return null; // windowがundefinedの場合はnullを返す
  }
};
