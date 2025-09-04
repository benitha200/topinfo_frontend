import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gift, ChevronRight, CheckCircle, Award, ArrowRight,
  ShoppingBag, Globe, Star, CreditCard, Percent, Users, Shield
} from 'lucide-react';
import JoinMembershipPage from './JoinMembershipPage';

const DiscountClub = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('benefits');
  const navigate=useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const goToDashboard = () => {
        navigate('/discount-club/join');
    };

  return (
    <>
      <Helmet>
        <title>TopInfo Membership Club | Izere ibiciro bidasanzwe mu Rwanda</title>
        <meta name="description" content="Jyamo muri TopInfo Membership Club ubone discounts nyinshi ku baserivisi n'ibicuruzwa mu Rwanda. Save more than you pay!" />
        <meta property="og:title" content="TopInfo Rwanda - Membership Club" />
        <meta property="og:description" content="Jyamo muri TopInfo Membership Club ubone discounts nyinshi ku baserivisi n'ibicuruzwa mu Rwanda." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-600 via-slate-500 to-slate-400 overflow-hidden py-32">
          {/* Animated gradient blob */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

          {/* Content container with fade-in animation */}
          <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                TopInfo <span className="text-slate-100">Membership Club</span>
              </h1>
              <p className="text-2xl text-slate-100 mb-10 max-w-4xl mx-auto">
                "Save more than you pay!" — Izere ibiciro bidasanzwe ku baserivisi n'ibicuruzwa mu Rwanda!
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  to="/discount-club/join"
                  className="px-10 py-5 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group transform hover:scale-105"
                >
                  Jyamo Nonaha
                  <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
                </Link>
                {/* <Link
                  to="/discount-club/featured-deals"
                  className="px-10 py-5 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group transform hover:scale-105"
                >
                  Reba Discounts
                  <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
                </Link> */}
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Kuki ukwiye kuba  Umunyamuryango wa TopInfo Membership Club?</h2>
              <p className="text-xl text-gray-600 mb-8">
                TopInfo Membership Club iratanga agaciro kerekeye amafaranga wakoresheje mu buryo buri hejuru. Nk'umunyamuryango, urashobora kubona discounts nyinshi ku bicuruzwa na serivisi zitandukanye mu Rwanda.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1">
                    <Percent className="text-slate-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Kugabanyirizwa Igiciro</h3>
                    <p className="text-gray-600">Kubona discounts zihambaye ku mashopping, amashuri, ibigo nderabuzima, amahoteli n'ibindi...</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1">
                    <Gift className="text-slate-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Impano Zidasanzwe</h3>
                    <p className="text-gray-600">Uhabwa impano zidasanzwe ku mabuki n'amatariki adasanzwe y'umunyamuryango</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1">
                    <ShoppingBag className="text-slate-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Amakuru y'Ibanze</h3>
                    <p className="text-gray-600">Uhabwa Amakuru y'ibanze ku bicuruzwa bishya, discounts zidasanzwe n'ibindi</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1">
                    <Users className="text-slate-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Itsinda Ry'Abanyamuryango</h3>
                    <p className="text-gray-600">Kuba mu itsinda ry'abanyamuryango ba TopInfo ukagira access ku bitandukanye</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-50 rounded-2xl p-10 shadow-lg transform hover:rotate-1 transition-all duration-500 hover:shadow-xl">
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-inner flex flex-col items-center">
                <div className="bg-slate-100 p-4 rounded-full mb-6 shadow-md">
                  <Gift className="text-slate-600" size={64} />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">Kugura Bike, Ubona Byinshi</h3>
                <p className="text-center text-gray-600 mb-6">
                  Jyamo muri TopInfo Membership Club maze ubone agaciro ku mafaranga yawe karengeje ikiguzi cy'umunyamuryango!
                </p>
                {/* <Link to="/discount-club/testimonials" className="px-6 py-3 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 font-medium flex items-center shadow-md hover:shadow-lg">
                  Ibyo abanyamuryango bavuga
                  <ArrowRight className="ml-2" size={18} />
                </Link> */}
              </div>
            </div>
          </div>
        </div>

        {/* Membership Tabs Section */}
        <div className="bg-gradient-to-l from-slate-50 to-slate-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
             
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Amabwiriza y'Ubunyamuryango</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hitamo ubwoko bw'ubunyamuryango buhwanye n'icyo ukeneye
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'benefits' ? 'bg-slate-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Akamaro
              </button>
              <button
                onClick={() => setActiveTab('how-it-works')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'how-it-works' ? 'bg-slate-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Uko Bikorwa
              </button>
              <button
                onClick={() => setActiveTab('partners')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'partners' ? 'bg-slate-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Abafatanyabikorwa
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              {activeTab === 'benefits' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Akamaro ko kuba Umunyamuryango</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-1" size={20} />
                        <p className="text-gray-600">Discounts ziri hagati ya 10% na 50% ku baserivisi n'ibicuruzwa binyuranye</p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-1" size={20} />
                        <p className="text-gray-600">Ikarita y'umunyamuryango igendanwa kuri telefone yawe</p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-1" size={20} />
                        <p className="text-gray-600">Coupons z'inyongera ku banyamuryango ba Gold, Platinum na Diamond</p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-1" size={20} />
                        <p className="text-gray-600">Amakuru y'ibanze ku bicuruzwa n'ibikorwa bishya</p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-1" size={20} />
                        <p className="text-gray-600">Kugira access ku itsinda ry'abanyamuryango bari kuri WhatsApp</p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-1" size={20} />
                        <p className="text-gray-600">Impano zidasanzwe ku mabuki y'umunyamuryango</p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Akamaro Gatandukanye</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-slate-600 flex items-center mb-2">
                          <Award size={18} className="mr-2" /> Silver
                        </h4>
                        <p className="text-gray-600 ml-7">Serivisi za Basic, Digital Member Card na coupons z'ibanze</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-yellow-600 flex items-center mb-2">
                          <Award size={18} className="mr-2" /> Gold
                        </h4>
                        <p className="text-gray-600 ml-7">Serivisi zose, coupons z'inyongera n'itsinda ry'abanyamuryango</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-700 flex items-center mb-2">
                          <Award size={18} className="mr-2" /> Platinum
                        </h4>
                        <p className="text-gray-600 ml-7">Serivisi zidasanzwe, Amakuru y'ibanze, n'ubufasha bw'umwihariko</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-600 flex items-center mb-2">
                          <Award size={18} className="mr-2" /> Diamond
                        </h4>
                        <p className="text-gray-600 ml-7">Byose byavuzwe haruguru + serivisi za VIP, impano zidasanzwe n'Amakuru yose</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'how-it-works' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Uko Bikorwa</h3>
                    <ol className="space-y-8">
                      <li className="flex">
                        <div className="bg-slate-100 rounded-full h-8 w-8 flex items-center justify-center text-slate-600 font-bold mr-4 flex-shrink-0 mt-1">1</div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Hitamo Ubunyamuryango</h4>
                          <p className="text-gray-600">Hitamo ubwoko bwo kuba umunyamuryango uhwanye nicyo ukeneye: Silver, Gold, Platinum cyangwa Diamond</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="bg-slate-100 rounded-full h-8 w-8 flex items-center justify-center text-slate-600 font-bold mr-4 flex-shrink-0 mt-1">2</div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Iyandikishe</h4>
                          <p className="text-gray-600">Uzuza amakuru yawe kandi wishyure hakoreshejwe MTN MoMo, Airtel Money cyangwa Visa/Mastercard</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="bg-slate-100 rounded-full h-8 w-8 flex items-center justify-center text-slate-600 font-bold mr-4 flex-shrink-0 mt-1">3</div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Akira Ikarita Yawe</h4>
                          <p className="text-gray-600">Uhita uhabwa ikarita yawe y'umunyamuryango kuri telefone yawe mu kanya gato</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="bg-slate-100 rounded-full h-8 w-8 flex items-center justify-center text-slate-600 font-bold mr-4 flex-shrink-0 mt-1">4</div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Koresha Discounts</h4>
                          <p className="text-gray-600">Ereka ikarita yawe mu bigo bifatanyije na TopInfo kugirango ubone discounts</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Ingaruka ku Mafaranga Yawe</h3>
                    <p className="text-gray-600 mb-6">Dore urugero rw'akamaro k'amafaranga wakoresheje mu kwiyandikisha:</p>

                    <div className="space-y-6">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-bold text-slate-600 mb-2">Urugero rw'umunyamuryango wa Silver:</h4>
                        <ul className="space-y-2 ml-6 list-disc text-gray-600">
                          <li>Kwiyandikisha: 10,000 RWF</li>
                          <li>Discount kuri Gym: 5,000 RWF</li>
                          <li>Discount ku ifunguro: 8,000 RWF</li>
                          <li><span className="font-bold">Agaciro wavana muri membership</span>: 13,000 RWF</li>
                          <li><span className="font-bold text-green-600">Inyungu</span>: +3,000 RWF</li>
                        </ul>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-bold text-yellow-600 mb-2">Urugero rw'umunyamuryango wa Diamond:</h4>
                        <ul className="space-y-2 ml-6 list-disc text-gray-600">
                          <li>Kwiyandikisha: 140,000 RWF</li>
                          <li>Discount kuri Gym (umwaka): 60,000 RWF</li>
                          <li>Discount ku mashuri: 80,000 RWF</li>
                          <li>Discount ku ifunguro: 96,000 RWF</li>
                          <li>Impano zidasanzwe: 40,000 RWF</li>
                          <li><span className="font-bold">Agaciro wavana muri membership</span>: 276,000 RWF</li>
                          <li><span className="font-bold text-green-600">Inyungu</span>: +136,000 RWF</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'partners' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Abafatanyabikorwa ba TopInfo Membership Club</h3>
                  <p className="text-gray-600 mb-8">Dukora n'abafatanyabikorwa benshi mu Rwanda kugirango tubahe discounts zihambaye. Dore bamwe muri bo:</p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="bg-slate-100 p-2 rounded-full mr-3">
                          <ShoppingBag size={24} className="text-slate-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Ishopping & Imyambaro</h4>
                      </div>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Fashion City (10-20%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Kigali Boutique (15%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Smart Electronics (10%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Rwanda Crafts Market (20%)
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="bg-slate-100 p-2 rounded-full mr-3">
                          <Users size={24} className="text-slate-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Amashuri & Amahugurwa</h4>
                      </div>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Tech Academy (25%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Language Center (30%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Driving School (15%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Business Skills Hub (20%)
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="bg-slate-100 p-2 rounded-full mr-3">
                          <Star size={24} className="text-slate-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Amahoteli & Resitora</h4>
                      </div>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Urban Lodge (15%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Pizza World (Buy 1 Get 1)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Coffee Haven (20%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Sunset Resort (25%)
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="bg-slate-100 p-2 rounded-full mr-3">
                          <Shield size={24} className="text-slate-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Ubuzima & Wellness</h4>
                      </div>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          FitZone Gym (20%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          City Clinic (30%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Spa Retreat (25%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Dental Care (15%)
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="bg-slate-100 p-2 rounded-full mr-3">
                          <Globe size={24} className="text-slate-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Urugendo & Amatembere</h4>
                      </div>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Safari Tours (15%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Car Rental (20%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Lake Resort (10%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Hiking Adventure (25%)
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="bg-slate-100 p-2 rounded-full mr-3">
                          <Percent size={24} className="text-slate-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Ibindi Binyuranye</h4>
                      </div>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Home Services (15%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Event Photography (20%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Printing Services (25%)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Beauty Salon (15%)
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="text-center mt-10">
                    <p className="text-gray-600 mb-6">Urutonde rwuzuye rw'abafatanyabikorwa na discounts rwaboneka ku banyamuryango biyandikishije</p>
                    <Link
                      to="/discount-club/all-partners"
                      className="inline-flex items-center px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-300 font-medium"
                    >
                      Reba Urutonde Rwose
                      <ChevronRight size={20} className="ml-2" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <button
          onClick={goToDashboard}
          className="py-3 px-6 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
        >
          Hitamo Icyiciro
          <ArrowRight className="ml-2" size={18} />
        </button> */}
        {/* Testimonials Section */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ibyo Abanyamuryango Bavuga</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Reba icyo abandi banyamuryango bavuga kuri TopInfo Membership Club
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star size={18} className="fill-current" />
                    <Star size={18} className="fill-current" />
                    <Star size={18} className="fill-current" />
                    <Star size={18} className="fill-current" />
                    <Star size={18} className="fill-current" />
                  </div>
                  <p className="ml-2 text-gray-600 font-bold">5.0</p>
                </div>
                <p className="text-gray-700 mb-6">
                  "Ntakintu cyiza nko kubona discount ya 30% kuri gym y'inzobere muri Kigali gusa kubera ikarita ya TopInfo! Ndizera ko nasubize amafaranga nishyuye mu kwiyandikisha mu minsi 10 gusa."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600">JM</div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900">Jean-Marie K.</p>
                    <p className="text-gray-500 text-sm">Silver Member, 3 Months</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star size={18} className="fill-current" />
                    <Star size={18} className="fill-current" />
                    <Star size={18} className="fill-current" />
                    <Star size={18} className="fill-current" />
                    <Star size={18} className="fill-current" />
                  </div>
                  <p className="ml-2 text-gray-600 font-bold">5.0</p>
                </div>
                <p className="text-gray-700 mb-6">
                  "Nk'umunyamuryango wa Gold, narakoresheje ikarita yanjye muri restaurants hafi ya 10 zitandukanye mu kwezi gushize. Kuba naranakuye discounts ku mashuri y'indimi, binteye kwizera ko nzasubizwa amafaranga mu gihe gito."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600">DI</div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900">Divine I.</p>
                    <p className="text-gray-500 text-sm">Gold Member, 6 Months</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star size={18} className="fill-current" />
                    <Star size={18} className="fill-current" />
                    <Star size={18} className="fill-current" />
                    <Star size={18} className="fill-current" />
                    <Star size={18} className="fill-current" />
                  </div>
                  <p className="ml-2 text-gray-600 font-bold">5.0</p>
                </div>
                <p className="text-gray-700 mb-6">
                  "Kuba umunyamuryango wa Diamond yambereye umunezero ukomeye. Nakoresheje ikarita yanjye ahantu hafi ya 25 mu mezi 2 gusa, kandi nasubijwe amafaranga yarenze ikiguzi cyo kwiyandikisha. Ni ubwoko bw'ishoramari ridasanzwe."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600">EM</div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900">Emmanuel M.</p>
                    <p className="text-gray-500 text-sm">Diamond Member, 2 Months</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              {/* <Link
                to="/discount-club/testimonials"
                className="inline-flex items-center px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-300 font-medium"
              >
                Reba Testimone Zose
                <ChevronRight size={20} className="ml-2" />
              </Link> */}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ibibazo Bibazwa Kenshi</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dore ibisubizo ku bibazo tubazwa kenshi ku byerekeye TopInfo Membership Club
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Nigute nakoresha ikarita y'ubunyamuryango?</h3>
                <p className="text-gray-600">
                  Ugeze ahantu hafatanyije na TopInfo, ereka ikarita yawe igendanwa kuri telefone. Abakozi bazayibona bakanaguha discount yateganyijwe. Kugenzura ko werekanye ikarita mbere yo kwishyura.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ubunyamuryango bumara igihe kingana iki?</h3>
                <p className="text-gray-600">
                  Ubunyamuryango bumara umwaka 1 kandi bushobora kongerwa igihe kirangiye. Tuzakoherereza menya igihe amezi 2 asigaye ngo ubunyamuryango bwawe burangire, kugirango ushobore kwongera.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ese ikarita imwe irashobora gukoreshwa n'abantu benshi?</h3>
                <p className="text-gray-600">
                  Oya, ikarita yawe y'ubunyamuryango ni iyawe bwite kandi igomba gukoreshwa nawe gusa. Ikarita ifite izina ryawe n'ifoto yawe, kandi ntishobora gukopororwa cyangwa guhabwa undi.
                </p>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ese discounts zose zikoreshwa rimwe?</h3>
                <p className="text-gray-600">
                  Oya, urashobora gukoresha discounts zawe kenshi uko ubishatse mu gihe cyose ikarita yawe ikora. Ariko, zimwe mu coupons zidasanzwe zishobora kuba zifite igihe ntarengwa.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Nigute nashobora kwiyandikisha?</h3>
                <p className="text-gray-600">
                  Kwiyandikisha ni igikorwa cyoroshye. Kanda kuri "Iyandikishe Ubu" ku bwoko bw'ubunyamuryango wifuza, uzuza amakuru yawe, ishyura hakoreshejwe MTN MoMo, Airtel Money cyangwa ikarita yawe ya banki. Ushobora kwiyandikisha wenyine, ukoresha website yacu cyangwa ugahamagara 0788 XXX XXX.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ese abafatanyabikorwa banyu bari mu Rwanda hose?</h3>
                <p className="text-gray-600">
                  Dufite abafatanyabikorwa benshi mu Rwanda hose, ariko igice kinini kiri mu mujyi wa Kigali. Turi gukora cyane kugirango twongere umubare w'abafatanyabikorwa mu mijyi n'uturere twose tw'igihugu.
                </p>
              </div>
            </div>
          </div>

          
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-l from-slate-600 to-slate-700 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Jyamo Nonaha!</h2>
            <p className="text-xl text-slate-100 mb-10 max-w-3xl mx-auto">
              Ntacyo utegereje! Jyamo muri TopInfo Membership Club uyu munsi ubone discounts zihambaye mu Rwanda hose!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/discount-club/join"
                className="px-10 py-5 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center"
              >
                Iyandikishe Nonaha
                <ArrowRight className="ml-3" size={24} />
              </Link>
              <Link
                to="/discount-club/learn-more"
                className="px-10 py-5 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center"
              >
                Menya Byinshi
                <ArrowRight className="ml-3" size={24} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
export default DiscountClub