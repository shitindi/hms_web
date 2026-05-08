import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const PrescriptionResults = ({ result }) => {

  const prescriptionResults = !result ? [] : result.map(res => {
    return {
      id: res.id,
      medicine: res?.Medicine?.name + ', ' + res?.Medicine?.Form.name,
      status: res?.Status.name,
      status_id: res?.status_id ?? 1,
      manufacturer: res?.manufacturer,
      dosage: 'dosage: ' + res?.dosage + ', freq: ' + res?.frequency + ', qty: ' + res?.quantity + ', dur: ' + res?.duration
    }
  })

  const getStatusClasses = (statusId) => {

    if (statusId == 2 || statusId == 3) {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    else
      return 'bg-amber-50 text-amber-700 border border-amber-200';

  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">Prescriptions</h2>
      <div className="mt-5 space-y-4">
        {prescriptionResults.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-900">{item.medicine}</div>
                <div className="mt-1 text-sm text-slate-600">{item.manufacturer}</div>
                <div className="mt-2 text-xs text-slate-500">{item?.dosage}</div>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status_id)}`}>
                {
                  item.status
                }
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PrescriptionResults
