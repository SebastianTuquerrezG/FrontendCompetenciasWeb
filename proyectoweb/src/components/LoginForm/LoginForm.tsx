import { z } from "zod";
import style from "./LoginForm.module.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputForm } from "../index";


const schema = z.object({
    /** Add the others params of the formulary if you need it */
    username: z.string().min(1, "El nombre de usuario es obligatiorio."),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
});

type FormValues = z.infer<typeof schema>;

interface Props {
    onLogin: (username: string, password: string) => void;
}

export const LoginForm = ({ onLogin }: Props) => {

    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        onLogin(data.username, data.password);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <InputForm name="username" control={control} label="Usuario:" type="text" error={errors.username} />
            <InputForm name="password" control={control} label="Password:" type="password" error={errors.password} />
            <button type="submit" className={style.loginButton}>Login</button>
        </form>
    );
}