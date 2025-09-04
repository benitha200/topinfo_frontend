import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-slate-600 mb-6 border-b pb-4">
            Privacy Policy for www.TopInfo.rw
          </h1>
          
          <p className="text-gray-600 mb-4">
            <strong>Effective Date:</strong> January 11, 2024
          </p>
          
          <p className="text-gray-800 mb-6">
            This Privacy Policy governs the collection, use, and disclosure of personal information for www.TopInfo.rw, 
            a platform connecting service seekers and service providers in Rwanda, owned by Ahupa Business Network Ltd. 
            By using our platform, you agree to the terms and conditions outlined in this Privacy Policy.
          </p>
          
          <div className="space-y-6">
            {/* 1. Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-600 mb-4">1. Information We Collect</h2>
              <p className="text-gray-800 mb-4">
                We collect the following types of personal information to provide and improve our services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Personal Identification Information:</strong> When you register as a service seeker 
                  or service provider, we collect your name, email address, phone number, and any other 
                  relevant details you provide during the registration or service request process.
                </li>
                <li>
                  <strong>Service Details:</strong> Information related to the services you seek or provide, 
                  such as service type, location, price, and availability.
                </li>
                <li>
                  <strong>Payment Information:</strong> For transactions made through the platform, we collect 
                  payment details to process payments securely.
                </li>
                <li>
                  <strong>Device and Usage Information:</strong> We collect information about your device, 
                  IP address, browser type, and activity on our platform (such as pages visited and actions taken) 
                  to improve user experience.
                </li>
              </ul>
            </section>

            {/* 2. How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-600 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-800 mb-4">We use your personal information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To facilitate communication between service seekers and service providers.</li>
                <li>To provide, maintain, and improve our platform and services.</li>
                <li>To process transactions and payments securely.</li>
                <li>To send updates, promotions, and marketing materials (only if you opt-in to receive such communications).</li>
                <li>To respond to customer service inquiries and provide support.</li>
                <li>To comply with legal obligations and enforce our terms of service.</li>
              </ul>
            </section>

            {/* 3. How We Share Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-600 mb-4">3. How We Share Your Information</h2>
              <p className="text-gray-800 mb-4">
                We do not sell, rent, or trade your personal information to third parties. However, we may 
                share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Service Providers:</strong> If you are a service seeker, we may share your information 
                  with the service provider to facilitate the delivery of services.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required by law or 
                  to comply with legal processes.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, 
                  your information may be transferred as part of that transaction.
                </li>
              </ul>
            </section>

            {/* 4. Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-600 mb-4">4. Data Security</h2>
              <p className="text-gray-800 mb-4">
                We take the security of your personal information seriously and implement reasonable safeguards 
                to protect it from unauthorized access, alteration, disclosure, or destruction. However, please 
                note that no data transmission over the internet is completely secure, and we cannot guarantee 
                absolute security.
              </p>
            </section>

            {/* 5. Cookies and Tracking Technologies */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-600 mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-gray-800 mb-4">
                We use cookies and similar technologies to enhance user experience on our platform. Cookies help 
                us remember your preferences, track your usage, and improve our services. You can manage cookie 
                preferences through your browser settings, though some features of the platform may not function 
                properly without cookies.
              </p>
            </section>

            {/* 6. Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-600 mb-4">6. Your Rights</h2>
              <p className="text-gray-800 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access the personal information we hold about you.</li>
                <li>Request corrections or updates to your personal information.</li>
                <li>Request the deletion of your personal information, subject to legal requirements.</li>
                <li>Opt-out of receiving marketing communications at any time.</li>
              </ul>
              <p className="text-gray-800 mt-4">
                To exercise these rights, please contact us at the details provided below.
              </p>
            </section>

            {/* 7. Third-Party Links */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-600 mb-4">7. Third-Party Links</h2>
              <p className="text-gray-800">
                Our platform may contain links to third-party websites. We are not responsible for the privacy 
                practices or the content of those websites. We encourage you to read the privacy policies of 
                any third-party sites you visit.
              </p>
            </section>

            {/* 8. Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-600 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-800">
                Our platform is not intended for children under the age of 13. We do not knowingly collect 
                personal information from children. If we learn that we have collected personal information 
                from a child under 13, we will take steps to delete that information.
              </p>
            </section>

            {/* 9. Changes to This Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-600 mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-gray-800">
                We reserve the right to update or modify this Privacy Policy at any time. Any changes will 
                be posted on this page with an updated effective date. We encourage you to review this policy 
                periodically.
              </p>
            </section>

            {/* 10. Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-600 mb-4">10. Contact Us</h2>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-gray-800 mb-2">
                  <strong>Ahupa Business Network Ltd</strong>
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> ahupanet@gmail.com / topinforwanda@gmail.com
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> +250 788 67 64 58 | +250 785 025 495
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> Beatitude House opposite Okapi Hotel, 4th Floor, Room 22
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;