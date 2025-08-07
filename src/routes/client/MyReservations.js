import React, { useEffect, useState } from "react";
import { ShoppingBag, Sun, User, Users, DoorOpen, Snowflake, Check, Info, ChevronRight, ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/ApplicationContext";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import dayjs from 'dayjs';

function MyReservations() {

  const { vehicles, reservations } = useAppContext();
  const [selectedReservation, setSelectedReservation] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(null)

  const userId = Cookies.get('userId');

  // Use `find` to get the first matching reservation
  const currReservation = reservations.find((res) => res.id === selectedReservation) || null;


  return (
    <div>
      <div className="overflow-auto">
        <table className='w-full border'>
          <thead className='w-full'>
            <tr className='w-full bg-[#F7F7F7]'>
              <th className='text-sm text-left p-3 border-r'>ID</th>
              <th className='text-sm text-left p-3 border-r min-w-[140px]'>Vozilo</th>
              <th className='text-sm text-left p-3 border-r min-w-[140px]'>Trajanje</th>
              <th className='text-sm text-left p-3 border-r min-w-[140px]'>Datum preuzimanja</th>
              <th className='text-sm text-left p-3 border-r min-w-[140px]'>Datum vraćanja</th>
              <th className='text-sm text-left p-3 border-r min-w-[140px]'>Iznos</th>
              <th className='text-sm text-left p-3 border-r min-w-[140px]'>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              reservations.filter((res) => Number(res.user_id) === Number(userId)).map((res) => {
                return (
                  <tr onClick={() => setSelectedReservation(res.id)} className='w-full border-b hover:bg-[#F7F7F7] cursor-pointer'>
                    <td className='text-sm text-left p-3 border-r font-bold'>{res.id}</td>
                    <td className='text-sm text-left p-3 border-r'>{vehicles.filter((vehicle) => vehicle.id === res.vehicle_id).map((vehicle) => vehicle.vehicle_name)}</td>
                    <td className='text-sm text-left p-3 border-r'>{res.duration} dana</td>
                    <td className='text-sm text-left p-3 border-r'>{dayjs(res.start_time).format("DD.MM.YYYY - HH:mm")}</td>
                    <td className='text-sm text-left p-3 border-r'>{dayjs(res.end_time).format("DD.MM.YYYY - HH:mm")}</td>
                    <td className='text-sm text-left p-3 border-r'><strong>{res.price}</strong> din</td>
                    <td className='text-sm text-left p-3 border-r uppercase'><span className={`w-full py-1 px-3 rounded-full text-xs ${res.status === 'success' ? 'bg-green-400' : res.status === 'failed' ? 'bg-red-500 text-white' : 'bg-yellow-300'}`}>{res.status}</span></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      {
        currReservation && (
          <div className="">
            <div className="selected-reservation-details bg-[#F7F7F7] py-8 rounded-lg mt-4 overflow-hidden">
              <h1 className="px-8 text-4xl font-bold mb-6">Your reservation:</h1>
              {
                vehicles.filter((vehicle) => vehicle.id === currReservation.vehicle_id).map((vehicle) => {
                  return (
                    <div key={vehicle.id} className={`car-card border-b mx-8 border-b-[#f7f7f7] ${currReservation.vehicle_id !== null && (currReservation.vehicle_id !== vehicle.id ? 'opacity-50' : null)}`}>
                      <div className="car-main-details flex flex-col md:flex-row gap-4">
                        <img src={vehicle.banner_image} className="w-full md:w-[320px]" alt="" />
                        <div className="car-infos flex-1 text-black flex flex-col md:flex-row items-center justify-between">
                          <div className="w-full md:w-auto">
                            <h1 className="text-3xl font-semibold">{vehicle.vehicle_name}</h1>
                            <div className="flex gap-4 mt-4">
                              <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><Users size={14} /> 5</span>
                              <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto">{vehicle.range_km} km</span>
                              <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><Snowflake size={14} /> A/C</span>
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                              <span className="flex items-center gap-2 text-sm"><Check size={16} color={`#68e048`} /> Unlimited mileage</span>
                              <span className="flex items-center gap-2 text-sm"><Info size={16} color={`rgba(0,0,0,0.5)`} /> 21 years required</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <div className="duration grid px-8 grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
                <h3 className="py-4 text-center border-b font-medium text-sm bg-white">{currReservation.start_time}</h3>
                <span className="py-0 md:py-4 text-center text-sm block mx-auto rotate-90 sm:rotate-0"><ChevronRight /></span>
                <h3 className="py-4 text-center border-b font-medium text-sm bg-white">{currReservation.end_time}</h3>
              </div>
              <div className="p-4 bg-white mx-8 mt-8 flex flex-col items-end rounded">
                <h1 className="mb-4 w-full text-right border-b pb-4">Price without discount: <strong>{currReservation.duration * vehicles.filter((vehicle) => vehicle.id === currReservation.vehicle_id).map((vehicle) => vehicle.price_per_day).toLocaleString(void 0, { maximumFractionDigits: 2 })} din</strong></h1>
                <h1 className="mb-4 w-full text-right border-b pb-4">Discount: <strong>0 din</strong></h1>
                <h1 className="w-full text-right">Total price: <strong>{currReservation.duration * vehicles.filter((vehicle) => vehicle.id === currReservation.vehicle_id).map((vehicle) => vehicle.price_per_day).toLocaleString(void 0, { maximumFractionDigits: 2 })} din</strong></h1>
                {
                  currReservation.status !== 'success' && currReservation.status !== 'failed' && !currReservation.reservation_image && (
                    <Link to="/reservation-confirm" className="mt-4 w-full md:w-auto bg-[#59c23d] hover:bg-[#68e048] py-3 px-6 text-white rounded flex items-center gap-2">Confirm now</Link>
                  )
                }
                {
                  currReservation.reservation_image && (
                    <img src={`https://api.davidtesla.online${currReservation.reservation_image}`} className="mt-4" alt="" />
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default MyReservations