import React, { useEffect, useState } from "react";
import { User, Users,  Snowflake, Check, Info, ChevronRight, ShoppingBasket, Battery } from "lucide-react";
import { Link } from "react-router-dom";
import DateTimePicker from "../components/DateTimePicker";
import { useAppContext } from "../context/ApplicationContext";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function Cars() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalOpenReturn, setModalOpenReturn] = useState(false);
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [duration, setDuration] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [error, setError] = useState({
        status: false,
        message: ""
    })

    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };


    const { vehicles, reservations } = useAppContext();

    const [reservationStep, setReservationStep] = useState(0)

    const parseDateString = (dateString) => {
        if (!dateString) return null; // Ensure the dateString is not empty

        const [datePart] = dateString.split(" at ");
        if (!datePart) return null; // Ensure datePart exists

        const [day, month, year] = datePart.split(".");
        if (!day || !month || !year) return null; // Ensure the parts are valid

        // Set the time to 08:00 (fixed for both pickup and return)
        const date = new Date(year, month - 1, day, 8, 0); // Hours set to 08, Minutes set to 00
        return date;
    };

    const calculateDuration = (pickup, returnDate) => {
        const pickupDateObj = parseDateString(pickup);
        const returnDateObj = parseDateString(returnDate);

        if (!pickupDateObj || !returnDateObj) {
            setDuration(null);
            return;
        }

        // Calculate the time difference in milliseconds
        const timeDiff = returnDateObj - pickupDateObj;

        // Check if the return date is after the pickup date
        if (timeDiff < 0) {
            setDuration("Invalid duration (return date is before pickup date)");
            return;
        }

        const dayInMillis = 1000 * 60 * 60 * 24; // Milliseconds in a day

        // Calculate the duration in days, rounding up if necessary
        const durationInDays = Math.ceil(timeDiff / dayInMillis);

        // Set the duration in days
        setDuration(durationInDays);
    };

    const convertDate = (dateString) => {
        const [day, month, yearTime] = dateString.split('.');
        const [year, time] = yearTime.split(' at ');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${time}:00`;
    };

    const formattedPickupDate = pickupDate ? convertDate(pickupDate) : null;

    const finishReservation = () => {
        if (Cookies.get('authToken')) {
            if (duration <= 1 && selectedCar === null) {
                setError({
                    status: true,
                    message: "Invalid reservation (minimum of 1 day and select a car)"
                })
            } else {
                setReservationStep(1)
                setError({
                    status: false,
                    message: ""
                })
            }
        } else {
            setError({
                status: true,
                message: "You are not allowed to make a reservation"
            })
        }

    }

    useEffect(() => {
        if (pickupDate && returnDate) {
            calculateDuration(pickupDate, returnDate);
        }
    }, [pickupDate, returnDate]);

    const createReservation = async () => {
        try {
            const userId = Cookies.get('userId');

            // Validate required data
            if (!userId || !selectedCar || !pickupDate || !returnDate || !duration) {
                toast.success('Missing required reservation data!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
                return;
            }

            // Utility function to convert date format
            const convertDate = (dateString) => {
                const [day, month, yearTime] = dateString.split('.');
                const [year, time] = yearTime.split(' at ');
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${time}:00`;
            };

            // Convert dates
            const formattedPickupDate = convertDate(pickupDate);
            const formattedReturnDate = convertDate(returnDate);

            // Calculate the price based on the selected vehicle and duration
            const vehicle = vehicles.find((veh) => veh.id === selectedCar);
            if (!vehicle) {
                toast.error('Selected car not found!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
                return;
            }

            const price = vehicle.price_per_day * duration;

            // Send the reservation request to the server
            const response = await fetch('https://api.davidtesla.online/reservations/create-reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vehicle_id: selectedCar,
                    start_time: formattedPickupDate,
                    end_time: formattedReturnDate,
                    user_id: userId,
                    duration,
                    price
                }),
            });

            // Check if the request was successful
            if (!response.ok) {
                
                toast.error('Failed to create reservation!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }

            toast.success('Your reservation created successfuly!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        } catch (error) {
            console.error('An error occurred while creating the reservation:', error);
        }
    };


    return (
        <div className="w-screen min-h-screen pb-6">

<header>
        <div className="flex items-center justify-between" style={{ padding: 30 }}>
          <Link to="/"><img src={require('../assets/teslalogo.png')} style={{ height: 40 }} alt="" /></Link>
          <nav className="text-black flex gap-6">
            <select onChange={(e) => changeLanguage(e.target.value)} name="" id="">
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="sr">SR</option>
            </select>
            <Link to="/auth"><User /></Link>
          </nav>
        </div>
        <div className="flex header-submenu items-center justify-center gap-6 text-black py-2 border-t border-[#f7f7f7]">
          <Link className="opacity-50" to="/vehicles" style={{ fontSize: 14 }}>{t('header.vehicles')}</Link>
          <Link className="opacity-50" to="/general-terms" style={{ fontSize: 14 }}>{t('footer.linkFour')}</Link>
        </div>
      </header>
            {
                error.status && (
                    <p className="text-red-500 text-xs text-center pt-8">{error.message}</p>
                )
            }
            {
                reservationStep === 0 ? (
                    <>
                        {
                            Cookies.get('authToken') ? null : (
                                <div className="max-w-screen-xl mx-6 pl-6 py-3 pr-3 bg-[#f7f7f7] rounded my-6 md:mx-auto text-black flex flex-col md:flex-row gap-4 items-center justify-between">
                                    <h1>{t('makeReservationHeader.title')}</h1>
                                    <Link to="/auth" className="bg-[#59c23d] p-3 rounded text-white font-semibold w-full md:w-auto">{t('makeReservationHeader.button')}</Link>
                                </div>
                            )
                        }
                        <div className="reservation-section max-w-screen-xl mx-6 p-6 bg-[#f7f7f7] rounded my-6 md:mx-auto text-black grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="pickup"
                                    className="font-semibold text-xs opacity-50"
                                >
                                    {t('reservationFormHeader.pickUp')}
                                </label>
                                <input
                                    id="pickup"
                                    className="p-4 border-b border-b-[#2e2e2e] outline-none bg-[#f7f7f7]"
                                    type="text"
                                    value={pickupDate}
                                    onClick={() => setModalOpen(true)}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="return"
                                    className="font-semibold text-xs opacity-50"
                                >
                                    {t('reservationFormHeader.return')}
                                </label>
                                <input
                                    id="return"
                                    className="p-4 border-b border-b-[#2e2e2e] outline-none bg-[#f7f7f7]"
                                    type="text"
                                    value={returnDate}
                                    onClick={() => setModalOpenReturn(true)}
                                    readOnly
                                />
                            </div>
                            <button onClick={finishReservation} className="p-4 border-none outline-none rounded-lg bg-[#59c23d] hover:bg-[#68e048] text-white">{t('reservationFormHeader.button')}</button>
                        </div>
                        <div className="list-of-cars flex flex-col gap-2 max-w-screen-xl md:mx-auto px-6 md:px-0">

                            {
                                vehicles.map((vehicle) => {
                                    // Helper function for date conversion
                                    const convertDate = (dateString) => {
                                        const [day, month, yearTime] = dateString.split('.');
                                        const [year, time] = yearTime.split(' at ');
                                        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${time}:00`;
                                    };

                                    // Check if dates are provided and format them
                                    const formattedPickupDate = pickupDate ? convertDate(pickupDate) : null;
                                    const formattedReturnDate = returnDate ? convertDate(returnDate) : null;

                                    // Function to check if the car is busy (only if dates are provided)
                                    const isCarBusy = (vehicleId) => {
                                        if (!formattedPickupDate || !formattedReturnDate) {
                                            return false; // If no dates, assume car is not busy
                                        }

                                        return reservations.some(reservation =>
                                            reservation.vehicle_id === vehicleId &&
                                            (
                                                (formattedPickupDate >= reservation.start_time && formattedPickupDate < reservation.end_time) ||
                                                (formattedReturnDate > reservation.start_time && formattedReturnDate <= reservation.end_time) ||
                                                (formattedPickupDate <= reservation.start_time && formattedReturnDate >= reservation.end_time)
                                            )
                                        );
                                    };

                                    const busy = isCarBusy(vehicle.id); // Check if the car is busy

                                    return (
                                        <div
                                            key={vehicle.id}
                                            className={`car-card border-b border-b-[#f7f7f7] ${selectedCar !== null && selectedCar !== vehicle.id ? 'opacity-50' : null}`}
                                        >
                                            <div className="car-main-details flex flex-col md:flex-row gap-4">
                                                <img src={vehicle.banner_image} className="w-full md:w-[320px]" alt="" />
                                                <div className="car-infos flex-1 text-black flex flex-col md:flex-row items-center justify-between">
                                                    <div className="w-full md:w-auto">
                                                        <h1 className="text-3xl font-semibold">{vehicle.vehicle_name}</h1>
                                                        <div className="flex gap-4 mt-4 flex-wrap">
                                                            <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto">
                                                                <Users size={14} /> 5
                                                            </span>
                                                            <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto">
                                                                <Battery size={14} /> {vehicle.range_km} km
                                                            </span>
                                                            <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto">
                                                                <Snowflake size={14} /> A/C
                                                            </span>
                                                            <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto">
                                                                <Battery size={14} /> {vehicle.battery_capacity_kwh} kwh
                                                            </span>
                                                            <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto">
                                                                <Check size={14} /> Autopilot
                                                            </span>
                                                            <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto">
                                                                <img src={require('../assets/icons/awd.png')} style={{ height: 14 }} alt="" /> AWD
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col gap-2 mt-4">
                                                            <span className="flex items-center gap-2 text-sm">
                                                                <Check size={16} color={`#68e048`} /> {t('reserveCarForm.mileageSubtitle')}
                                                            </span>
                                                            <span className="flex items-center gap-2 text-sm">
                                                                <Info size={16} color={`rgba(0,0,0,0.5)`} /> {t('reserveCarForm.requiredYears')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end w-full md:w-auto">
                                                        <h1 className="text-xs">{t('reserveCarForm.payAtDesk')}</h1>
                                                        <h3 className="text-lg font-semibold">{t('reserveCarForm.from')} {vehicle.price_per_day} din / {t('reserveCarForm.day')}</h3>
                                                        <p className="opacity-50 text-sm">
                                                            {t('reserveCarForm.total')}: {(duration * vehicle.price_per_day).toLocaleString(void 0, { maximumFractionDigits: 2 }).replace(',', '.')} din
                                                        </p>
                                                        <button
                                                            onClick={() => {
                                                                if (!busy) {
                                                                    setSelectedCar(selectedCar === vehicle.id ? null : vehicle.id);
                                                                }
                                                            }}
                                                            className={`py-3 px-6 mt-3 w-full md:w-auto text-sm rounded ${busy ? 'bg-gray-500 cursor-not-allowed' : selectedCar === vehicle.id ? 'bg-black' : 'bg-[#59c23d] hover:bg-[#68e048]'} text-white`}
                                                            disabled={busy}
                                                        >
                                                            {busy ? t('reserveCarForm.notAvailableCar') : selectedCar === vehicle.id ? t('reserveCarForm.selectedCar') : t('reserveCarForm.selectCar')}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }


                        </div>
                    </>
                ) : (
                    <div className="px-0 md:px-6">
                        <div className="selected-reservation-details bg-[#F7F7F7] mx-6 md:mx-auto max-w-screen-xl py-8 rounded-lg mt-6 overflow-hidden">
                            <h1 className="px-8 text-4xl font-bold mb-6">{t('yourReservation.title')}:</h1>
                            {
                                vehicles.filter((vehicle) => vehicle.id === selectedCar).map((vehicle) => {
                                    return (
                                        <div key={vehicle.id} className={`car-card border-b mx-8 border-b-[#f7f7f7] ${selectedCar !== null && (selectedCar !== vehicle.id ? 'opacity-50' : null)}`}>
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
                                                            <span className="flex items-center gap-2 text-sm"><Check size={16} color={`#68e048`} /> {t('reserveCarForm.mileageSubtitle')}</span>
                                                            <span className="flex items-center gap-2 text-sm"><Info size={16} color={`rgba(0,0,0,0.5)`} /> {t('reserveCarForm.requiredYears')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="duration grid px-8 grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
                                <h3 className="py-4 text-center border-b font-medium text-sm bg-white">{pickupDate}</h3>
                                <span className="py-0 md:py-4 text-center text-sm block mx-auto rotate-90 sm:rotate-0"><ChevronRight /></span>
                                <h3 className="py-4 text-center border-b font-medium text-sm bg-white">{returnDate}</h3>
                            </div>
                            <div className="p-4 bg-white mx-8 mt-8 flex flex-col items-end rounded">
                                <h1 className="mb-4 w-full text-right border-b pb-4">{t('yourReservation.priceWithoutDiscount')}: <strong>{duration * vehicles.filter((vehicle) => vehicle.id === selectedCar).map((vehicle) => vehicle.price_per_day).toLocaleString(void 0, { maximumFractionDigits: 2 })} din</strong></h1>
                                <h1 className="mb-4 w-full text-right border-b pb-4">{t('yourReservation.discount')}: <strong>0 din</strong></h1>
                                <h1 className="mb-4 w-full text-right">{t('yourReservation.totalPrice')}: <strong>{duration * vehicles.filter((vehicle) => vehicle.id === selectedCar).map((vehicle) => vehicle.price_per_day).toLocaleString(void 0, { maximumFractionDigits: 2 })} din</strong></h1>
                                <button onClick={createReservation} className="w-full md:w-auto bg-[#59c23d] hover:bg-[#68e048] py-3 px-6 text-white rounded flex items-center gap-2"> <ShoppingBasket /> {t('yourReservation.button')}</button>
                            </div>
                        </div>
                    </div>
                )
            }



            {isModalOpen && (
                <DateTimePicker
                    onClose={() => setModalOpen(false)}
                    disabled={{ before: new Date() }}
                    onConfirm={(formattedDate) => {
                        setPickupDate(formattedDate);
                        calculateDuration(formattedDate, returnDate);
                    }}
                />
            )}
            {isModalOpenReturn && (
                <DateTimePicker
                    onClose={() => setModalOpenReturn(false)}
                    disabled={{ before: formattedPickupDate }}
                    onConfirm={(formattedDate) => {
                        setReturnDate(formattedDate);
                        calculateDuration(pickupDate, formattedDate);
                    }}
                />
            )}

        </div>
    )
}

export default Cars