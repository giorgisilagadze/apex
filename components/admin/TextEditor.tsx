"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import React, { useEffect, useState } from "react";

interface Props {
  onChange: (key: string, value: string) => void;
  inputKey: string;
  value: string;
}

const TextEditor = ({ onChange, inputKey, value }: Props) => {
  const [editorContent, setEditorContent] = useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
    ],
    content: editorContent, // Initially setting the content from state
    onUpdate({ editor }) {
      // Whenever the editor updates, update the state
      setEditorContent(editor.getHTML());
      onChange(inputKey, editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      // Update the editor content when the editorContent state changes
      editor.commands.setContent(editorContent);
    }
  }, [editorContent, editor]);

  const handleClear = () => {
    if (editor) {
      // Manually clear the content and reset to default
      editor.chain().focus().clearNodes().unsetAllMarks().run();
      setEditorContent("");
      onChange(inputKey, "");
    }
  };

  const buttonClass = (isActive: boolean) =>
    `text-[14px] px-2 py-1 rounded-[10px] ${
      isActive ? "bg-blue text-white" : "bg-white text-black"
    }`;

  if (!editor) return null;

  return (
    <div className="">
      <div className="flex flex-wrap border border-blue rounded-tl-[10px] rounded-tr-[10px] p-2 gap-1">
        <button
          className={buttonClass(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          className={buttonClass(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          className={buttonClass(editor.isActive("strike"))}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          Strike
        </button>
        <button
          className={buttonClass(editor.isActive("heading", { level: 1 }))}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          className={buttonClass(editor.isActive("heading", { level: 3 }))}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>
        <button
          className={buttonClass(editor.isActive("bulletList"))}
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
            setEditorContent(editor.getHTML());
          }}
        >
          • List
        </button>
        <button
          className={buttonClass(editor.isActive("orderedList"))}
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run();
            setEditorContent(editor.getHTML());
          }}
        >
          1. List
        </button>
        <button
          className={buttonClass(editor.isActive("blockquote"))}
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run();
            setEditorContent(editor.getHTML());
          }}
        >
          “ Quote
        </button>
        <button
          className={buttonClass(editor.isActive("codeBlock"))}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          {"</>"} Code
        </button>
        <button
          className={buttonClass(false)}
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          className={buttonClass(false)}
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </button>
        <button className={buttonClass(false)} onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className="border border-blue rounded-bl-[10px] rounded-br-[10px] p-3 min-h-[150px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
