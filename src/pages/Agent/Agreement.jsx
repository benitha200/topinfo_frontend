import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check, Download, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import HTML2Canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import AgentLayout from './AgentLayout';
import esignature from './../../assets/img/esignature.png';
import API_URL from '../../constants/Constants';

const Agreement = () => {
    const [loading, setLoading] = useState(true);
    const [agreed, setAgreed] = useState(false);
    const [nationalId, setNationalId] = useState('');
    const [idError, setIdError] = useState('');
    const [signedDetails, setSignedDetails] = useState(null);
    const today = new Date().toLocaleDateString();
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const userId = parseInt(user?.id);

    useEffect(() => {
        checkExistingAgreement();
    }, []);

    const checkExistingAgreement = async () => {
        try {
            const response = await fetch(`${API_URL}/agreements/user/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setSignedDetails(data);
                    setAgreed(true);
                }
            }
        } catch (error) {
            console.error('Error checking agreement:', error);
        } finally {
            setLoading(false);
        }
    };

    const validateNationalId = (id) => {
        const idRegex = /^\d{16}$/;
        return idRegex.test(id);
    };

    const handleAgree = async () => {
        if (!validateNationalId(nationalId)) {
            setIdError('Please enter a valid 16-digit National ID number');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/agreements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    userId: user.id,
                    nationalId,
                    agreementDate: new Date().toISOString(),
                    userDetails: {
                        name: `${user.firstname} ${user.lastname}`,
                        email: user.email,
                        phone: user.phone,
                        district: user.location_district,
                        sector: user.location_sector
                    }
                })
            });

            if (response.ok) {
                const data = await response.json();
                setSignedDetails(data.agreement);
                setAgreed(true);
                setIdError('');
            } else {
                throw new Error('Failed to save agreement');
            }
        } catch (error) {
            setIdError('Failed to process agreement. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        const content = document.querySelector('.prose');
        if (!content) return;

        try {
            // Create a temporary container for the content we want to capture
            const tempContainer = document.createElement('div');
            
            // Add the title at the top
            const titleDiv = document.createElement('div');
            titleDiv.innerHTML = `
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="font-size: 24px; font-weight: bold; color: #000;">
                        Memorandum of Understanding (MOU)
                    </h1>
                </div>
            `;
            
            // Add the title and the original content
            tempContainer.appendChild(titleDiv);
            tempContainer.innerHTML += content.innerHTML;
            tempContainer.style.padding = '5px';
            tempContainer.style.width = '850px';
            document.body.appendChild(tempContainer);

            const canvas = await HTML2Canvas(tempContainer, {
                scale: 2,
                useCORS: true,
                logging: false,
            });

            document.body.removeChild(tempContainer);

            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF('p', 'px', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;

            pdf.addImage(
                imgData, 
                'JPEG', 
                imgX, 
                imgY, 
                imgWidth * ratio, 
                imgHeight * ratio
            );

            // Generate filename with user name and date
            const userName = `${user.firstname || 'Agent'}_${user.lastname || ''}`.replace(/\s+/g, '_');
            const date = new Date().toISOString().split('T')[0];
            const filename = `Memorandum_of_Understanding_MOU_${userName}_${date}.pdf`;

            pdf.save(filename);
        } catch (error) {
            console.error('Error generating PDF:', error);
            // You might want to show an error message to the user here
        }
    };



    const SignatureSection = () => {
        if (loading) {
            return <div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;
        }

        if (agreed && signedDetails) {
            return (
                <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center mb-2">
                        <Check className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-green-600 font-medium">Agreement Signed Electronically</span>
                    </div>
                    <p>National ID: {signedDetails.nationalId}</p>
                    <p>Signed Date: {new Date(signedDetails.signedAt).toLocaleDateString()}</p>
                </div>
            );
        }

        return (
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                    National ID Number (16 digits)
                </label>
                <Input
                    type="text"
                    value={nationalId}
                    onChange={(e) => {
                        setNationalId(e.target.value);
                        setIdError('');
                    }}
                    className="mt-1"
                    placeholder="Enter your 16-digit National ID"
                    maxLength={16}
                />
                {idError && (
                    <p className="text-red-500 text-sm mt-1">{idError}</p>
                )}
            </div>
        );
    };

    return (
        <AgentLayout>
            <div className="p-6 space-y-6 max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Memorandum of Understanding (MOU)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="prose max-w-none">
                            <div className="text-sm space-y-4">
                                <p>This Memorandum of Understanding (MOU) is made and entered into on this {today}, by and between:</p>

                                <div className="space-y-2">
                                    <p className="font-semibold">Agent of TopInfo.rw</p>
                                    <p>Address: District: {user.location_district || '_____'}</p>
                                    <p>Sector: {user.location_sector || '_____'}</p>
                                    <p>Email: {user.email || '_____'}</p>
                                    <p>Phone no: {user.phone || '_____'}</p>
                                    <p>(Hereinafter referred to as the "Agent")</p>
                                </div>

                                <div className="space-y-2">
                                    <p className="font-semibold">AND</p>
                                    <p className="font-semibold">Management of Ahupa Business Network Ltd (Owner of TopInfo.rw)</p>
                                    <p>Represented by CEO Ahmed Uwera Pacifique</p>
                                    <p>Headquarters: Beatitude House, 4th Floor</p>
                                    <p>Email: topinforwanda@gmail.com</p>
                                    <p>(Hereinafter referred to as "Ahupa")</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold">1. Purpose</h3>
                                    <p>This MOU sets forth the agreement between the Agent and Ahupa Business Network Ltd for the promotion, marketing, and business development related to the TopInfo.rw platform, with the Agent being compensated on a commission basis as detailed herein.</p>

                                    <h3 className="font-bold">2. Scope of Cooperation</h3>
                                    <ul className="list-disc pl-6">
                                        <li>The Agent will actively promote and market Ahupa's services and products on the TopInfo.rw platform.</li>
                                        <li>The Agent will generate leads and secure new clients for Ahupa.</li>
                                        <li>Both parties will collaborate in creating and implementing effective marketing campaigns.</li>
                                    </ul>

                                    <h3 className="font-bold">3. Terms and Conditions</h3>
                                    <div className="pl-4">
                                        <p className="font-semibold">Duration:</p>
                                        <p>This MOU is effective from the date of signing for an initial period of 12 months and may be extended by mutual written consent.</p>

                                        <p className="font-semibold mt-2">Commission Structure:</p>
                                        <p>The Agent will receive a 15% commission on the net revenue generated from new clients brought by the Agent.</p>

                                        <p className="font-semibold mt-2">Payment Terms:</p>
                                        <p>Payments to the Agent will be made monthly, within 7 days after the end of each month.</p>
                                    </div>

                                    <h3 className="font-bold">4. Responsibilities</h3>
                                    <div className="pl-4">
                                        <p className="font-semibold">The Agent shall:</p>
                                        <ul className="list-disc pl-6">
                                            <li>Maintain professional conduct and represent Ahupa's interests with integrity</li>
                                            <li>Regularly report on marketing activities and client interactions</li>
                                            <li>Protect confidential information related to Ahupa's business operations</li>
                                            <li>Comply with all applicable laws and regulations</li>
                                        </ul>

                                        <p className="font-semibold mt-2">Ahupa shall:</p>
                                        <ul className="list-disc pl-6">
                                            <li>Provide necessary training and marketing materials</li>
                                            <li>Process commission payments in a timely manner</li>
                                            <li>Maintain transparent communication regarding business operations</li>
                                            <li>Provide technical support when needed</li>
                                        </ul>
                                    </div>

                                    <h3 className="font-bold">5. Termination</h3>
                                    <div className="pl-4">
                                        <p>This MOU may be terminated under the following conditions:</p>
                                        <ul className="list-disc pl-6">
                                            <li>By mutual written agreement between both parties</li>
                                            <li>With 30 days written notice by either party</li>
                                            <li>Immediately for breach of confidentiality or professional conduct</li>
                                        </ul>
                                        <p className="mt-2">Upon termination, all pending commissions will be settled within 30 days.</p>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">For the Agent of TopInfo.rw</p>
                                            <p>Name: {`${user.firstname || '___'} ${user.lastname || '___'}`}</p>
                                            {/* <p>Date: {today}</p> */}
                                            <SignatureSection />
                                        </div>
                                        <div>
                                            <p className="font-semibold">For Ahupa Business Network Ltd</p>
                                            <p>Ahmed Uwera Pacifique</p>
                                            <p>CEO</p>
                                            <img src={esignature} alt="CEO Signature" className="w-64" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center border-t pt-4 mt-6">
                                    <button
                                        className="flex items-center px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
                                        onClick={handleDownload}
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download PDF
                                    </button>

                                    <button
                                        className="flex items-center px-6 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 disabled:opacity-50"
                                        onClick={handleAgree}
                                        disabled={loading || !nationalId}
                                    >
                                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                        Sign Agreement
                                    </button>

                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AgentLayout>
    );
};

export default Agreement;