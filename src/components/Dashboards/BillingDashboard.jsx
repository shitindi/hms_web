import { useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { Box, Modal, Typography } from "@mui/material"
import { BounceLoader } from "react-spinners"
import ModalContainer from "../ModalContainer";
import IndividualServicePaymentForm from "../Administration/IndividualServicePaymentForm";

export default function BillingDashboard() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        p: 4,
    };

    let [entities, setEntities] = useState([])
    const [entity, setEntity] = useState({})
    const [modalOpen, setModalOpen] = useState(false)

  const [modal, setModal] = useState(
    {
      Component: null,
      modelOpen: false
    }
  )
    const axios = useAxiosPrivate()

    useEffect(() => {
        const fetchAppoitments = async () => {
            try {

                setModalOpen(true)
                const entityResult = await axios.get('/billing/waiting-payments')

                if (entityResult.status === 200) {
                    setEntities(entityResult.data)

                }
            } catch (err) {
                console.error('BILLING_useEffect: ', err)
            }
            setModalOpen(false)
        }

        fetchAppoitments()
    }, [])


    const getBillingItem = entity => {
        const id = entity.id
        const patient = entity?.Patient?.Contact.first_name + ' ' + entity?.Patient?.Contact.last_name
        const registration_no = entity?.Patient?.registration_no
        let service = paymentStatusIsValid(entity?.PaymentStatus.id ?? 0) ? 'Consultation' : ''
        service += (service.length > 3 ? ' + ' : '') + ((entity?.Prescription && entity?.Prescription.length) ? 'Prescription' : '')
        service += (service.length > 3 ? ' + ' : '') + ((entity?.LabReqests && entity?.LabReqests.length) ? 'Lab Service' : '')
        let consultation = 0
        let prescription = 0
        let labtest = 0
        consultation = paymentStatusIsValid(entity?.PaymentStatus.id ?? 0) ? (entity.appointment_fee ?? 0) : 0
        if (entity?.Prescription && entity?.Prescription.length > 0) {
            entity.Prescription.forEach(p => {
                prescription += Number(p.Medicine.price) * Number(p.quantity)
            })
        }

        if (entity?.LabReqests && entity?.LabReqests.length > 0) {
            entity.LabReqests.forEach(p => {
                labtest += Number(p.TestCatalog.cost)
            })
        }
        const amount = Number(consultation) + Number(prescription) + Number(labtest)

        return {id, registration_no, patient, service, amount, status: amount >  0 ?  'Pending' : 'Paid' }
    }

      const handlePayIndividualBill = (id) => {

        const appointment = entities.find(ent => ent.id === id)

        if (appointment) {
          setEntity(appointment)
          setModal({
            Component: IndividualServicePaymentForm,
            modelOpen: true
          })
        }
      }

    const paymentStatusIsValid = status => {
        if (status == 1 || status == 3 || status == 5)
            return true
        else
            return false
    }

    const stats = [
        { label: "Today's Revenue", value: '0 TZS', note: 'Cash + insurance + mobile money' },
        { label: 'Pending Invoices', value: '0', note: 'Awaiting payment' },
        { label: 'Paid Invoices', value: '0', note: 'Completed today' },
        { label: 'Insurance Claims', value: '0', note: 'Need verification' },
    ];


    let invoices = []
    if (entities.length > 0) {
        invoices = entities.map(ent => {
            const item = getBillingItem(ent)
            return {
                id: item.id,
                patient: item.patient,
                patientId: item.registration_no,
                category: item.service,
                amount: item.amount.toLocaleString(),
                status: item.status,
            }
        })
    }




    const quickActions = [
        'Create Invoice',
        'Record Payment',
        'Search Invoice',
        'Print Receipt',
        'Apply Discount',
        'Verify Insurance',
    ];

    const recentPayments = [
        'Receipt RCPT-10482 generated for Amina Hassan',
        'Mobile money payment received for Grace Daniel',
        'Insurance claim submitted for Salim Omari',
        'Partial payment recorded for invoice INV-2026-10482',
    ];

    const getStatusClasses = (status) => {
        console.error('GET_STATUS: ', status)
        if (status === 'Paid') {
            return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
        }
        if (status === 'Partial Payment' || status === 'Insurance Review') {
            return 'bg-sky-50 text-sky-700 border border-sky-200';
        }
        return 'bg-amber-50 text-amber-700 border border-amber-200';
    };

    return (
        <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
              {modal.Component && <ModalContainer
        Component={modal.Component}
        entity={entity}
        modalOpen={modal.modelOpen}
        setModal={setModal}
      />}
            <div className="mx-auto max-w-7xl">
                <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="mt-2 text-slate-600">
                            Manage invoices, receive payments, issue receipts, verify insurance, and track daily collections.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            placeholder="Search invoice, patient, receipt..."
                            className="w-full sm:w-80 rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
                            + New Invoice
                        </button>
                    </div>
                </header>

                <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item) => (
                        <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="text-sm text-slate-500">{item.label}</div>
                            <div className="mt-3 text-2xl font-bold text-slate-900">{item.value}</div>
                            <div className="mt-2 text-sm text-slate-600">{item.note}</div>
                        </div>
                    ))}
                </section>

                <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-1">
                    <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 p-6">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Payments Queue</h2>
                                <p className="mt-1 text-sm text-slate-500">Track unpaid, partial, paid, and insurance bills.</p>
                            </div>
                            <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                                View All Invoices
                            </button>
                        </div>
                        <Modal
                            open={modalOpen}
                        >
                            <Box sx={style}>
                                <BounceLoader color="#0096FF" />
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Loading...
                                </Typography>
                            </Box>
                        </Modal>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-slate-50 text-slate-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Patient</th>
                                        <th className="px-6 py-4 text-left font-semibold">Service</th>
                                        <th className="px-6 py-4 text-left font-semibold">Amount</th>
                                        <th className="px-6 py-4 text-left font-semibold">Status</th>
                                        <th className="px-6 py-4 text-left font-semibold">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((item) => (
                                        <tr key={item.invoiceNo} className="border-t border-slate-100 hover:bg-slate-50">

                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900">{item.patient}</div>
                                                <div className="mt-1 text-xs text-slate-500">{item.patientId}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-700">{item.category}</td>
                                            <td className="px-6 py-4 text-slate-700">{item.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <button className="rounded-xl bg-sky-50 px-3 py-2 text-xs font-medium
                                                     text-sky-700 hover:bg-sky-100"  type="text" disabled={item.amount <= 0}
                                                      onClick={()=>handlePayIndividualBill(item.id)}>
                                                        Pay bill
                                                    </button>
                                               
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                {quickActions.map((action) => (
                                    <button
                                        key={action}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-medium text-slate-700 hover:border-sky-200 hover:bg-sky-50"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        </section>

         
                    </div>
                </section>

                <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Cashier Work Area</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Open an invoice to receive payment, apply discount, verify insurance, or print receipt.
                                </p>
                            </div>
                            <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                                Open Selected Invoice
                            </button>
                        </div>

                        <div className="mt-6 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                            <div className="text-lg font-semibold text-slate-800">Selected invoice workflow appears here</div>
                            <p className="mt-2 text-sm text-slate-500">
                                Example: payment entry, receipt preview, insurance approval, discount approval, or invoice item review.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-900">Recent Payments</h2>
                        <div className="mt-5 space-y-3">
                            {recentPayments.map((activity) => (
                                <div key={activity} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                                    {activity}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
