import { useState } from "react";

function LoginInput({
  userText,
  passText,
  children,
  studentNumber,
  onChangeStudentNum,
  password,
  onChangeStudentPass,
  onSubmit,
  showSuccessMessage,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <form
        className={`${
          !showSuccessMessage ? "bg-white/100" : "bg-dirtyWhite/60"
        } flex flex-col gap-5 text-xs rounded w-full md:min-w-[300px] md:max-w-[500px] p-6 shadow-lg backdrop-blur-sm`}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-0.5">
          <label className="text-xs">{userText}:</label>
          <input
            className="outline-none bg-transparent p-2 text-sm border border-black500 transition-[border-radius]"
            type="text"
            value={studentNumber}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, ""); // Remove non-digits
              onChangeStudentNum(onlyNums);
            }}
            maxLength={11}
            disabled={showSuccessMessage}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-xs">{passText}:</label>
          <input
            className="outline-none bg-transparent p-2 text-sm border border-black500 transition-[border-radius]"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => onChangeStudentPass(e.target.value)}
            disabled={showSuccessMessage}
          />
          <div className="flex items-center gap-1 mt-3">
            <input
              className="outline-none bg-transparent p-2 text-sm border border-black500 transition-[border-radius]"
              type="checkbox"
              id="showPasswordCheckbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <label className="text-xs" htmlFor="showPasswordCheckbox">
              Show password
            </label>
          </div>
        </div>
        {children}
      </form>
    </div>
  );
}

export default LoginInput;
