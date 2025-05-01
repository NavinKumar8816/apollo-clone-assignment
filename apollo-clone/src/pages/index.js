import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import Filters from '../components/Filters';
import Header from '../components/Header';

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});

  const fetchDoctors = async (filters = {}, pageNumber = 1, reset = false) => {
    console.log('Filters applied:', JSON.stringify(filters, null, 2));

    let url = `http://localhost:5000/list-doctor-with-filter?page=${pageNumber}&limit=3`;

    if (filters.minFee !== undefined && filters.maxFee !== undefined) {
      url += `&minFee=${filters.minFee}&maxFee=${filters.maxFee}`;
    }

    if (filters.minExp !== undefined && filters.maxExp !== undefined) {
      url += `&minExp=${filters.minExp}&maxExp=${filters.maxExp}`;
    }

    try {
      const res = await axios.get(url);
      const { doctors: fetchedDoctors, totalPages } = res.data;

      if (reset) {
        setDoctors(fetchedDoctors);
      } else {
        setDoctors((prev) => [...prev, ...fetchedDoctors]);
      }

      setTotalPages(totalPages);
      setPage(pageNumber);
    } catch (err) {
      console.error('❌ Error fetching doctors:', err.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    fetchDoctors(filters, 1, true); // Reset on filter change
  };

  const handleLoadMore = () => {
    fetchDoctors(activeFilters, page + 1);
  };

  return (
    <>
      <Head>
        <title>Consult General Physicians Online - Apollo Clone</title>
        <meta
          name="description"
          content="Consult general physicians online from the Apollo247 clone app. Use filters to find doctors by fee, location and specialty."
        />
        <link
          rel="canonical"
          href="https://www.apollo247.com/specialties/general-physician-internal-medicine"
        />
      </Head>

      <Header />

      <main className="bg-[#f7f8fa] min-h-screen py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-1/4 bg-white p-5 rounded shadow">
            <Filters onFilter={handleFilterChange} />
          </aside>

          {/* Doctor Listing */}
          <section className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">
                Consult General Physicians Online - Internal Medicine Specialists
              </h1>
              <select className="border p-2 rounded text-sm">
                <option>Relevance</option>
              </select>
            </div>

            <div className="space-y-4">
              {doctors.length > 0 ? (
                doctors.map((doc, index) => (
                  <DoctorCard key={`${doc._id}-${index}`} doctor={doc} />
                ))
              ) : (
                <p className="text-gray-600">No doctors found.</p>
              )}

              {page < totalPages && (
                <div className="text-center mt-6">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 text-sm font-semibold border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
