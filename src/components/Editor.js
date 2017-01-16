import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setEditor } from '../actions/editor'
import { Dante, DanteEditor } from 'Dante2'

class Editor extends Component {

  async componentWillMount() {
    const { dispatch } = this.props
    dispatch(setEditor(new Dante({
      api_key: 'b3f685696e074438a946a0348d26f767',
      el: "editor",
      read_only: !this.props.editable,
      upload_url: "https://api.imgur.com/3/upload",
      upload_formName: 'image',
      upload_headers: {
        'Authorization': `Client-ID 5e71f9942da61c8`
      },
      image_upload_callback: (json, context) => {
        const url = json.data.data.link.replace('http:', 'https:')

        context.uploadCompleted({url})
      },
      content: this.props.content,
    })))
  }

  componentDidUpdate(nextProps, nextState) {
    const { editor } = this.props

    if (!editor.editor || editor.editor === nextProps.editor) return

    editor.editor.render()
    editor.editor.editor.refs.editor._focus() // ;-;
  }

  render() {
    return (
      <div className="editor" id="editor" scoped></div>
    )
  }
}

const inject = (state) => {
  return {
    post: state.post,
    editor: state.editor
  }
}

export default connect(inject)(Editor)
