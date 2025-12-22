import React, { useState } from "react";
import { Users, Snowflake, Check, Info, ChevronRight, X, Calendar, Clock, CreditCard, Eye, CheckCircle, Battery } from "lucide-react";
import { useAppContext } from "../../context/ApplicationContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs';

function AllReservations() {
  const { reservations, vehicles, users } = useAppContext();
  const { t } = useTranslation();
  const [selectedReservation, setSelectedReservation] = useState(null);
  const currReservation = reservations.find((res) => res.id === selectedReservation) || null;

  const confirmReservation = async () => {
    try {
      const response = await fetch(`https://tesla.movelink.org/reservations/confirm-reservation/${selectedReservation}`, { method: 'PUT' });
      if (!response.ok) throw new Error('Failed');
      toast.success(t('admin.reservationConfirmed'), { position: "top-right", autoClose: 5000 });
    } catch (error) {
      toast.error(t('admin.reservationConfirmFailed'), { position: "top-right", autoClose: 5000 });
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getVehicle = (id) => vehicles.find(v => v.id === id);
  const getUser = (id) => users.find(u => u.id === id);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">{t('admin.allReservations')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('admin.allReservationsSubtitle')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: t('admin.total'), value: reservations.length, color: 'bg-gray-900' },
          { label: t('admin.pending'), value: reservations.filter(r => r.status === 'pending').length, color: 'bg-yellow-500' },
          { label: t('admin.confirmed'), value: reservations.filter(r => r.status === 'success').length, color: 'bg-green-500' },
          { label: t('admin.cancelled'), value: reservations.filter(r => r.status === 'failed').length, color: 'bg-red-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
            <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">ID</th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('admin.user')}</th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('admin.vehicle')}</th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('admin.duration')}</th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('admin.pickup')}</th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('admin.return')}</th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('admin.amount')}</th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4">{t('admin.status')}</th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-left p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reservations.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-gray-900">#{res.id}</td>
                  <td className="p-4 text-sm text-gray-600">{getUser(res.user_id)?.full_name || '-'}</td>
                  <td className="p-4 text-sm text-gray-600">{getVehicle(res.vehicle_id)?.vehicle_name || '-'}</td>
                  <td className="p-4 text-sm text-gray-600">{res.duration} {t('admin.days')}</td>
                  <td className="p-4 text-sm text-gray-600">{dayjs(res.start_time).format("DD.MM.YYYY HH:mm")}</td>
                  <td className="p-4 text-sm text-gray-600">{dayjs(res.end_time).format("DD.MM.YYYY HH:mm")}</td>
                  <td className="p-4 text-sm font-medium text-gray-900">{res.price?.toLocaleString()} din</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(res.status)}`}>
                        {res.status}
                      </span>
                      {res.reservation_image && res.status !== 'success' && (
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">{t('admin.awaitingConfirm')}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <button onClick={() => setSelectedReservation(res.id)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye size={18} className="text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {currReservation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{t('admin.reservationDetails')}</h2>
                <p className="text-sm text-gray-500">ID: #{currReservation.id}</p>
              </div>
              <button onClick={() => setSelectedReservation(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Vehicle Info */}
              {vehicles.filter(v => v.id === currReservation.vehicle_id).map(vehicle => (
                <div key={vehicle.id} className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-xl">
                  <img src={vehicle.banner_image} alt={vehicle.vehicle_name} className="w-full md:w-48 h-32 object-contain bg-white rounded-lg" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{vehicle.vehicle_name}</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-600 flex items-center gap-1.5">
                        <Users size={12} /> 5 seats
                      </span>
                      <span className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-600 flex items-center gap-1.5">
                        <Battery size={12} /> {vehicle.range_km} km
                      </span>
                      <span className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-600 flex items-center gap-1.5">
                        <Snowflake size={12} /> A/C
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Date Range */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Calendar size={18} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500 mb-1">{t('admin.pickup')}</p>
                  <p className="text-sm font-medium text-gray-900">{dayjs(currReservation.start_time).format("DD.MM.YYYY")}</p>
                  <p className="text-xs text-gray-500">{dayjs(currReservation.start_time).format("HH:mm")}</p>
                </div>
                <div className="flex justify-center">
                  <ChevronRight size={24} className="text-gray-300" />
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Calendar size={18} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500 mb-1">{t('admin.return')}</p>
                  <p className="text-sm font-medium text-gray-900">{dayjs(currReservation.end_time).format("DD.MM.YYYY")}</p>
                  <p className="text-xs text-gray-500">{dayjs(currReservation.end_time).format("HH:mm")}</p>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t('admin.duration')}</span>
                  <span className="text-gray-900">{currReservation.duration} {t('admin.days')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t('admin.discount')}</span>
                  <span className="text-gray-900">0 din</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-medium text-gray-900">{t('admin.total')}</span>
                  <span className="text-xl font-semibold text-gray-900">{currReservation.price?.toLocaleString()} din</span>
                </div>
              </div>

              {/* Payment Slip */}
              {currReservation.reservation_image && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">{t('admin.paymentSlip')}</p>
                  <img src={`https://tesla.movelink.org${currReservation.reservation_image}`} alt="Payment slip" className="rounded-xl border border-gray-200 max-h-64 object-contain" />
                </div>
              )}

              {/* Confirm Button */}
              {currReservation.reservation_image && currReservation.status !== 'success' && (
                <button onClick={confirmReservation} className="w-full py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <CheckCircle size={18} />
                  {t('admin.confirmReservation')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllReservations;