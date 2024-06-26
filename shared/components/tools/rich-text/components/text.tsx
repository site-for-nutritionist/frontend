import { makeClassname } from "@/shared/components";
import { Text } from "@/shared/interfaces";
import { useMemo } from "react";

export function TextComponent(props: Text): JSX.Element {
    const { text, bold, italic, strikethrough, underline } = props
    
    const className = useMemo(() => {
        return makeClassname(
            'rt-text',
            bold && 'rt-text--bold',
            italic && 'rt-text--italic',
            strikethrough && 'rt-text--strikethrough',
            underline && 'rt-text--underline'
        )
    }, [bold, italic, strikethrough, underline])

    return (
        <span className={className}>{text}</span>
    )
}