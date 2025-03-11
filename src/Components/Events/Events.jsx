import React, { useState } from 'react';
import semi from "../../assets/Blood/blood 3.jpg";
import { FaArrowDown } from 'react-icons/fa';

// Hero Section Component
const HeroSection = () => {
    return (
        <div className="bg-blue-50 py-20">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl font-bold text-[#078d83] mb-4">Explore Our Events</h1>
                <p className="text-xl text-gray-600">Join our seminars, conferences, and other exciting events to enhance your knowledge and skills.</p>
            </div>
        </div>
    );
};

// Stylish Line Under Section Header
const SectionHeader = ({ title }) => {
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">{title}</h1>
            <div className="flex items-center justify-center mt-4">
                <div className="w-25 h-1 bg-[#078d83]"></div>
                <FaArrowDown className="text-[#078d83] mx-2 animate-bounce" />
                <div className="w-25 h-1 bg-[#078d83]"></div>
            </div>
        </div>
    );
};

// Seminar Component
const Seminars = ({ seminars, openModal }) => {
    return (
        <section className="container mx-auto px-16 py-12">
            <SectionHeader title="Career Guideline Seminar" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seminars.map((seminar) => (
                    <div key={seminar.id} className="relative overflow-hidden rounded-lg shadow-lg group">
                        <img src={seminar.image} alt={seminar.title} className="w-full h-64 object-cover" />

                        {/* Animated Content */}
                        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                            <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <h2 className="text-black text-2xl font-bold">{seminar.title}</h2>
                                <p className="text-black">{seminar.location}</p>
                                <button onClick={() => openModal('seminar', seminar)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Conference Component
const Conferences = ({ conferences, openModal }) => {
    return (
        <section className="container mx-auto px-16 py-12 bg-blue-50">
            <SectionHeader title="Annual Conference" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {conferences.map((conference) => (
                    <div key={conference.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <img src={conference.image} alt={conference.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">{conference.title}</h2>
                            <p className="text-gray-600 mb-2"><strong>Year:</strong> {conference.year}</p>
                            <p className="text-gray-600 mb-2"><strong>Speaker:</strong> {conference.speaker}</p>
                            <p className="text-gray-600 mb-4"><strong>Schedule:</strong> {conference.schedule}</p>
                            <button onClick={() => openModal('conference', conference)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Competition Component
const Competitions = ({ competitions, openModal }) => {
    return (
        <section className="container mx-auto px-16 py-12">
            <SectionHeader title="General Knowledge Competitions" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {competitions.map((competition) => (
                    <div key={competition.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <img src={competition.image} alt={competition.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">{competition.title}</h2>
                            <p className="text-gray-600 mb-2">{competition.date}</p>
                            <button onClick={() => openModal('competition', competition)} className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Modal Component for Different Event Types
const Modal = ({ isOpen, onClose, type, selectedEvent }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 modal-overlay backdrop-filter backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white p-8 rounded-lg w-11/12 md:w-1/2 lg:w-1/2 transform transition-all duration-300 ease-in-out shadow-2xl shadow-green-500 overflow-y-auto max-h-[70vh]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6 bg-green-400 rounded-lg p-2">
                    <h2 className="text-2xl font-bold">{selectedEvent?.title}</h2>
                    <button onClick={onClose} className="text-green-900 hover:text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Seminar Modal Content */}
                {type === 'seminar' && (
                    <>
                        <p className="text-gray-600 mb-2"><strong>Date:</strong> {selectedEvent?.date}</p>
                        <p className="text-gray-600 mb-2"><strong>Speaker:</strong> {selectedEvent?.speaker}</p>
                        <p className="text-gray-600 mb-2"><strong>Schedule:</strong> {selectedEvent?.schedule}</p>
                        <p className="text-gray-600 mb-2"><strong>Location:</strong> {selectedEvent?.location}</p>
                        <img src={selectedEvent?.image} alt={selectedEvent?.title} className="rounded-lg shadow-lg w-full h-48 object-cover mb-4" />
                        <p className="text-gray-700 mb-4 text-justify">{selectedEvent?.details}</p>
                    </>
                )}

                {/* Conference Modal Content */}
                {type === 'conference' && (
                    <>
                        <p className="text-gray-600 mb-2"><strong>Year:</strong> {selectedEvent?.year}</p>
                        <p className="text-gray-600 mb-2"><strong>Speaker:</strong> {selectedEvent?.speaker}</p>
                        <p className="text-gray-600 mb-2"><strong>Schedule:</strong> {selectedEvent?.schedule}</p>
                        <img src={selectedEvent?.image} alt={selectedEvent?.title} className="rounded-lg shadow-lg w-full h-48 object-cover mb-4" />
                        <p className="text-gray-700 mb-4 text-justify">{selectedEvent?.details}</p>
                    </>
                )}

                {/* Competition Modal Content */}
                {type === 'competition' && (
                    <>
                        <p className="text-gray-600 mb-2"><strong>Date:</strong> {selectedEvent?.date}</p>
                        <p className="text-gray-600 mb-2"><strong>Prize:</strong> {selectedEvent?.prize}</p>
                        <p className="text-gray-600 mb-2"><strong>Rules:</strong> {selectedEvent?.rules}</p>
                        <img src={selectedEvent?.image} alt={selectedEvent?.title} className="rounded-lg shadow-lg w-full h-48 object-cover mb-4" />
                        <p className="text-gray-700 mb-4 text-justify">{selectedEvent?.details}</p>
                    </>
                )}
            </div>
        </div>
    );
};

// Main Component
const CareerSeminars = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    const seminars = [
        {
            id: 1,
            title: "Career Pathway After SSC",
            date: "2025-01-20",
            image: semi,
            details: "The Dreamers Team went Samonta Secondary School to meet the student of this school and organize a career guideline seminar title 'Career Pathway After SSC'...",
            speaker: "Saklain Mustak",
            schedule: "12:00 PM - 2:00 PM",
            location: "Samonta Secondary School"
        },
        {
            id: 2,
            title: "Career Pathway After SSC",
            date: "2025-01-20",
            image: semi,
            details: "The Dreamers Team went Alhaz Mofiz Uddin Academy to meet the student of this school and organize a career guideline seminar title 'Career Pathway After SSC'...",
            speaker: "Saklain Mustak",
            schedule: "10:00 AM - 12:00 PM",
            location: "Alhaz Mofiz Uddin Academy"
        },
        {
            id: 3,
            title: "Career Pathway After SSC",
            date: "2023-01-20",
            image: semi,
            details: "The Dreamers Team went Alhaz Mofiz Uddin Academy to meet the student of this school and organize a career guideline seminar title 'Career Pathway After SSC'...",
            speaker: "Yeasin Arafat",
            schedule: "10:00 AM - 12:00 PM",
            location: "Jinnahnagar Secondary School"
        },
        // Add more seminars here
    ];

    const conferences = [
        {
            id: 1,
            year: "2024",
            title: "The Dreamers Annual Conference 2024",
            image: semi,
            details: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore odio tempore est veniam, aperiam ratione quo blanditiis voluptatibus nemo pariatur, consectetur illo repellat ab adipisci culpa nobis eum. Ducimus ipsa temporibus vitae sint alias perspiciatis amet ullam rerum repudiandae ab necessitatibus corporis veniam nobis suscipit, obcaecati dicta eveniet neque dignissimos. Itaque ipsam illo quia suscipit neque veniam voluptate totam doloribus sunt repudiandae, ratione accusantium eius alias sequi dolorum necessitatibus voluptas et, temporibus excepturi, saepe cum magni! Dignissimos praesentium, vel veniam vitae consequuntur maxime doloribus, officiis similique accusantium eos tempora. Quidem ducimus sint a ex itaque! Placeat saepe doloribus facere odio maxime, ipsam laborum iste vero eveniet nam sint in explicabo fugit! Asperiores eligendi cum illum a fugit. Saepe, eveniet! Quod sed fuga quidem eaque iusto omnis quasi vero dignissimos magni provident asperiores amet molestias rem, magnam, ut, corporis veritatis cum dolorum eos maiores similique optio numquam praesentium aut! Eius rerum ullam at a magni voluptates eligendi ratione voluptatibus voluptatem eos alias provident, accusamus consectetur corporis odit, nulla sint, tenetur quos accusantium atque laborum dolorum dignissimos adipisci. Cumque veniam saepe nulla ullam sunt soluta a possimus? Reprehenderit dolorem deleniti suscipit laborum quis magni aut error est placeat fuga facilis sed voluptatem accusantium, adipisci modi. Magni dolorum possimus harum rem et neque repellendus cumque id adipisci nisi? Autem, reiciendis qui in sed distinctio ipsa temporibus perspiciatis, sint quam eos nobis explicabo sequi maxime itaque nemo velit blanditiis assumenda tempora repudiandae, animi iusto. Ea dolor deleniti placeat quidem tempore totam explicabo porro reiciendis quia vel! Dignissimos fuga iste alias exercitationem nesciunt ut! Quibusdam natus obcaecati accusamus delectus, similique praesentium dolores omnis necessitatibus assumenda corrupti cupiditate, alias, mollitia reiciendis quasi aut! Vel sed, explicabo ex iure vero similique tempore porro eveniet. Unde voluptates doloribus eligendi, vero molestias, perspiciatis possimus tempore labore explicabo ab facere.",
            speaker: "Dr. Mahfuzur Rahman",
            schedule: "9:00 AM - 5:00 PM",
        },
        {
            id: 2,
            year: "2023",
            title: "The Dreamers Annual Conference 2023",
            image: semi,
            details: ".",
            speaker: "Dr. Nadim Parvez Emon",
            schedule: "9:00 AM - 5:00 PM",
        },
        {
            id: 3,
            year: "2022",
            title: "The Dreamers Annual Conference 2022",
            image: semi,
            details: ".",
            speaker: "Dr. Nadim Parvez Emon",
            schedule: "9:00 AM - 5:00 PM",
        },
        // Add more conferences here
    ];

    const competitions = [
        {
            id: 1,
            title: "General Knowledge Competition 2024",
            date: "2024-12-10",
            image: semi,
            details: "Test your knowledge and win exciting prizes...",
            prize: "Crest",
            rules: "Students of class 8-10",
        },
        {
            id: 2,
            title: "General Knowledge Competition 2024",
            date: "2024-12-10",
            image: semi,
            details: "Test your knowledge and win exciting prizes...",
            prize: "Crest",
            rules: "Students of class 8-10",
        },
        {
            id: 3,
            title: "General Knowledge Competition 2024",
            date: "2024-12-10",
            image: semi,
            details: "Test your knowledge and win exciting prizes...",
            prize: "Crest",
            rules: "Students of class 8-10",
        },
        // Add more competitions here
    ];

    const openModal = (type, event) => {
        setSelectedEvent(event);
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <HeroSection />
            <Seminars seminars={seminars} openModal={openModal} />
            <Conferences conferences={conferences} openModal={openModal} />
            <Competitions competitions={competitions} openModal={openModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal} type={modalType} selectedEvent={selectedEvent} />
        </div>
    );
};

export default CareerSeminars;