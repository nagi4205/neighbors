// components/InputForm.js
const InputForm = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-white text-gray-800 shadow-md">
      <input
        type="text"
        placeholder="Your message..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default InputForm;
