// import React, { useEffect, useState } from "react";
// import { ShoppingBag, Sun, User, Users, DoorOpen, Snowflake, Check, Info, ChevronRight, ShoppingBasket } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAppContext } from "../../context/ApplicationContext";
// import Cookies from 'js-cookie';
// import { toast } from "react-toastify";
// import dayjs from 'dayjs';

// function MyReservations() {

//   const { vehicles, reservations } = useAppContext();
//   const [selectedReservation, setSelectedReservation] = useState(null);

//   const [isModalOpen, setIsModalOpen] = useState(null)

//   const userId = Cookies.get('userId');

//   // Use `find` to get the first matching reservation
//   const currReservation = reservations.find((res) => res.id === selectedReservation) || null;


//   return (
//     <div>
//       <div className="overflow-auto">
//         <table className='w-full border'>
//           <thead className='w-full'>
//             <tr className='w-full bg-[#F7F7F7]'>
//               <th className='text-sm text-left p-3 border-r'>ID</th>
//               <th className='text-sm text-left p-3 border-r min-w-[140px]'>Vozilo</th>
//               <th className='text-sm text-left p-3 border-r min-w-[140px]'>Trajanje</th>
//               <th className='text-sm text-left p-3 border-r min-w-[140px]'>Datum preuzimanja</th>
//               <th className='text-sm text-left p-3 border-r min-w-[140px]'>Datum vraćanja</th>
//               <th className='text-sm text-left p-3 border-r min-w-[140px]'>Iznos</th>
//               <th className='text-sm text-left p-3 border-r min-w-[140px]'>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {
//               reservations.filter((res) => Number(res.user_id) === Number(userId)).map((res) => {
//                 return (
//                   <tr onClick={() => setSelectedReservation(res.id)} className='w-full border-b hover:bg-[#F7F7F7] cursor-pointer'>
//                     <td className='text-sm text-left p-3 border-r font-bold'>{res.id}</td>
//                     <td className='text-sm text-left p-3 border-r'>{vehicles.filter((vehicle) => vehicle.id === res.vehicle_id).map((vehicle) => vehicle.vehicle_name)}</td>
//                     <td className='text-sm text-left p-3 border-r'>{res.duration} dana</td>
//                     <td className='text-sm text-left p-3 border-r'>{dayjs(res.start_time).format("DD.MM.YYYY - HH:mm")}</td>
//                     <td className='text-sm text-left p-3 border-r'>{dayjs(res.end_time).format("DD.MM.YYYY - HH:mm")}</td>
//                     <td className='text-sm text-left p-3 border-r'><strong>{res.price}</strong> din</td>
//                     <td className='text-sm text-left p-3 border-r uppercase'><span className={`w-full py-1 px-3 rounded-full text-xs ${res.status === 'success' ? 'bg-green-400' : res.status === 'failed' ? 'bg-red-500 text-white' : 'bg-yellow-300'}`}>{res.status}</span></td>
//                   </tr>
//                 )
//               })
//             }
//           </tbody>
//         </table>
//       </div>
//       {
//         currReservation && (
//           <div className="">
//             <div className="selected-reservation-details bg-[#F7F7F7] py-8 rounded-lg mt-4 overflow-hidden">
//               <h1 className="px-8 text-4xl font-bold mb-6">Your reservation:</h1>
//               {
//                 vehicles.filter((vehicle) => vehicle.id === currReservation.vehicle_id).map((vehicle) => {
//                   return (
//                     <div key={vehicle.id} className={`car-card border-b mx-8 border-b-[#f7f7f7] ${currReservation.vehicle_id !== null && (currReservation.vehicle_id !== vehicle.id ? 'opacity-50' : null)}`}>
//                       <div className="car-main-details flex flex-col md:flex-row gap-4">
//                         <img src={vehicle.banner_image} className="w-full md:w-[320px]" alt="" />
//                         <div className="car-infos flex-1 text-black flex flex-col md:flex-row items-center justify-between">
//                           <div className="w-full md:w-auto">
//                             <h1 className="text-3xl font-semibold">{vehicle.vehicle_name}</h1>
//                             <div className="flex gap-4 mt-4">
//                               <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><Users size={14} /> 5</span>
//                               <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto">{vehicle.range_km} km</span>
//                               <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><Snowflake size={14} /> A/C</span>
//                             </div>
//                             <div className="flex flex-col gap-2 mt-4">
//                               <span className="flex items-center gap-2 text-sm"><Check size={16} color={`#68e048`} /> Unlimited mileage</span>
//                               <span className="flex items-center gap-2 text-sm"><Info size={16} color={`rgba(0,0,0,0.5)`} /> 21 years required</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 })
//               }
//               <div className="duration grid px-8 grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
//                 <h3 className="py-4 text-center border-b font-medium text-sm bg-white">{currReservation.start_time}</h3>
//                 <span className="py-0 md:py-4 text-center text-sm block mx-auto rotate-90 sm:rotate-0"><ChevronRight /></span>
//                 <h3 className="py-4 text-center border-b font-medium text-sm bg-white">{currReservation.end_time}</h3>
//               </div>
//               <div className="p-4 bg-white mx-8 mt-8 flex flex-col items-end rounded">
//                 <h1 className="mb-4 w-full text-right border-b pb-4">Price without discount: <strong>{currReservation.duration * vehicles.filter((vehicle) => vehicle.id === currReservation.vehicle_id).map((vehicle) => vehicle.price_per_day).toLocaleString(void 0, { maximumFractionDigits: 2 })} din</strong></h1>
//                 <h1 className="mb-4 w-full text-right border-b pb-4">Discount: <strong>0 din</strong></h1>
//                 <h1 className="w-full text-right">Total price: <strong>{currReservation.duration * vehicles.filter((vehicle) => vehicle.id === currReservation.vehicle_id).map((vehicle) => vehicle.price_per_day).toLocaleString(void 0, { maximumFractionDigits: 2 })} din</strong></h1>
//                 {
//                   currReservation.status !== 'success' && currReservation.status !== 'failed' && !currReservation.reservation_image && (
//                     <Link to="/reservation-confirm" className="mt-4 w-full md:w-auto bg-[#59c23d] hover:bg-[#68e048] py-3 px-6 text-white rounded flex items-center gap-2">Confirm now</Link>
//                   )
//                 }
//                 {
//                   currReservation.reservation_image && (
//                     <img src={`https://tesla.movelink.org${currReservation.reservation_image}`} className="mt-4" alt="" />
//                   )
//                 }
//               </div>
//             </div>
//           </div>
//         )
//       }
//     </div>
//   )
// }

// export default MyReservations

import React, { useState } from "react";
import { Users, Snowflake, Check, Info, ChevronRight, Calendar, Battery, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/ApplicationContext";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

function MyReservations() {
  const { vehicles, reservations } = useAppContext();
  const { t } = useTranslation();
  const [selectedReservation, setSelectedReservation] = useState(null);
  const userId = Cookies.get('userId');
  const userReservations = reservations.filter((res) => Number(res.user_id) === Number(userId));
  const currReservation = reservations.find((res) => res.id === selectedReservation) || null;

  const getStatusStyle = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getVehicle = (id) => vehicles.find(v => v.id === id);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">{t('myReservations.title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('myReservations.subtitle')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-500">{t('myReservations.totalBookings')}</p>
          <p className="text-3xl font-semibold text-gray-900 mt-1">{userReservations.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-500">{t('myReservations.activeBookings')}</p>
          <p className="text-3xl font-semibold text-green-600 mt-1">{userReservations.filter(r => r.status === 'success').length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-500">{t('myReservations.pendingBookings')}</p>
          <p className="text-3xl font-semibold text-yellow-600 mt-1">{userReservations.filter(r => r.status === 'pending').length}</p>
        </div>
      </div>

      {userReservations.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('myReservations.noReservations')}</h3>
          <p className="text-sm text-gray-500 mb-6">{t('myReservations.noReservationsDesc')}</p>
          <Link to="/vehicles" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-lg transition-colors">
            {t('myReservations.browseVehicles')} <ExternalLink size={16} />
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">ID</th>
                  <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('myReservations.vehicle')}</th>
                  <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('myReservations.duration')}</th>
                  <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('myReservations.pickup')}</th>
                  <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('myReservations.return')}</th>
                  <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('myReservations.amount')}</th>
                  <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('myReservations.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {userReservations.map((res) => (
                  <tr key={res.id} onClick={() => setSelectedReservation(res.id)} className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <td className="p-4 text-sm font-medium text-gray-900">#{res.id}</td>
                    <td className="p-4 text-sm text-gray-600">{getVehicle(res.vehicle_id)?.vehicle_name || '-'}</td>
                    <td className="p-4 text-sm text-gray-600">{res.duration} {t('myReservations.days')}</td>
                    <td className="p-4 text-sm text-gray-600">{dayjs(res.start_time).format("DD.MM.YYYY HH:mm")}</td>
                    <td className="p-4 text-sm text-gray-600">{dayjs(res.end_time).format("DD.MM.YYYY HH:mm")}</td>
                    <td className="p-4 text-sm font-medium text-gray-900">{res.price?.toLocaleString()} din</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase ${getStatusStyle(res.status)}`}>{res.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Panel */}
      {currReservation && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{t('myReservations.reservationDetails')}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getStatusStyle(currReservation.status)}`}>{currReservation.status}</span>
            </div>
          </div>

          {vehicles.filter(v => v.id === currReservation.vehicle_id).map(vehicle => (
            <div key={vehicle.id} className="p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row gap-6">
                <img src={vehicle.banner_image} alt={vehicle.vehicle_name} className="w-full md:w-64 h-40 object-contain bg-gray-50 rounded-xl" />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{vehicle.vehicle_name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 flex items-center gap-1.5"><Users size={12} /> 5 {t('myReservations.seats')}</span>
                    <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 flex items-center gap-1.5"><Battery size={12} /> {vehicle.range_km} km</span>
                    <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 flex items-center gap-1.5"><Snowflake size={12} /> A/C</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600"><Check size={16} className="text-green-500" /> {t('myReservations.unlimitedMileage')}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500"><Info size={16} /> {t('myReservations.minAge')}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Date Range */}
          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">{t('myReservations.pickup')}</p>
                <p className="text-sm font-medium text-gray-900">{dayjs(currReservation.start_time).format("DD.MM.YYYY")}</p>
                <p className="text-xs text-gray-500">{dayjs(currReservation.start_time).format("HH:mm")}</p>
              </div>
              <div className="flex justify-center"><ChevronRight size={24} className="text-gray-300" /></div>
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">{t('myReservations.return')}</p>
                <p className="text-sm font-medium text-gray-900">{dayjs(currReservation.end_time).format("DD.MM.YYYY")}</p>
                <p className="text-xs text-gray-500">{dayjs(currReservation.end_time).format("HH:mm")}</p>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="p-6 space-y-3">
            {vehicles.filter(v => v.id === currReservation.vehicle_id).map(vehicle => (
              <React.Fragment key={vehicle.id}>
                <div className="flex justify-between text-sm"><span className="text-gray-500">{t('myReservations.priceWithoutDiscount')}</span><span className="text-gray-900">{(currReservation.duration * vehicle.price_per_day).toLocaleString()} din</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">{t('myReservations.discount')}</span><span className="text-gray-900">0 din</span></div>
                <div className="border-t border-gray-200 pt-3 flex justify-between"><span className="font-medium text-gray-900">{t('myReservations.totalPrice')}</span><span className="text-xl font-semibold text-gray-900">{(currReservation.duration * vehicle.price_per_day).toLocaleString()} din</span></div>
              </React.Fragment>
            ))}

            {currReservation.reservation_image && (
              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-2">{t('myReservations.paymentSlip')}</p>
                <img src={`https://tesla.movelink.org${currReservation.reservation_image}`} alt="Payment" className="rounded-xl border border-gray-200 max-h-48 object-contain" />
              </div>
            )}

            {currReservation.status !== 'success' && currReservation.status !== 'failed' && !currReservation.reservation_image && (
              <Link to="/reservation-confirm" className="mt-4 w-full py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors">
                {t('myReservations.confirmNow')} <ChevronRight size={18} />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyReservations;