import { ReactNode } from "react";
import style from "./Button.module.css"

interface Props {
    children: ReactNode;
    parentMethod: () => void;
}

interface ChildrenProps {
    children: JSX.Element;
}

export const ColorRed = ({ children }: ChildrenProps) => {
    return (<div className={style.color_red}>{children}</div>);
}

export const Button = ({ children, parentMethod }: Props) => {
    return (
        <button className={style.custom_button} onClick={parentMethod}>
            {children}
        </button>
    );
}