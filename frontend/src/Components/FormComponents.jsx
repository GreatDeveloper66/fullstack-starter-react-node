const GenericInput = ({ type, placeholder, value, setValue, ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="w-full border border-gray-600 dark:border-gray-700 rounded-lg px-3 py-2
               focus:ring-2 focus:ring-blue-400 focus:border-blue-400
               bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                transition duration-200 ease-in-out"
    {...props}
  />
);

const FirstNameInput = ({ value, setValue, ...props }) => (
  <GenericInput
    type="text"
    placeholder="First Name"
    value={value}
    setValue={setValue}
    {...props}
  />
);

const LastNameInput = ({ value, setValue, ...props }) => (
  <GenericInput
    type="text"
    placeholder="Last Name"
    value={value}
    setValue={setValue}
    {...props}
  />
);

const EmailInput = ({ value, setValue, ...props }) => (
  <GenericInput
    type="email"
    placeholder="Email Address"
    value={value}
    setValue={setValue}
    {...props}
  />
);

const PasswordInput = ({ value, setValue, ...props }) => (
  <GenericInput
    type="password"
    placeholder="Password"
    value={value}
    setValue={setValue}
    {...props}
  />
);

const ConfirmPasswordInput = ({ value, setValue, ...props }) => (
  <GenericInput
    type="password"
    placeholder="Confirm Password"
    value={value}
    setValue={setValue}
    {...props}
  />
);

const PhoneNumberInput = ({ value, setValue, ...props }) => (
  <GenericInput
    type="tel"
    placeholder="Phone Number"
    value={value}
    setValue={setValue}
    {...props}
  />
);

const RememberMeCheckbox = ({ checked, onChange, ...props }) => (
  <label className="flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="mr-2"
              />
              Remember Me
            </label>
);

export {
  FirstNameInput,
  LastNameInput,
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
  PhoneNumberInput,
  RememberMeCheckbox
};


