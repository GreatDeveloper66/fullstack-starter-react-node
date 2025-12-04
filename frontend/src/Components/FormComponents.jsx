const FirstNameInput = ({ value, setValue }) => (
  <input
    type="text"
    placeholder="First Name"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
               focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
               bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                transition duration-200 ease-in-out"
    />
);

export default FirstNameInput;
