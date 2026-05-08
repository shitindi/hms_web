import { MenuItem, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getJSDateFromDb, getStringDate } from '../../Utilities/DateTime';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function IndividualServicePaymentForm({ setOpen, entity, setModal }) {

  const [patient, setPatient] = useState({
    name: 'NA',
    registration_no: 'NA',
    appointment_date: getStringDate(new Date())
  }
  )

  const axios = useAxiosPrivate()

  const [services, setServices] = useState([
    {
      id: 1,
      category: '',
      serviceName: '',
      reference: '',
      amount: 0,
      paid: 0,
      status: 'Unpaid',
    }
  ])

  const setBillingItems = entity => {
    let servicesList = []
    const id = entity.id
    let consultation = 0
    let prescription = 0
    let labtest = 0
    if (paymentStatusIsValid(entity?.PaymentStatus.id ?? 0)) {
      servicesList.push(
        {
          id: 1,
          category: 'Consultation',
          serviceName: 'Doctor consultation',
          reference: 'CONS-001',
          amount: entity?.appointment_fee ?? 0,
          paid: 0,
          status: 'Unpaid',
        }
      )
    }
    if (entity?.Prescription && entity?.Prescription.length > 0) {
      entity.Prescription.forEach(p => {
        prescription += Number(p.Medicine.price) * Number(p.quantity)
      })
      servicesList.push(
        {
          id: 3,
          category: 'Pharmacy',
          serviceName: 'Medicine Prescription',
          reference: 'PHA-003',
          amount: prescription,
          paid: 0,
          status: 'Unpaid',
        }
      )
    }

    if (entity?.LabReqests && entity?.LabReqests.length > 0) {
      entity.LabReqests.forEach(p => {
        labtest += Number(p.TestCatalog.cost)
      })

      servicesList.push(
        {
          id: 2,
          category: 'Laboratory',
          serviceName: 'Laboratory Services',
          reference: 'LAB-002',
          amount: labtest,
          paid: 0,
          status: 'Unpaid',
        }
      )
    }

    if (!servicesList || servicesList.length == 0) {
      toast.error('This patient has no pending bills')
      setOpen(false)
      setModal({
        Component: null,
        modelOpen: false
      })

    }
    setServices(servicesList)
    setSelectedServiceId(servicesList[0]?.id ?? 0)
  }

  const paymentStatusIsValid = status => {
    if (status == 1 || status == 3 || status == 5)
      return true
    else
      return false
  }
  let [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id ?? 0);


  useEffect(() => {
    if (entity) {

      setPatient({
        name: entity?.Patient?.Contact.first_name + ' ' + entity?.Patient?.Contact.last_name,
        registration_no: entity?.Patient?.registration_no,
        appointment_date: getJSDateFromDb(entity.appointment_date).toDateString()
      })
      setBillingItems(entity)

    }

  }, [])


  const [userInfo, paymentTypes,] = useSelector(state => {
    return [state.userroles, state.lookups.payment_types]
  })

  const [payment, setPayment] = useState({
    appointment_id: 0,
    service_id: 0,
    amount: '',
    method: 1,
    reference_no: '',
    notes: '',
  });

  const selectedService = useMemo(() => {

    return services.find((service) => service.id === Number(selectedServiceId));
  }, [selectedServiceId, services]);
  const serviceBalance = selectedService.amount - selectedService.paid;
  const paymentAmount = Number(payment.amount || 0);
  const remainingAfterPayment = serviceBalance - paymentAmount;

  const formatMoney = (value) => {
    return new Intl.NumberFormat('en-TZ').format(Number(value || 0)) + ' TZS';
  };

  const handlePaymentChange = (field, value) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (value) => {

    setSelectedServiceId(value);
    setPayment(
      {
        appointment_id: 0,
        service_id: 0,
        amount: '',
        method: 1,
        reference_no: '',
        notes: '',
      }
    );
  };
  const handleSubmit = async () => {


    payment.service_id = selectedServiceId
    payment.appointment_id = entity.id

    let response

    let success = true
    let message = 'payment updated successfuly!'
    try {
      response = await axios.post('/billing/pay-service', payment)

      if (response.status === 200) {

        success = true
        message = 'payment updated successfuly!'

        toast.success(message)
        setServices(prev => {
          const filtered = prev.filter(service => {
            return service.id !== selectedServiceId
          })
          if (filtered && filtered.length > 0) {
            setSelectedServiceId(filtered[0].id)
          } else {
            handleClose()
          }


          return filtered
        })

        setPayment(
          {
            appointment_id: 0,
            service_id: 0,
            amount: 0,
            method: 1,
            reference_no: '',
            notes: '',
          }
        );
      } else {
        success = false
        message = response.data
        toast.error(message)
      }
    } catch (err) {
      console.error('POST_ERROR: ', err)
      success = false
      message = 'ERROR: ' + err?.response?.data?.error?.message ?? "Netowrk error occured!"
      toast.error(message)
    }

  };

  const handleClose = () => {
    setOpen(false)
    setModal({
      Component: null,
      modelOpen: false
    })

    window.location.reload();
  }




  const getStatusClasses = (status) => {
    if (status === 'Paid') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'Partial') {
      return 'bg-sky-50 text-sky-700 border border-sky-200';
    }
    return 'bg-amber-50 text-amber-700 border border-amber-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">

        <section className="mt-2 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
              <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <InfoCard label="Patient" value={patient.name} />
                <InfoCard label="Patient ID" value={patient.registration_no} />
                <InfoCard label="Invoice No." value="INV-2026-10482" />
                <InfoCard label="Visit Date" value={patient.appointment_date} />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Select Service to Pay</h2>

              <div className="mt-2">
                <select
                  id="service"
                  value={selectedServiceId}
                  onChange={(event) => handleServiceChange(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.category} - {service.serviceName} ({formatMoney(service.amount - service.paid)} balance)
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-2 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Selected Service</div>
                    <div className="mt-1 text-lg font-bold text-slate-900">{selectedService.serviceName}</div>
                    <div className="mt-2 text-sm text-slate-600">
                      {selectedService.category} • Ref: {selectedService.reference}
                    </div>
                  </div>

                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(selectedService.status)}`}>
                    {selectedService.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <InfoCard label="Service Amount" value={formatMoney(selectedService.amount)} />
                  <InfoCard label="Already Paid" value={formatMoney(selectedService.paid)} />
                  <InfoCard label="Current Balance" value={formatMoney(serviceBalance)} highlight />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Payment Details</h2>

              <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>

                  <TextField
                    size='small' id="amount" type="number" min="0" max={serviceBalance} value={payment.amount}
                    onChange={(event) => handlePaymentChange('amount', event.target.value)}
                    label="Enter amount"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {paymentAmount > serviceBalance && (
                    <p className="mt-2 text-sm text-red-600">
                      Amount cannot exceed the selected service balance.
                    </p>
                  )}
                </div>

                <div>
                  <TextField
                    id="method" size="small" select label="Payment method" value={payment.method}
                    onChange={(event) => handlePaymentChange('method', event.target.value)} id="method"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {
                      (paymentTypes && paymentTypes.length > 0) &&
                      paymentTypes.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>

                </div>

                <div>

                  <TextField
                    size='small' id="reference_no" type="text" value={payment.reference_no}
                    onChange={(event) => handlePaymentChange('reference_no', event.target.value)}
                    placeholder="Receipt / transaction number" label='Reference No.'
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>

                  <TextField
                    size='small' id="remaining" type="text" label='Balance'
                    value={formatMoney(Math.max(remainingAfterPayment, 0))}
                    readOnly
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <TextField
                    id="notes" rows="2" value={payment.notes} multiline="true" label='Notes'
                    onChange={(event) => handlePaymentChange('notes', event.target.value)}
                    placeholder="Payment remarks, insurance notes, or cashier comments"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="flex flex-col  gap-10 sm:flex-row justify-end m-4 ">
                <button className="rounded-2xl bg-red-400 px-5 py-3 text-sm font-medium
                 text-white hover:bg-red-600 w-40" onClick={handleClose}>
                  Cancel
                </button>
                <button
                  className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium
                 text-white hover:bg-sky-700 w-40 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleSubmit}
                  disabled={!payment.amount || paymentAmount <= 0 || paymentAmount > serviceBalance}
                >
                  Confirm Payment
                </button>

              </div>


            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Service Payment Summary</h2>
              <div className="mt-5 space-y-4 text-sm text-slate-700">
                <SummaryRow label="Service Amount" value={formatMoney(selectedService.amount)} />
                <SummaryRow label="Already Paid" value={formatMoney(selectedService.paid)} />
                <SummaryRow label="Balance" value={formatMoney(serviceBalance)} />
                <SummaryRow label="Paying Now" value={formatMoney(paymentAmount)} />
                <div className="flex items-center justify-between rounded-2xl bg-amber-50 p-4 text-amber-800">
                  <span className="font-medium">Remaining</span>
                  <span className="text-lg font-bold">{formatMoney(Math.max(remainingAfterPayment, 0))}</span>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">All Services</h2>
              <div className="mt-5 space-y-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceChange(service.id)}
                    className={`w-full rounded-2xl border p-4 text-left text-sm hover:bg-slate-50 ${Number(selectedServiceId) === service.id
                      ? 'border-sky-300 bg-sky-50'
                      : 'border-slate-200 bg-white'
                      }`}
                  >
                    <div className="font-semibold text-slate-900">{service.serviceName}</div>
                    <div className="mt-1 text-xs text-slate-500">{service.category}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-slate-600">Balance</span>
                      <span className="font-semibold text-slate-900">{formatMoney(service.amount - service.paid)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </div>
  );
}

function InfoCard({ label, value, highlight = false }) {
  return (
    <div className={`rounded-2xl p-4 ${highlight ? 'bg-sky-50 text-sky-800' : 'bg-slate-50 text-slate-700'}`}>
      <div className="text-sm font-medium">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
