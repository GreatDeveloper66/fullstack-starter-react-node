import {
  FirstNameInput,
  LastNameInput,
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
  PhoneNumberInput,
} from "../Components/FormComponents";

const LoginForm = () => {
  return (
    <div>
      <h2>Login Form will be here</h2>
      <FirstNameInput />
      <LastNameInput />
      <EmailInput />
      <PasswordInput />
      <ConfirmPasswordInput />
      <PhoneNumberInput />
    </div>
  );
};

export default LoginForm;
