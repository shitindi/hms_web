
import { TextField } from "@mui/material";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function PreDiagnosisForm({ setOpen, entity, setModal }) {

    const [form, setForm] = useState({
        appointment_id: entity.id,
        appointment_reason: entity?.appointment_reason ?? "",
        pre_diagnosis: entity?.pre_diagnosis ?? "",
        doctor_suggestion:  entity?.doctor_suggestion ?? "",
    });

    const axios = useAxiosPrivate()

      const handleSubmit = async () => {


    let response

      let success = true
      let message = 'Pre diagnosis updated successfuly!'
    try {
      response = await axios.post('/appointments/pre-diagnosis', form)

      if (response.status === 200) {

        success = true
        message = 'Pre diagnosis updated successfuly!'

        toast.success(message)
        handleClose()
      } else {
        success = false
        message = response.data
        toast.error(message)
      }
    } catch (err) {
      console.error('POST_ERROR: ', err)
      success = false
      message = 'ERROR: ' + err.response.data.error.message
      toast.error(message)
    }
  }
 

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleClose = () => {
        setOpen(false)
        setModal({
            Component: null,
            modelOpen: false
        })
    }

    return (
        <>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-1 m-6">
               
                <TextField
                     name="complaint"
                     value={form.appointment_reason}
                    required label="Patient complaint" onChange={(e) => handleChange("appointment_reason", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3  outline-none focus:ring-2 focus:ring-sky-500"
                />
                  <div>
                <TextField
                     name="pre_diagnosis"
                     value={form.pre_diagnosis}
                    required label="Provisional diagnosis" onChange={(e) => handleChange("pre_diagnosis", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                />
                </div>
   

                <RichTextEditorBasic
                    onChange={(html) => handleChange("doctor_suggestion", html)}
                    text={form.doctor_suggestion}
                />
            </div>
            <div className="flex flex-col  gap-10 sm:flex-row justify-end m-4 ">
                <button className="rounded-2xl bg-red-400 px-5 py-3 text-sm font-medium
                 text-white hover:bg-red-600 w-40" onClick={handleClose}> 
                    Cancel
                </button>
                <button  className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium
                 text-white hover:bg-sky-700 w-40" onClick={handleSubmit}>
                    Save
                </button>

            </div>
        </>
    );
}

function RichTextEditorBasic({ onChange, text }) {
    const editorRef = useRef(null);
    const formatText = (command) => {
        editorRef.current?.focus();
        document.execCommand(command, false, null);
        onChange?.(editorRef.current?.innerHTML || "");
    };

    return (
        <div className="border  rounded-2xl ">
            <div className="bg-slate-100 p-3 flex gap-2">
                <button onClick={() => formatText("bold")} className="border px-3 py-1">
                    B
                </button>
                <button onClick={() => formatText("italic")} className="border px-3 py-1">
                    I
                </button>
                <button
                    onClick={() => formatText("insertUnorderedList")}
                    className="border px-3 py-1"
                >
                    • List
                </button>
                <button
                    onClick={() => formatText("insertOrderedList")}
                    className="border px-3 py-1"
                >
                    1. List
                </button>
            </div>

            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={() => onChange?.(editorRef.current?.innerHTML || "")}
                className="rich-editor min-h-[200px] p-4 outline-none"
                dangerouslySetInnerHTML={{__html: text }}
            >
            </div>

            <style>{`
        .rich-editor ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .rich-editor ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        .rich-editor li {
          display: list-item;
        }
      `}</style>
        </div>
    );
}
