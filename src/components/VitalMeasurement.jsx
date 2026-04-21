import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function VitalsMeasurement({ setOpen, entity, setModal }) {

    const [userInfo] = useSelector(state => {
        return [state.userroles]
    })

    const [vitals, setVitals] = useState({
        id: entity?.id,
        tenant_id: userInfo.tenantId,
        apointment_id: entity?.apointment_id,
        created_by: entity?.created_by ?? userInfo.userId,
        bp_systolic: entity?.bp_systolic,
        bp_diastolic: entity?.bp_diastolic,
        pulse_rate: entity?.pulse_rate,
        temperature: entity?.temperature,
        respiratory_rate: entity?.respiratory_rate,
        oxygen_saturation: entity?.oxygen_saturation,
        weight_kg: entity?.weight_kg,
        height_cm: entity?.height_cm,
        blood_glucose: entity?.blood_glucose,
        notes: entity?.notes,
    });

    const axios = useAxiosPrivate()

    const [object, setObject] = useState(entity)
    
    const handleChange = (field, value) => {
        setVitals(prev => ({ ...prev, [field]: value }));
    };

    const handleClose = () => {
        setOpen(false)
        setModal({
            Component: null,
            modelOpen: false
        })
    }

    const handleSubmit = async () => {
        let success = true
        let message = "Vitals updated successfuly"
        let response
        try {
            response = await axios.post('/patients/vital', vitals)

            if (response.status === 200) {

                success = true
                message = 'Vitals record updated successfuly!'

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

    return (
        <div className="min-h-screen bg-slate-100 p-6 ">
            <div className="max-w-5xl mx-auto space-y-6">

                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Vitals Measurement</h1>
                    <p className="text-slate-500">Record patient vital signs</p>
                </div>

                {/* Vitals Form */}
                <div className="bg-white rounded-3xl p-6 shadow-sm ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {/* Blood Pressure */}
                        <div className="flex flex-col">
                            <label className="text-sm text-slate-600 mb-1">Blood Pressure (mmHg)</label>
                            <div className="flex gap-2">
                                <input
                                    value={vitals.bp_systolic}
                                    placeholder="Systolic"
                                    onChange={(e) => handleChange("bp_systolic", e.target.value)}
                                    className="border  border-gray-300 rounded-xl px-3 py-2 w-full"
                                    type="number"
                                />
                                <input
                                    value={vitals.bp_diastolic}
                                    placeholder="Diastolic"
                                    onChange={(e) => handleChange("bp_diastolic", e.target.value)}
                                    className="border  border-gray-300 rounded-xl px-3 py-2 w-full"
                                    type="number"
                                />
                            </div>
                        </div>

                        <Input label="Heart Rate (bpm)" value={vitals.pulse_rate} onChange={(v) => handleChange("pulse_rate", v)} />

                        <Input label="Temperature (°C)" value={vitals.temperature} onChange={(v) => handleChange("temperature", v)} />

                        <Input label="Respiratory Rate" value={vitals.respiratory_rate} onChange={(v) => handleChange("respiratory_rate", v)} />

                        <Input label="SpO₂ (%)" value={vitals.oxygen_saturation} onChange={(v) => handleChange("oxygen_saturation", v)} />

                        <Input label="Blood Glucose" value={vitals.blood_glucose} onChange={(v) => handleChange("blood_glucose", v)} />

                        <Input label="Weight (kg)" value={vitals.weight_kg} onChange={(v) => handleChange("weight_kg", v)} />

                        <Input label="Height (cm)" value={vitals.height_cm} onChange={(v) => handleChange("height_cm", v)} />

                    </div>

                    <div className="mt-6">
                        <label className="text-sm text-slate-600">Notes</label>
                        <textarea
                            className="w-full border  border-gray-300 rounded-2xl p-3 mt-2"
                            rows={4}
                            value={vitals.notes}
                            onChange={(e) => handleChange("notes", e.target.value)}
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button className="px-4 py-2 border  border-gray-300 rounded-xl" onClick={handleClose}>Cancel</button>
                        <button className="px-4 py-2 bg-sky-600 text-white rounded-xl" onClick={handleSubmit}>Save Vitals</button>
                    </div>
                </div>



            </div>
        </div>
    );
}

function Input({ label, value, onChange, placeholder }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm text-slate-600 mb-1">{label}</label>
            <input
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="border  border-gray-300 rounded-xl px-3 py-2"
                type="number"
            />
        </div>
    );
}
