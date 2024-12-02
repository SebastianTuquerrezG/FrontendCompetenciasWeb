import { Control, Controller, FieldError } from "react-hook-form";
import style from "./InputForm.module.css"

interface Props {
    name: string;
    control: Control<any>;
    label: string;
    type?: string;
    error?: FieldError;
}

export const InputForm = ({ name, control, label, type, error }: Props) => {
    return (
        <div className={style.inputGroup}>
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) =>
                    <input id={name} type={type} {...field} className={`form-control ${error ? "is-invalid" : ""}`} />
                }
            />
            {error && <p className="error">{error?.message}</p>}
        </div>
    );
}