import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const LabResults = ({appointmentId}) => {

    const [result, setResult] = useState([])
    const axios = useAxiosPrivate()
      useEffect(() => {

        const fetchLabTests = async () => {
          try {
    
            const entityResult = await axios.get(`/appointments/lab-results/${appointmentId}`)
            if (entityResult.status === 200) {
              const success = true
              const message = (entityResult?.data?.length ?? 0) + ' record(s) found'
              setResult(entityResult.data)
            } 
          } catch (err) {
            console.error('ERROR: ', err)
          }
        } 
      
        fetchLabTests()
      }, [])
  console.error('RESUTS: ', result)
      const labResults = result.map ( res => {
        return {
            test: res?.TestCatalog.test_name,
            result: res?.test_result ?? 'pending' + ', ' + (res?.ResultStatus?.name ?? ''),
            date: res?.result_date,
            status: res?.result_completed ?? false,
            result_notes:  res?.result_notes ,
            result_status: res?.result_status,
            result_completed: res?.result_completed
        }
      })
      
    const getStatusClasses = (isCompleted) => {
    if (isCompleted) {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    else
      return 'bg-amber-50 text-amber-700 border border-amber-200';
 
  };
  
  return (
    <div>
          <h2 className="text-xl font-semibold text-slate-900">Laboratory Results</h2>
                <div className="mt-5 space-y-4">
                  {labResults.map((item) => (
                    <div key={item.test + item.date} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-slate-900">{item.test}</div>
                          <div className="mt-1 text-sm text-slate-600">{item.result}</div>
                          <div className="mt-1 text-sm text-slate-600">{item.result_notes}</div>
                          <div className="mt-2 text-xs text-slate-500">{item?.date ?? '27 Jan, 2026'}</div>
                        </div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.result_completed)}`}>
                          {
                            item.result_completed? 'Completed': 'Waiting'
                            }
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
    </div>
  )
}

export default LabResults
