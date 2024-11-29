import { keymap } from 'prosemirror-keymap'
import { Schema } from 'prosemirror-model'
import { Transaction } from 'prosemirror-state'


export function getBoldPlugin(schema: Schema) {
    return keymap({
        "Mod-b": (state, dispatch) => {
            const fromPos = state.selection.$from
            const toPos = state.selection.$to
            const from = fromPos.pos
            const to = toPos.pos


            const boldMark = schema.mark("strong")

            const hasBold = state.doc.rangeHasMark(from, to, boldMark) || state.storedMarks?.includes(boldMark)
            console.log("hasBold", hasBold)
            if (dispatch) {
                let tr: Transaction | null = null

                if (hasBold) {
                    tr = state.tr.removeMark(from, to, boldMark).removeStoredMark(boldMark)
                }
                else {
                    tr = state.tr.addMark(from, to, boldMark).addStoredMark(boldMark)
                }

                dispatch(tr)

            }
            return true

        }
    })
}

