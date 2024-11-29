import { DOMParser, Schema } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { getBoldPlugin } from './plugins/bold'
import { getItalicPlugin } from './plugins/italic'
import { getUndoPlugin } from './plugins/undo'

// Define a basic schema that only handles plain text
const schema = new Schema({
  nodes: {
    doc: {
      content: 'paragraph+',
    },
    paragraph: {
      content: "text*",
      marks: "_",
      toDOM() {
        return ["p", 0]
      }
    },
    text: {  // basic text node
      group: 'inline'
    }
  },
  marks: {
    strong: {
      toDOM() {
        return ["strong"]
      },
    },
    italic: {
      toDOM() {
        return ["em"]
      }
    }
  }

})








// Create the initial editor state
const state = EditorState.create({
  schema,
  doc: DOMParser.fromSchema(schema).parse(document.querySelector('#editor')!),
  plugins: [
    // getUndoPlugin(schema),
    getBoldPlugin(schema),
    // getItalicPlugin(schema)
  ]
})

// Create and mount the editor
const view = new EditorView(document.querySelector('#editor'), {
  state,

})
