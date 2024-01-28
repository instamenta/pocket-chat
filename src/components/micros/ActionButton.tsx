import React from 'react';

export default function Page() {

  async function publish(formData: FormData) {
    'use server';

    return;
  }

  return <button action={publish}>Publish</button>;
}

// type T_props = { action: any, id: string}

// const ActionButton = ({action, id}: T_props) => {
//
//   const extendedAction = action.bind(null, id);
//   return (
//     <button
//       className="mb-1 w-full border-2 bg-white py-1 text-slate-500 shadow-inner shadow-gray-500 transition-all
//                                hover:border-slate-400 hover:bg-slate-100 hover:text-black"
//       action={extendedAction}
//     >
//       Send Request
//     </button>
//   )
//     ;
// };

// <button
//   className="w-full border-2 bg-gray-400 py-1 text-white shadow-inner shadow-gray-500 transition-all
//                                hover:border-slate-400 hover:bg-slate-100 hover:text-black"
// >
//   Remove
// </button>


// export default ActionButton;