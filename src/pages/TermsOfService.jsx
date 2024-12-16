import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-sky-600 mb-6 border-b pb-4">
            Terms of Service for www.TopInfo.rw
          </h1>
          
          <p className="text-gray-600 mb-4">
            <strong>Effective Date:</strong> 1st November, 2024
          </p>
          
          <p className="text-gray-800 mb-6">
            These Terms of Service ("Terms") govern your access to and use of the platform www.TopInfo.rw, 
            a service connecting service seekers and service providers in Rwanda, owned by Ahupa Business 
            Network Ltd ("we," "us," "our"). By accessing or using www.TopInfo.rw (the "Platform"), 
            you agree to comply with these Terms.
          </p>
          
          <div className="space-y-6">
            {/* 1. Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-800">
                By using the Platform, you acknowledge and agree to be bound by these Terms and our Privacy Policy. 
                If you do not agree to these Terms, you must not use the Platform.
              </p>
            </section>

            {/* 2. Eligibility */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">2. Eligibility</h2>
              <p className="text-gray-800">
                You must be at least 18 years old or have the consent of a parent or guardian to use the Platform. 
                By using the Platform, you confirm that you meet these eligibility requirements.
              </p>
            </section>

            {/* 3. Account Registration */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">3. Account Registration</h2>
              <p className="text-gray-800 mb-4">
                To use certain features of the Platform, you may need to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate, complete, and up-to-date information during the registration process.</li>
                <li>Be responsible for maintaining the confidentiality of your account login credentials.</li>
                <li>Be responsible for all activities under your account.</li>
                <li>Notify us immediately of any unauthorized use of your account.</li>
              </ul>
            </section>

            {/* 4. Service Seekers and Service Providers */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">4. Service Seekers and Service Providers</h2>
              <p className="text-gray-800 mb-4">
                <strong>Service Seekers:</strong> Individuals or organizations seeking services provided by service providers.
              </p>
              <p className="text-gray-800 mb-4">
                <strong>Service Providers:</strong> Individuals or businesses offering services through the Platform.
              </p>
              <p className="text-gray-800">
                As a service seeker or service provider, you are responsible for the content you post, 
                the services you offer, and ensuring that any agreements made comply with applicable laws.
              </p>
            </section>

            {/* 5. Use of the Platform */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">5. Use of the Platform</h2>
              <p className="text-gray-800 mb-4">You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use the Platform only for lawful purposes and in accordance with these Terms.</li>
                <li>Not engage in any activity that interferes with or disrupts the functioning of the Platform.</li>
                <li>Not post content that is illegal, offensive, defamatory, or violates the rights of others.</li>
                <li>Not solicit personal information from other users without their consent.</li>
              </ul>
            </section>

            {/* 6. Payment and Transactions */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">6. Payment and Transactions</h2>
              <p className="text-gray-800 mb-4">
                The Platform facilitates payments between service seekers and service providers through a secure payment gateway.
              </p>
              <p className="text-gray-800 mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Pay for services rendered in accordance with the agreed-upon terms.</li>
                <li>Resolve any disputes directly between the service seeker and service provider.</li>
              </ul>
            </section>

            {/* 7. Ratings and Reviews */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">7. Ratings and Reviews</h2>
              <p className="text-gray-800 mb-4">
                Service seekers and service providers may leave ratings and reviews based on their experiences. 
                These ratings and reviews should be honest and reflect genuine interactions.
              </p>
              <p className="text-gray-800">
                We reserve the right to remove or modify any ratings, reviews, or content that we deem 
                inappropriate, offensive, or in violation of our Terms.
              </p>
            </section>

            {/* 8. Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">8. Intellectual Property</h2>
              <p className="text-gray-800 mb-4">
                All content, logos, designs, and materials on the Platform are the property of Ahupa Business 
                Network Ltd or our licensors. You may not use, copy, or distribute any content from the Platform 
                without our prior written consent.
              </p>
              <p className="text-gray-800">
                You retain ownership of any content you post on the Platform, but by posting content, you grant 
                us a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content 
                in connection with the Platform.
              </p>
            </section>

            {/* 9. Termination of Account */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">9. Termination of Account</h2>
              <p className="text-gray-800 mb-4">
                We may suspend or terminate your account at our sole discretion if you violate these Terms 
                or engage in fraudulent, harmful, or inappropriate activities.
              </p>
              <p className="text-gray-800">
                You may also deactivate your account at any time by contacting us. If you deactivate your account, 
                you will still be responsible for any outstanding payments or obligations.
              </p>
            </section>

            {/* 10. Disclaimers and Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">10. Disclaimers and Limitation of Liability</h2>
              <p className="text-gray-800 mb-4">
                The Platform is provided "as is" and without any warranty or guarantee of any kind, 
                either express or implied.
              </p>
              <p className="text-gray-800 mb-4">
                We do not guarantee that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>The Platform will always be available or error-free</li>
                <li>We warrant the quality, accuracy, or suitability of the services provided by users</li>
              </ul>
              <p className="text-gray-800">
                To the maximum extent permitted by law, we disclaim all liability for any damages arising 
                from the use or inability to use the Platform.
              </p>
            </section>

            {/* 11. Indemnification */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">11. Indemnification</h2>
              <p className="text-gray-800">
                You agree to indemnify and hold harmless Ahupa Business Network Ltd, its officers, directors, 
                employees, and agents from any claims, liabilities, damages, or expenses (including legal fees) 
                arising out of your use of the Platform or violation of these Terms.
              </p>
            </section>

            {/* 12. Governing Law and Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">12. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-800 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of Rwanda.
              </p>
              <p className="text-gray-800">
                Any disputes arising under or in connection with these Terms shall be resolved through 
                binding arbitration or, if necessary, through the courts of Rwanda.
              </p>
            </section>

            {/* 13. Amendments to These Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">13. Amendments to These Terms</h2>
              <p className="text-gray-800">
                We reserve the right to modify or update these Terms at any time. Any changes will be posted 
                on this page with an updated effective date. By continuing to use the Platform after such changes, 
                you agree to be bound by the revised Terms.
              </p>
            </section>

            {/* 14. Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">14. Privacy Policy</h2>
              <p className="text-gray-800">
                Your use of the Platform is also governed by our Privacy Policy, which can be found on our 
                website www.topinfo.rw
              </p>
            </section>

            {/* 15. Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">15. Contact Us</h2>
              <div className="bg-sky-50 p-4 rounded-lg">
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

export default TermsOfService;