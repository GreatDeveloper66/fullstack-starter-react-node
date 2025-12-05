import {
  FirstNameInput,
  LastNameInput,
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
  PhoneNumberInput,
} from "../Components/FormComponents";

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission logic here
};

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 relative">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h2>Login Form will be here</h2>
            <FirstNameInput />
            <LastNameInput />
            <EmailInput />
            <PasswordInput />
            <ConfirmPasswordInput />
            <PhoneNumberInput />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
