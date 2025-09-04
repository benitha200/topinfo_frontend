import React, { useState } from 'react';
import { Globe, Network, Target, Users } from 'lucide-react';

const AboutUs = () => {
    const [language, setLanguage] = useState('kinyarwanda');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Language Toggle */}


            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="top-0 z-50 bg-gray-50">
                    <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-end items-center">
                        <div className="rounded-full p-1 flex items-center">
                            <button
                                onClick={() => setLanguage('english')}
                                className={`px-4 py-2 rounded-full transition-all ${language === 'english'
                                        ? 'bg-slate-500 text-white'
                                        : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => setLanguage('kinyarwanda')}
                                className={`px-4 py-2 rounded-full transition-all ${language === 'kinyarwanda'
                                        ? 'bg-slate-500 text-white'
                                        : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                Kinyarwanda
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {language === 'english' ? 'About TopInfo.rw' : 'Abo turibo mu TopInfo.rw'}
                    </h1>
                    <p className="text-xl text-gray-600">
                        {language === 'english'
                            ? 'Connecting Rwandan Professionals, Empowering Services'
                            : 'Guhuza Abanyamwuga n\' abakeneye serivisi batanga'}
                    </p>
                </div>

                {/* Content Sections */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Company Overview */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="flex items-center mb-6">
                            <Network className="text-slate-600 mr-4" size={40} />
                            <h2 className="text-2xl font-bold text-gray-900">
                                {language === 'english' ? 'Who We Are' : 'Abo Turibo'}
                            </h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            {language === 'english'
                                ? 'TopInfo.rw, operated by Ahupa Business Network Ltd, is a dynamic online platform dedicated to connecting clients with professional service providers across various sectors in Rwanda. Our mission is to facilitate quick and efficient access to expertise in fields such as justice, technology, health, transport, and many others.'
                                : 'TopInfo.rw, ni ishami rya Ahupa Business Network Ltd, ni urubuga rw\'ikoranabuhanga rushya rugamije guhuza abakiriya n\'abatanga serivisi z\'umwuga mu nzego zitandukanye mu Rwanda. Intego yacu ni ugufasha kubona byihuse no mu buryo bwiza ubuhanga mu byiciro nka ubutabera, ikoranabuhanga, ubuzima, gutwara abantu n\'ibintu, n\'izindi serivisi nyinshi zitandukanye.'}
                        </p>
                    </div>

                    {/* Mission Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="flex items-center mb-6">
                            <Target className="text-slate-600 mr-4" size={40} />
                            <h2 className="text-2xl font-bold text-gray-900">
                                {language === 'english' ? 'Our Mission' : 'Intego Yacu'}
                            </h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            {language === 'english'
                                ? 'Understanding the diverse needs of our community, TopInfo.rw serves as a comprehensive resource for individuals and businesses seeking reliable professional services. Our user-friendly platform allows clients to easily find and connect with qualified providers, ensuring they receive the support they need in a timely manner.'
                                : 'Dukora kugira ngo twumve ibyifuzo bitandukanye by\'abatugana, TopInfo.rw ikora nk\'urubuga rwihariye ku bantu n\'ibigo bifuza serivisi z\'umwuga zizewe. Urubuga rwacu rworoshye gukoresha rutuma abakiriya babasha kubona no guhuzwa n\'abatanga serivisi bemewe, bityo bakabona ubufasha bakeneye mu gihe gikwiye.'}
                        </p>
                    </div>
                </div>

                {/* Vision Section */}
                <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
                    <div className="flex items-center mb-6">
                        <Users className="text-slate-600 mr-4" size={40} />
                        <h2 className="text-2xl font-bold text-gray-900">
                            {language === 'english' ? 'Our Vision' : 'Uruhare Rwacu'}
                        </h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        {language === 'english'
                            ? 'We are committed to promoting efficiency and collaboration within Rwanda\'s professional landscape. By bridging the gap between clients and service providers, we contribute to the growth and development of our economy.'
                            : 'Twiyemeje guteza imbere ubushobozi n\'ubufatanye mu rwego rw\'ubunyamwuga mu Rwanda. Duhuza abakiriya n\'abatanga serivisi, tugira uruhare mu iterambere n\'izamuka ry\'ubukungu bwacu.'}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default AboutUs;