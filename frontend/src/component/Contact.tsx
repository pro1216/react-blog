import React, { ReactNode } from "react";
import { Common } from "../component/Common";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormData } from "../types/blog";
import "../styles/contact.css";

export default function Contact() {
  const [formData, setFormData] = React.useState<FormData | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    try {
      setLoading(true);
      fetch("https://react-blog-4bm0.onrender.com/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData(data);
          alert("送信が完了しました。");
        });
    } catch (error) {
      console.error("フォーム送信エラー", error);
      alert("送信に失敗しました。");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Common>
      <main>
        <div className="contact-page">
          <h2>お問い合わせ</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">名前:</label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  maxLength: {
                    value: 50,
                    message: "名前は50文字以内で入力してください",
                  },
                })}
              />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">メール:</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "メールアドレスを入力してください。",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "有効なメールアドレスを入力してください。",
                  },
                })}
              />
              {errors.email && (
                <p className="error-message">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="message">お問い合わせ内容:</label>
              <textarea
                id="message"
                {...register("message", {
                  required: "お問い合わせ内容を入力してください。",
                  minLength: {
                    value: 10,
                    message: "10文字以上入力してください。",
                  },
                })}
              ></textarea>
              {errors.message && (
                <p className="error-message">{errors.message.message}</p>
              )}
            </div>
            <button type="submit">{loading ? "送信中..." : "送信"}</button>
          </form>
        </div>
      </main>
    </Common>
  );
}
