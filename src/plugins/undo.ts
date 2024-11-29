
import { Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'


export function getUndoPlugin(schema: Schema) {
    return new Plugin<{ history: EditorState[] }>({
        props: {
            handleKeyDown(view, event) {
                if (!(event.metaKey && event.key === "z")) return false

                const history = this.getState(view.state)?.history
                if (!history) return false
                view.updateState(history[history.length - 1])

                return true
            }
        },
        state: {
            init() {
                return { history: [] }
            },
            apply(tr, value, oldState, newState) {
                return { history: [...value.history, oldState] }
            }
        }
    })
}