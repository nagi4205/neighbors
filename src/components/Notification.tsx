type NotificationProps = {
  message: string;
  onClose: () => void;
};

const Notification = ({ message, onClose }: NotificationProps) => {
  return (
    <div className='fixed top-16 right-32 bg-green-500 text-light-2 p-4 rounded-lg m-4 shadow-md'>
      <div className='flex'>
        <p>{message}</p>
        <button onClick={onClose} className='ml-4 text-white'>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Notification;
