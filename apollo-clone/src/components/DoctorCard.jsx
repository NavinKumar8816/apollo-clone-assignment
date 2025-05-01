export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col md:flex-row items-start gap-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 ease-in-out">
      {/* Doctor Image with fallback */}
      <img
  src={doctor.imageUrl || "/doctor-placeholder.jpg"}
  onError={(e) => { e.target.src = "/doctor-placeholder.jpg"; }}
  alt={doctor.name}
  className="w-24 h-24 rounded-full object-cover border"
/>


      {/* Doctor Info */}
      <div className="flex-1 w-full">
        <h3 className="text-base md:text-lg font-semibold text-gray-800">
          {doctor.name}
        </h3>
        <p className="text-sm text-gray-500">{doctor.specialty || 'General Practitioner'}</p>
        <p className="text-sm text-gray-600">
          {doctor.experience} YEARS · {doctor.qualification}
        </p>
        <p className="text-sm text-gray-500">{doctor.city}</p>
        <p className="text-xs text-gray-400 mt-1">Apollo247 Virtual Clinic</p>

        <div className="mt-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-blue-600">₹{doctor.fee}</p>
            <p className="text-xs text-orange-500 font-medium">🪙 ₹60 Cashback</p>
          </div>
          <button className="border border-blue-500 text-blue-600 font-medium px-4 py-1.5 rounded text-sm hover:bg-blue-50 transition">
            Consult Online
            <p className="text-xs text-gray-500">Available in 15 mins</p>
          </button>
        </div>
      </div>
    </div>
  );
}
