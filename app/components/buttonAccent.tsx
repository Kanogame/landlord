import type { ButtonTextProps } from "./buttons"


export default function ButtonAccent(props: ButtonTextProps) {

    function handleClick() {
        if (props.onClick) {
            props.onClick();
        }
    }


    return (
        <button className="button-accent" style={{
            "width": props.width + "px",
            "height": props.height + "px",
        }
        } onClick={handleClick} > {props.label}</button >
    )
}