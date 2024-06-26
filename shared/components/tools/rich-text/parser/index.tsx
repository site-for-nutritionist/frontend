import { RichTextItem } from "@/shared/interfaces";
import { ReactNode } from "react";

import { HeadingComponent } from "../components/heading";
import { TextComponent } from "../components/text";
import { LinkComponent } from "../components/link";
import { ParagraphComponent } from "../components/paragraph";
import { ListComponent } from "../components/list";
import { ListItemComponent } from "../components/list-item";

export function richTextParser(item: RichTextItem): ReactNode {
    switch (item.type) {
        case 'heading': return <HeadingComponent {...item} />
        case 'text': return <TextComponent {...item} />
        case 'link': return <LinkComponent {...item} />
        case 'paragraph': return <ParagraphComponent {...item} />
        case 'list': return <ListComponent {...item} />
        case 'list-item': return <ListItemComponent {...item} />
        default: return null
    }
}