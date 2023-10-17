"use client";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });
  const { name, ref, onChange, onBlur } = register("email");
  const onSubmit = handleSubmit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(data);
  });
  console.log(errors.email);

  return (
    <div className="App">
      <h1>ログインしたいよ！</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "入力が必須の項目です。",
              },
              minLength: {
                value: 8,
                message: "8文字以上入力して下さい。",
              },
            })}
          />
          {errors.email?.message && <div>{errors.email.message}</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "入力が必須の項目です。",
              },
              minLength: {
                value: 8,
                message: "8文字以上入力して下さい。",
              },
            })}
            type="password"
          />
          {errors.password?.type === "required" && (
            <div>入力が必須の項目です。</div>
          )}
          {errors.password?.type === "minLength" && (
            <div>８文字以上入力してください。</div>
          )}
        </div>
        <button type="submit" disabled={!isDirty}>
          ログイン
        </button>
      </form>
    </div>
  );
}

export default App;
