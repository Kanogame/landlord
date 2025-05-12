import type { ButtonTextProps } from "./buttons"

export default function ButtonEmpty(props: ButtonTextProps) {

    function handleClick() {
        if (props.onClick) {
            props.onClick();
        }
    }

    return (
        <button className="button-empty" onClick={handleClick}>{props.label}</button>
    )
}