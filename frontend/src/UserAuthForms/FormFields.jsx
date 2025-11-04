// FormFields.jsx
export const Input = ({ type = "text", placeholder, value, setValue }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
               focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
               bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
               placeholder-gray-400 dark:placeholder-gray-500 
               transition duration-200 ease-in-out"
  />
);

export const Fields = (state, handlers) => {
  const {
    isRegister,
    useCode,
    forgotPassword,
    email,
    password,
    confirmPassword,
    phone,
    code,
    firstName,
    lastName,
  } = state;

  const {
    setEmail,
    setPassword,
    setConfirmPassword,
    setPhone,
    setCode,
    setFirstName,
    setLastName,
    handleSendCode,
  } = handlers;

  // --- Generator-style structure ---
  const fields = [];

  // Registration fields
  if (isRegister) {
    fields.push(
      <Input key="first" placeholder="First Name" value={firstName} setValue={setFirstName} />,
      <Input key="last" placeholder="Last Name" value={lastName} setValue={setLastName} />,
      <Input key="email" type="email" placeholder="Email" value={email} setValue={setEmail} />,
      <Input key="pass" type="password" placeholder="Password" value={password} setValue={setPassword} />,
      <Input key="confirm" type="password" placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} />,
      <Input key="phone" type="tel" placeholder="Phone Number" value={phone} setValue={setPhone} />
    );
  }

  // Login with code
  else if (useCode) {
    fields.push(
      <Input key="phone" type="tel" placeholder="Phone Number" value={phone} setValue={setPhone} />,
      <div key="code-group" className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
        <Input key="code" type="text" placeholder="Verification Code" value={code} setValue={setCode} />
        <button type="button" onClick={handleSendCode} className="btn-outline w-full sm:w-auto text-sm sm:text-base">
          Send Code
        </button>
      </div>
    );
  }

  // Login with email/password
  else {
    fields.push(
      <Input key="email" type="email" placeholder="Email" value={email} setValue={setEmail} />,
      <Input key="pass" type="password" placeholder="Password" value={password} setValue={setPassword} />
    );
  }

  // Forgot password message (if needed)
  if (forgotPassword && !isRegister) {
    fields.unshift(
      <p key="forgot-message" className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Enter your email or phone number to receive a password reset code.
      </p>
    );
  }

  return fields;
};
