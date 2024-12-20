import React from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import Button from '../Shared/Button'

const Popup = ({ orderPopup, handleOrderPopup }) => {
    return (
        <>
            {
                orderPopup && (
                    <div>
                        <div className="h-screen w-screen fixed top-0 left-0nbg-black/50 backdrop-blur-sm">
                            <div className="w-[300px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md
            bg-white dark:bg-gray-900 dark:text-white duration-200 rounded-xl">
                                {/* Header section  */}
                                <div className="flex items-center justify-between">
                                    <h1>Order Now</h1>
                                    <div>
                                        <IoCloseCircleOutline
                                            onClick={handleOrderPopup}
                                            className="text-2xl cursor-pointer" />
                                    </div>
                                </div>

                                {/* Form section  */}
                                <div className="mt-4">
                                    <input type="text" placeholder="Order ID" className="form-input" />
                                    <input type="text" placeholder="Customer ID" className="form-input" />
                                    <input type="text" placeholder="Date" className="form-input" />
                                    <input type="text" placeholder="Delivery Date" className="form-input"/>
                                    <input type="text" placeholder="Amount" className="form-input"/>
                                </div>
                                <div className="flex justify-center">
                                    <Button text="Order Now" bgColor={"bg-primary"} textColor={"text-white"} />
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }
        </>
    )
}

export default Popup
