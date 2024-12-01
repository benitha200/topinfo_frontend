// import React from 'react';
// import { CheckCircle, Mobile } from 'lucide-react';
// import AgentLayout from './AgentLayout';

// const PaymentApprovalPage = () => {
//   return (
//     <AgentLayout>
//       <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 p-6">
//         <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
//           <Mobile className="mx-auto mb-6 text-blue-500" size={64} />
//           <h1 className="text-2xl font-bold mb-4 text-gray-800">Awaiting Transaction Approval</h1>
//           <p className="text-gray-600 mb-6">
//             Please confirm the transaction on your mobile device
//           </p>
//           <div className="flex items-center justify-center space-x-2 text-green-600">
//             <CheckCircle size={24} />
//             <span className="font-medium">Waiting for user confirmation</span>
//           </div>
//         </div>
//       </div>
//     </AgentLayout>
//   );
// };

// export default PaymentApprovalPage;

import React from 'react'
import AgentLayout from './AgentLayout'
import { CheckCircle, Phone } from 'lucide-react'

const PaymentApprovalPage = () => {
    return (
        <AgentLayout>
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 p-6">
                <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <Phone className="mx-auto mb-6 text-blue-500" size={64} />
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">Awaiting Transaction Approval</h1>
                    <p className="text-gray-600 mb-6">
                        Please confirm the transaction on your mobile device
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle size={24} />
                        <span className="font-medium">Waiting for user confirmation</span>
                    </div>
                </div>
            </div>
        </AgentLayout>

    )
}

export default PaymentApprovalPage

