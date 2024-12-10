import React, { useEffect, useState } from "react";
import { ShoppingBag, Sun, User, Users, DoorOpen, Snowflake, Check, Info, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import DateTimePicker from "../components/DateTimePicker";

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

    const [reservationStep, setReservationStep] = useState(0)

    // Function to parse date string in format "DD.MM.YYYY at HH:MM"
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

    const finishReservation = () => {
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
    }

    useEffect(() => {
        if (pickupDate && returnDate) {
            calculateDuration(pickupDate, returnDate);
        }
    }, [pickupDate, returnDate]);

    return (
        <div className="w-screen min-h-screen pb-6">

            <header className="">
                <div className="flex items-center justify-between" style={{ padding: 30 }}>
                    <Link to="/"><img src={require('../assets/teslalogo.png')} style={{ height: 40 }} alt="" /></Link>
                    <nav className="text-black flex gap-6">
                        <Link to="/auth"><User /></Link>
                    </nav>
                </div>
                <div className="flex header-submenu items-center justify-center gap-6 text-black py-2 border-t border-[#f7f7f7]">
                    <Link className="opacity-100" to="/vozila" style={{ fontSize: 14 }}>Vehicles</Link>
                    <Link className="opacity-50" style={{ fontSize: 14 }}>My reservations</Link>
                    <Link className="opacity-50" style={{ fontSize: 14 }}>Blog</Link>
                    <Link className="opacity-50" style={{ fontSize: 14 }}>About Us</Link>
                    <Link className="opacity-50" style={{ fontSize: 14 }}>Contact</Link>
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
                        <div className="reservation-section max-w-screen-xl mx-6 p-6 bg-[#f7f7f7] rounded my-6 md:mx-auto text-black grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="pickup"
                                    className="font-semibold text-xs opacity-50"
                                >
                                    Pick-up date & time
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
                                    Return date & time
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
                            <button onClick={finishReservation} className="p-4 border-none outline-none rounded-lg bg-[#59c23d] hover:bg-[#68e048] text-white">Rezerviši</button>
                        </div>
                        <div className="list-of-cars flex flex-col gap-2 max-w-screen-xl md:mx-auto px-6 md:px-0">
                            <div className={`car-card border-b border-b-[#f7f7f7] ${selectedCar !== null && (selectedCar !== 0 ? 'opacity-50' : null)}`}>
                                <div className="car-main-details flex flex-col md:flex-row gap-4">
                                    <img src={require('../assets/cars/model3.png')} className="w-full md:w-[320px]" alt="" />
                                    <div className="car-infos flex-1 text-black flex flex-col md:flex-row items-center justify-between">
                                        <div className="w-full md:w-auto">
                                            <h1 className="text-3xl font-semibold">Tesla Model 3</h1>
                                            <div className="flex gap-4 mt-4">
                                                <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><Users size={14} /> 5</span>
                                                <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><DoorOpen size={14} /> 5</span>
                                                <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><Snowflake size={14} /> A/C</span>
                                            </div>
                                            <div className="flex flex-col gap-2 mt-4">
                                                <span className="flex items-center gap-2 text-sm"><Check size={16} color={`#68e048`} /> Unlimited mileage</span>
                                                <span className="flex items-center gap-2 text-sm"><Info size={16} color={`rgba(0,0,0,0.5)`} /> 21 years required</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end w-full md:w-auto">
                                            <h1 className="text-xs">PAY AT DESK</h1>
                                            <h3 className="text-lg font-semibold">6.000 din / day</h3>
                                            <p className="opacity-50 text-sm">TOTAL: {(duration * 6000).toLocaleString(void 0, { maximumFractionDigits: 2 }).replace(',', '.')} din</p>
                                            <button onClick={() => {
                                                setSelectedCar(selectedCar === 0 ? null : 0)
                                            }} className={`py-3 px-6 mt-3 w-full md:w-auto text-sm rounded ${selectedCar === 0 ? `bg-black` : `bg-[#59c23d] hover:bg-[#68e048]`}  text-white`}>{selectedCar === 0 ? 'SELECTED CAR' : 'SELECT CAR'}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`car-card border-b border-b-[#f7f7f7] ${selectedCar !== null && (selectedCar !== 1 ? 'opacity-50' : null)}`}>
                                <div className="car-main-details flex flex-col md:flex-row gap-4">
                                    <img src={require('../assets/cars/model3.png')} className="w-full md:w-[320px]" alt="" />
                                    <div className="car-infos flex-1 text-black flex flex-col md:flex-row items-center justify-between">
                                        <div className="w-full md:w-auto">
                                            <h1 className="text-3xl font-semibold">Tesla Model 3</h1>
                                            <div className="flex gap-4 mt-4">
                                                <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><Users size={14} /> 5</span>
                                                <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><DoorOpen size={14} /> 5</span>
                                                <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><Snowflake size={14} /> A/C</span>
                                            </div>
                                            <div className="flex flex-col gap-2 mt-4">
                                                <span className="flex items-center gap-2 text-sm"><Check size={16} color={`#68e048`} /> Unlimited mileage</span>
                                                <span className="flex items-center gap-2 text-sm"><Info size={16} color={`rgba(0,0,0,0.5)`} /> 21 years required</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end w-full md:w-auto">
                                            <h1 className="text-xs">PAY AT DESK</h1>
                                            <h3 className="text-lg font-semibold">6.000 din / day</h3>
                                            <p className="opacity-50 text-sm">TOTAL: {(duration * 6000).toLocaleString(void 0, { maximumFractionDigits: 2 }).replace(',', '.')} din</p>
                                            <button onClick={() => {
                                                setSelectedCar(selectedCar === 1 ? null : 1)
                                            }} className={`py-3 px-6 mt-3 w-full md:w-auto text-sm rounded ${selectedCar === 1 ? `bg-black` : `bg-[#59c23d] hover:bg-[#68e048]`}  text-white`}>{selectedCar === 1 ? 'SELECTED CAR' : 'SELECT CAR'}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`car-card border-b border-b-[#f7f7f7] ${selectedCar !== null && (selectedCar !== 2 ? 'opacity-50' : null)}`}>
                                <div className="car-main-details flex flex-col md:flex-row gap-4">
                                    <img src={require('../assets/cars/model3.png')} className="w-full md:w-[320px]" alt="" />
                                    <div className="car-infos flex-1 text-black flex flex-col md:flex-row items-center justify-between">
                                        <div className="w-full md:w-auto">
                                            <h1 className="text-3xl font-semibold">Tesla Model 3</h1>
                                            <div className="flex gap-4 mt-4">
                                                <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><Users size={14} /> 5</span>
                                                <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><DoorOpen size={14} /> 5</span>
                                                <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><Snowflake size={14} /> A/C</span>
                                            </div>
                                            <div className="flex flex-col gap-2 mt-4">
                                                <span className="flex items-center gap-2 text-sm"><Check size={16} color={`#68e048`} /> Unlimited mileage</span>
                                                <span className="flex items-center gap-2 text-sm"><Info size={16} color={`rgba(0,0,0,0.5)`} /> 21 years required</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end w-full md:w-auto">
                                            <h1 className="text-xs">PAY AT DESK</h1>
                                            <h3 className="text-lg font-semibold">6.000 din / day</h3>
                                            <p className="opacity-50 text-sm">TOTAL: {(duration * 6000).toLocaleString(void 0, { maximumFractionDigits: 2 }).replace(',', '.')} din</p>
                                            <button onClick={() => {
                                                setSelectedCar(selectedCar === 2 ? null : 2)
                                            }} className={`py-3 px-6 mt-3 w-full md:w-auto text-sm rounded ${selectedCar === 2 ? `bg-black` : `bg-[#59c23d] hover:bg-[#68e048]`}  text-white`}>{selectedCar === 2 ? 'SELECTED CAR' : 'SELECT CAR'}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="px-0 md:px-6">
                        <div className="selected-reservation-details bg-[#F7F7F7] mx-6 md:mx-auto max-w-screen-xl py-8 rounded-lg mt-6 overflow-hidden">
                            <h1 className="px-8 text-4xl font-bold mb-6">Your reservation:</h1>
                            <div className={`car-card border-b border-b-[#f7f7f7] px-8`}>
                                <div className="car-main-details flex flex-col md:flex-row gap-4">
                                    <img src={require('../assets/cars/model3.png')} className="w-full md:w-[320px]" alt="" />
                                    <div className="car-infos flex-1 text-black flex flex-col md:flex-row items-start justify-between">
                                        <div className="w-full md:w-auto">
                                            <h1 className="text-3xl font-semibold">Tesla Model 3</h1>
                                            <div className="flex gap-4 mt-4">
                                                <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><Users size={14} /> 5</span>
                                                <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><DoorOpen size={14} /> 5</span>
                                                <span className="flex items-center gap-2 text-xs py-2 px-4 bg-[#f7f7f7] rounded-full w-auto"><Snowflake size={14} /> A/C</span>
                                            </div>
                                            <div className="flex flex-col gap-2 mt-4">
                                                <span className="flex items-center gap-2 text-sm"><Check size={16} color={`#68e048`} /> Unlimited mileage</span>
                                                <span className="flex items-center gap-2 text-sm"><Info size={16} color={`rgba(0,0,0,0.5)`} /> 21 years required</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end w-full md:w-auto pt-6 sm:pt-0">
                                            <h1 className="text-xs">PAY AT DESK</h1>
                                            <h3 className="text-lg font-semibold">6.000 din / day</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="duration grid px-8 grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
                                <h3 className="py-4 text-center border-b font-medium text-sm bg-white">{pickupDate}</h3>
                                <span className="py-0 md:py-4 text-center text-sm block mx-auto rotate-90 sm:rotate-0"><ChevronRight /></span>
                                <h3 className="py-4 text-center border-b font-medium text-sm bg-white">{returnDate}</h3>
                            </div>
                            <div className="p-4 bg-white mx-8 mt-8 flex flex-col items-end rounded">
                                <h1 className="mb-4 w-full text-right border-b pb-4">Price without discount: <strong>24.000 din</strong></h1>
                                <h1 className="mb-4 w-full text-right border-b pb-4">Discount: <strong>2.400 din</strong></h1>
                                <h1 className="mb-4 w-full text-right">Total price: <strong>21.600 din</strong></h1>
                                    <button className="w-full md:w-auto bg-[#59c23d] hover:bg-[#68e048] py-3 px-6 text-white rounded">Checkout now !</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {isModalOpen && (
                <DateTimePicker
                    onClose={() => setModalOpen(false)}
                    onConfirm={(formattedDate) => {
                        setPickupDate(formattedDate);
                        calculateDuration(formattedDate, returnDate);
                    }}
                />
            )}
            {isModalOpenReturn && (
                <DateTimePicker
                    onClose={() => setModalOpenReturn(false)}
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