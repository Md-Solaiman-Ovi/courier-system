// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { createParcel, getMyParcels } from "../features/parcelSlice";
// import type { AppDispatch } from "../redux/store";

// interface ParcelForm {
//   pickupAddress: string;
//   deliveryAddress: string;
//   type: string;
//   isCOD: boolean;
// }

// const ParcelBookingForm: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { register, handleSubmit, reset } = useForm<ParcelForm>({
//     defaultValues: { isCOD: true },
//   });

//   const onSubmit = async (data: ParcelForm) => {
//     await dispatch(createParcel(data));
//     await dispatch(getMyParcels());
//     reset();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="bg-white p-6 rounded shadow mb-6"
//     >
//       <h2 className="text-xl font-semibold mb-4">Book a Parcel</h2>
//       <div className="mb-3">
//         <label className="block mb-1">Pickup Address</label>
//         <input
//           {...register("pickupAddress")}
//           className="w-full border p-2 rounded"
//         />
//       </div>
//       <div className="mb-3">
//         <label className="block mb-1">Delivery Address</label>
//         <input
//           {...register("deliveryAddress")}
//           className="w-full border p-2 rounded"
//         />
//       </div>
//       <div className="mb-3">
//         <label className="block mb-1">Parcel Type</label>
//         <select {...register("type")} className="w-full border p-2 rounded">
//           <option value="document">Document</option>
//           <option value="box">Box</option>
//           <option value="fragile">Fragile</option>
//         </select>
//       </div>
//       <div className="mb-3 flex items-center space-x-2">
//         <input type="checkbox" {...register("isCOD")} />
//         <label>Cash on Delivery (COD)</label>
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default ParcelBookingForm;

// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { createParcel, getMyParcels } from "../features/parcelSlice";
// import type { AppDispatch } from "../redux/store";

// interface ParcelForm {
//   pickupAddress: string;
//   deliveryAddress: string;
//   type: string;
//   isCOD: boolean;
//   amount: number;
// }

// const ParcelBookingForm: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { register, handleSubmit, reset } = useForm<ParcelForm>({
//     defaultValues: { isCOD: true },
//   });

//   const onSubmit = async (data: ParcelForm) => {
//     console.log("create function data", data);

//     const resultAction = await dispatch(createParcel(data));

//     try {
//       if (createParcel.rejected.match(resultAction)) {
//         alert("Failed to create parcel: " + resultAction.payload);
//         return;
//       }

//       await dispatch(getMyParcels());
//       reset();
//     } catch (error) {
//       // @ts-expect-error type mismatch issue
//       console.log("error ", error.message);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="bg-white p-6 rounded shadow mb-6"
//     >
//       <h2 className="text-xl font-semibold mb-4">Book a Parcel</h2>
//       <div className="mb-3">
//         <label className="block mb-1">Pickup Address</label>
//         <input
//           {...register("pickupAddress")}
//           className="w-full border p-2 rounded"
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label className="block mb-1">Delivery Address</label>
//         <input
//           {...register("deliveryAddress")}
//           className="w-full border p-2 rounded"
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label className="block mb-1">Parcel Type</label>
//         <select {...register("type")} className="w-full border p-2 rounded">
//           <option value="document">Document</option>
//           <option value="box">Box</option>
//           <option value="fragile">Fragile</option>
//         </select>
//       </div>
//       <div className="mb-3">
//         <label className="block mb-1">Amount (in BDT)</label>
//         <input
//           type="number"
//           {...register("amount", { valueAsNumber: true })}
//           className="w-full border p-2 rounded"
//           required
//         />
//       </div>
//       <div className="mb-3 flex items-center space-x-2">
//         <input type="checkbox" {...register("isCOD")} />
//         <label>Cash on Delivery (COD)</label>
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default ParcelBookingForm;

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createParcel, getMyParcels } from "../features/parcelSlice";
import type { AppDispatch } from "../redux/store";

interface ParcelForm {
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: "document" | "box" | "fragile";
  isCOD: boolean;
}

const ParcelBookingForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset, watch } = useForm<ParcelForm>({
    defaultValues: {
      isCOD: true,
      parcelType: "document",
    },
  });

  const selectedType = watch("parcelType");

  const getAmountByType = (type: string) => {
    switch (type) {
      case "document":
        return 100;
      case "box":
        return 150;
      case "fragile":
        return 200;
      default:
        return 0;
    }
  };

  const onSubmit = async (data: ParcelForm) => {
    const amount = getAmountByType(data.parcelType);
    const parcelData = { ...data, amount };

    console.log("Creating parcel:", parcelData);

    try {
      const resultAction = await dispatch(createParcel(parcelData));

      if (createParcel.rejected.match(resultAction)) {
        alert("❌ Failed to create parcel: " + resultAction.payload);
        return;
      }

      await dispatch(getMyParcels());
      reset();
      alert("✅ Parcel created successfully");
    } catch (error) {
      // @ts-expect-error type mismatch issue
      console.error("❌ Error:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">Book a Parcel</h2>

      <div className="mb-3">
        <label className="block mb-1">Pickup Address</label>
        <input
          {...register("pickupAddress")}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Delivery Address</label>
        <input
          {...register("deliveryAddress")}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Parcel Type</label>
        <select
          {...register("parcelType")}
          className="w-full border p-2 rounded"
          required
        >
          <option value="document">Document</option>
          <option value="box">Box</option>
          <option value="fragile">Fragile</option>
        </select>
      </div>

      <div className="mb-3 text-sm text-gray-600">
        <strong>Amount:</strong> {getAmountByType(selectedType)} BDT
      </div>

      <div className="mb-3 flex items-center space-x-2">
        <input type="checkbox" {...register("isCOD")} />
        <label>Cash on Delivery (COD)</label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ParcelBookingForm;
