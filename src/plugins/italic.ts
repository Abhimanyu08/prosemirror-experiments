
import { Schema } from 'prosemirror-model'
import { Plugin, Transaction } from 'prosemirror-state'
export function getItalicPlugin(schema: Schema) {

    return new Plugin({
        props: {
            handleKeyDown(view, event) {
                if (!(event.metaKey && event.key === "i")) return false
                // check if there's a selection
                const currentState = view.state
                const fromPos = currentState.selection.$from
                const toPos = currentState.selection.$to
                const from = fromPos.pos
                const to = toPos.pos


                const italicMark = schema.mark("italic")

                const hasItalic = fromPos.marks().includes(italicMark) && toPos.marks().includes(italicMark)

                let tr: Transaction | null = null

                if (hasItalic)
                    tr = currentState.tr.removeMark(from, to, italicMark).removeStoredMark(italicMark)
                else tr = currentState.tr.addMark(from, to, italicMark).addStoredMark(italicMark)
                // Explicitly clear marks at selection end

                view.updateState(currentState.apply(tr))
                return true


            }
        }
    })
}