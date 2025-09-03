import React from "react";
import { Header, Footer } from "./Main";
import { useForm, SubmitHandler } from "react-hook-form";
import '../styles/contact.css';


export const Contact: React.FC = () => {
    return (
        <body>
            <Header />
            <Inq />
            <Footer />
        </body>
    );
}

interface FormData {
    name: string;
    email: string;
    message: string;
}
export const Inq: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        console.log("フォーム送信データ" + data);
        alert('test');
    };
    return (
        <div className="contact-page">
            <h2>お問い合わせ</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">名前:</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { 
                            required: "名前を入力してください",
                            pattern:{
                                value:/'/,
                                message:"名前を入力してください"
                            } 
                        })}
                    />
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
                        })} />
                    {errors.email && <p className="error-message">{errors.email?.message}</p>}
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
                    {errors.message && <p className="error-message">{errors.message.message}</p>}
                </div>
                <button type="submit">送信</button>
            </form>
        </div>
    )
}