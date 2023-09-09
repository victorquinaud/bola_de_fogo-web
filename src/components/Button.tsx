import { memo } from "react";
import { IButton } from "../interfaces";

const Button = (props: IButton) => {

    return (
        <button
            onClick={props.click}
            className="py-4 bg-sky-600 text-white active:bg-sky-500"
            style={{flexGrow: "1"}}
        > { props.label }</button >
    );
};

export default memo(Button);