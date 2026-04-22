import { useMemo, useState } from 'react';

export default function LabTestSelector({ setOpen, entity, setModal }) {
  const availableTests = [
    { id: 1, name: 'Complete Blood Count', category: 'Hematology' },
    { id: 2, name: 'Hemoglobin', category: 'Hematology' },
    { id: 3, name: 'Blood Glucose (FBS)', category: 'Biochemistry' },
    { id: 4, name: 'Creatinine', category: 'Biochemistry' },
    { id: 5, name: 'Urea', category: 'Biochemistry' },
    { id: 6, name: 'Electrolytes (Na⁺)', category: 'Biochemistry' },
    { id: 7, name: 'Electrolytes (K⁺)', category: 'Biochemistry' },
    { id: 8, name: 'Liver Function Test', category: 'Biochemistry' },
    { id: 9, name: 'ALT (SGPT)', category: 'Biochemistry' },
    { id: 10, name: 'AST (SGOT)', category: 'Biochemistry' },
    { id: 11, name: 'Lipid Profile', category: 'Biochemistry' },
    { id: 12, name: 'Cholesterol (Total)', category: 'Biochemistry' },
    { id: 13, name: 'Malaria Test', category: 'Microbiology' },
    { id: 14, name: 'HIV Test', category: 'Microbiology' },
    { id: 15, name: 'Urinalysis', category: 'Urine' },
    { id: 16, name: 'Stool Examination', category: 'Stool' },
    { id: 17, name: 'Pregnancy Test (hCG)', category: 'Hormonal' },
    { id: 18, name: 'Troponin', category: 'Cardiac' },
    { id: 19, name: 'TSH', category: 'Hormonal' },
  ];

  const [search, setSearch] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);

      const [object, setObject] = useState(entity)


  const filteredTests = useMemo(() => {
    return availableTests.filter((test) => {
      const keyword = search.toLowerCase().trim();
      const alreadySelected = selectedTests.some((item) => item.id === test.id);
      return (
        !alreadySelected &&
        (test.name.toLowerCase().includes(keyword) ||
          test.category.toLowerCase().includes(keyword))
      );
    });
  }, [search, selectedTests]);

  const addTest = (test) => {
    setSelectedTests((prev) => [
      ...prev,
      {
        ...test,
        priority: 'Normal',
        notes: '',
      },
    ]);
    setSearch('');
  };

  const removeTest = (id) => {
    setSelectedTests((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSelectedTest = (id, field, value) => {
    setSelectedTests((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  
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

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-4">
      <div className="mx-auto max-w-6xl space-y-6">
        

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <label htmlFor="testSearch" className="mb-2 block text-sm font-medium text-slate-700">
                Search by test name or category
              </label>
              <input
                id="testSearch"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search malaria, glucose, hematology..."
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="rounded-2xl bg-slate-50 p-2 text-sm text-slate-700">
              <div className="font-medium text-slate-800">Selected Tests</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{selectedTests.length}</div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="max-h-72 overflow-auto space-y-2">
              {filteredTests.length > 0 ? (
                filteredTests.map((test) => (
                  <button
                    key={test.id}
                    type="button"
                    onClick={() => addTest(test)}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4  text-left hover:border-sky-200 hover:bg-sky-50"
                  >
                    <div>
                      <div className="font-medium text-slate-900">{test.name}</div>
                      <div className="mt-1 text-sm text-slate-500">{test.category}</div>
                    </div>
                    <span className="rounded-xl bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                      Add
                    </span>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500">
                  No matching tests found.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Selected Test List</h2>
              <p className="mt-1 text-sm text-slate-500">Review, prioritize, and annotate multiple requested tests.</p>
            </div>
              <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium
             text-white hover:bg-sky-700"
             onClick={handleClose}
             >
              Cancel Tests
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium
             text-white hover:bg-sky-700"
             onClick={handleClose}
             >
              Save Test Request
            </button>
          
          </div>

          <div className="mt-6 space-y-4">
            {selectedTests.length > 0 ? (
              selectedTests.map((test, index) => (
                <div key={test.id} className="rounded-3xl border border-slate-200 p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Test #{index + 1}</div>
                      <div className="mt-1 text-lg font-semibold text-slate-900">{test.name}</div>
                      <div className="mt-1 text-sm text-slate-500">Category: {test.category}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeTest(test.id)}
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Priority
                      </label>
                      <select
                        value={test.priority}
                        onChange={(event) =>
                          updateSelectedTest(test.id, 'priority', event.target.value)
                        }
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option>Normal</option>
                        <option>Urgent</option>
                        <option>High Priority</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Clinical Note
                      </label>
                      <input
                        type="text"
                        value={test.notes}
                        onChange={(event) =>
                          updateSelectedTest(test.id, 'notes', event.target.value)
                        }
                        placeholder="Reason or instruction for this test"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                <div className="text-lg font-semibold text-slate-800">No tests selected yet</div>
                <p className="mt-2 text-sm text-slate-500">
                  Use the searchable list above to add one or more tests to the request.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
