import { useEffect, useState } from 'react';

export default function Filters({ onFilter }) {
  const [fee, setFee] = useState('');
  const [selectedExperience, setSelectedExperience] = useState([]);

  useEffect(() => {
    const filterParams = {};

    if (fee) {
      const [minFee, maxFee] = fee.split('-').map(Number);
      filterParams.minFee = minFee;
      filterParams.maxFee = maxFee;
    }

    if (selectedExperience.length > 0) {
      const allMins = selectedExperience.map((r) => Number(r.split('-')[0]));
      const allMaxs = selectedExperience.map((r) => Number(r.split('-')[1]));
      filterParams.minExp = Math.min(...allMins);
      filterParams.maxExp = Math.max(...allMaxs);
    }

    onFilter(filterParams);
  }, [fee, selectedExperience]);

  const toggleExperience = (range) => {
    let updated = [...selectedExperience];
    if (updated.includes(range)) {
      updated = updated.filter((r) => r !== range);
    } else {
      updated.push(range);
    }
    setSelectedExperience(updated);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-800">Filters</h2>

      {/* Fee Filter */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Fees (in ₹)</label>
        <select
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          className="w-full border border-gray-300 px-3 py-1.5 rounded text-sm"
        >
          <option value="">All</option>
          <option value="100-500">₹100 - ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-5000">₹1000+</option>
        </select>
      </div>

      {/* Experience Filter */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Experience (In Years)</label>
        <div className="space-y-1 text-sm text-gray-600">
          {['0-5', '6-10', '11-16'].map((range) => (
            <label key={range} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedExperience.includes(range)}
                onChange={() => toggleExperience(range)}
              />
              {range}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
