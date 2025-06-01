import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Heart,
  Filter,
  User,
  Calendar,
  Building,
  Home
} from 'lucide-react';

const Members = () => {
  // Sample member data - replace with your actual data
  const [members] = useState([
    {
      id: 1,
      name: "মো: আলমগীর হোসেন",
      photo: "/images/member1.jpg",
      school: "সামন্তা মাধ্যমিক বিদ্যালয়",
      sscBatch: "২০১৫",
      college: "পদ্মপুকুর সরকারি ডিগ্রী কলেজ",
      hscBatch: "২০১৭",
      university: "নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
      department: "সফটওয়্যার ইঞ্জিনিয়ারিং",
      bloodGroup: "B+",
      mobile: "০১৩১৯-৬০২৫৪৫",
      email: "mahalamgir1213@gmail.com",
      permanentAddress: "গ্রাম: কুলবাড়িয়া, উপজেলা: মহেশপুর, জেলা: ঝিনাইদহ",
      currentAddress: "ঢাকা, বাংলাদেশ",
      branch: "ঢাকা",
      joinDate: "২০১৬-০১-০২",
      position: "ভাইস-চেয়ারম্যান",
      occupation: "ছাত্র"
    },
    // {
    //   id: 2,
    //   name: "ফাতেমা খাতুন",
    //   photo: "/images/member2.jpg",
    //   school: "সাতক্ষীরা সরকারি বালিকা উচ্চ বিদ্যালয়",
    //   sscBatch: "২০১৭",
    //   college: "সাতক্ষীরা সরকারি কলেজ",
    //   hscBatch: "২০১৯",
    //   university: "ঢাকা বিশ্ববিদ্যালয়",
    //   department: "বাংলা",
    //   bloodGroup: "A+",
    //   mobile: "০১৮১২৩৪৫৬৭৮",
    //   email: "fatema@gmail.com",
    //   permanentAddress: "গ্রাম: শ্যামনগর, উপজেলা: শ্যামনগর, জেলা: সাতক্ষীরা",
    //   currentAddress: "ঢাকা, বাংলাদেশ",
    //   branch: "ঢাকা",
    //   joinDate: "২০২২-০২-২০",
    //   position: "সহ-সভাপতি",
    //   occupation: "শিক্ষক"
    // },
    // {
    //   id: 3,
    //   name: "আব্দুল কাদের মোল্লা",
    //   photo: "/images/member3.jpg",
    //   school: "কালীগঞ্জ পাইলট উচ্চ বিদ্যালয়",
    //   sscBatch: "২০১৬",
    //   college: "সাতক্ষীরা সরকারি কলেজ",
    //   hscBatch: "২০১৮",
    //   university: "চট্টগ্রাম বিশ্ববিদ্যালয়",
    //   department: "ব্যবসায় প্রশাসন",
    //   bloodGroup: "O+",
    //   mobile: "০১৯১২৩৪৫৬৭৮",
    //   email: "kader@gmail.com",
    //   permanentAddress: "গ্রাম: কালীগঞ্জ সদর, উপজেলা: কালীগঞ্জ, জেলা: সাতক্ষীরা",
    //   currentAddress: "চট্টগ্রাম, বাংলাদেশ",
    //   branch: "চট্টগ্রাম",
    //   joinDate: "২০২১-১২-১০",
    //   position: "সাধারণ সম্পাদক",
    //   occupation: "ব্যবসায়ী"
    // },
    // {
    //   id: 4,
    //   name: "নুরুন্নাহার বেগম",
    //   photo: "/images/member4.jpg",
    //   school: "তালা উচ্চ বিদ্যালয়",
    //   sscBatch: "২০১৯",
    //   college: "সাতক্ষীরা সরকারি কলেজ",
    //   hscBatch: "২০২১",
    //   university: "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
    //   department: "সমাজবিজ্ঞান",
    //   bloodGroup: "AB+",
    //   mobile: "০১৬১২৩৪৫৆৭৮",
    //   email: "nurun@gmail.com",
    //   permanentAddress: "গ্রাম: তালা সদর, উপজেলা: তালা, জেলা: সাতক্ষীরা",
    //   currentAddress: "সাভার, ঢাকা",
    //   branch: "ঢাকা",
    //   joinDate: "২০২২-০৩-০৫",
    //   position: "সাধারণ সদস্য",
    //   occupation: "ছাত্রী"
    // },
    // {
    //   id: 5,
    //   name: "মোহাম্মদ শাকিল আহমেদ",
    //   photo: "/images/member5.jpg",
    //   school: "আশাশুনি উচ্চ বিদ্যালয়",
    //   sscBatch: "২০১৫",
    //   college: "যশোর সরকারি মাইকেল মধুসূদন কলেজ",
    //   hscBatch: "২০১৭",
    //   university: "বুয়েট",
    //   department: "ইলেকট্রিক্যাল অ্যান্ড ইলেকট্রনিক ইঞ্জিনিয়ারিং",
    //   bloodGroup: "B-",
    //   mobile: "০১৫১২৩৪৫৬৭৮",
    //   email: "shakil@gmail.com",
    //   permanentAddress: "গ্রাম: আশাশুনি সদর, উপজেলা: আশাশুনি, জেলা: সাতক্ষীরা",
    //   currentAddress: "ঢাকা, বাংলাদেশ",
    //   branch: "ঢাকা",
    //   joinDate: "২০২১-১১-২৫",
    //   position: "কোষাধ্যক্ষ",
    //   occupation: "ইঞ্জিনিয়ার"
    // }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  // Get unique values for filters
  const branches = [...new Set(members.map(member => member.branch))];
  const bloodGroups = [...new Set(members.map(member => member.bloodGroup))];
  const sscBatches = [...new Set(members.map(member => member.sscBatch))];

  // Filter members based on search and filters
  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.mobile.includes(searchTerm) ||
                           member.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.college.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBranch = selectedBranch === "" || member.branch === selectedBranch;
      const matchesBloodGroup = selectedBloodGroup === "" || member.bloodGroup === selectedBloodGroup;
      const matchesBatch = selectedBatch === "" || member.sscBatch === selectedBatch;

      return matchesSearch && matchesBranch && matchesBloodGroup && matchesBatch;
    });
  }, [members, searchTerm, selectedBranch, selectedBloodGroup, selectedBatch]);

  const MemberCard = ({ member }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      {/* Member Photo & Basic Info */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white/20 flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <User size={40} className="text-gray-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
            <p className="text-blue-100 font-medium">{member.position}</p>
            <p className="text-blue-200 text-sm">{member.occupation}</p>
          </div>
        </div>
      </div>

      {/* Member Details */}
      <div className="p-6 space-y-4">
        
        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Phone size={16} className="text-green-500" />
            <span className="text-sm text-gray-700">{member.mobile}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail size={16} className="text-blue-500" />
            <span className="text-sm text-gray-700">{member.email}</span>
          </div>
        </div>

        {/* Education */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <GraduationCap size={18} className="text-indigo-500 mr-2" />
            <h4 className="font-semibold text-gray-800">শিক্ষাগত যোগ্যতা</h4>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">স্কুল:</span> {member.school} (এসএসসি: {member.sscBatch})
            </div>
            <div>
              <span className="font-medium">কলেজ:</span> {member.college} (এইচএসসি: {member.hscBatch})
            </div>
            <div>
              <span className="font-medium">বিশ্ববিদ্যালয়:</span> {member.university}
            </div>
            <div>
              <span className="font-medium">বিভাগ:</span> {member.department}
            </div>
          </div>
        </div>

        {/* Other Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Heart size={16} className="text-red-500" />
            <span className="text-sm font-medium text-gray-700">{member.bloodGroup}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Building size={16} className="text-purple-500" />
            <span className="text-sm text-gray-700">{member.branch}</span>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Home size={16} className="text-orange-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-800">স্থায়ী ঠিকানা:</p>
              <p className="text-sm text-gray-600">{member.permanentAddress}</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin size={16} className="text-green-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-800">বর্তমান ঠিকানা:</p>
              <p className="text-sm text-gray-600">{member.currentAddress}</p>
            </div>
          </div>
        </div>

        {/* Join Date */}
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-blue-500" />
            <span className="text-sm text-gray-600">যোগদানের তারিখ: {member.joinDate}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-blue-50 py-10">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Users size={48} className="text-[#078d83]" />
          </div>
          <h1 className="text-5xl font-bold text-[#078d83] mb-4">সদস্য তালিকা</h1>
          <p className="text-xl text-gray-600">দ্যা ড্রিমার্স - সকল সদস্যদের সম্পূর্ণ তথ্য</p>
          <div className="mt-6 flex justify-center">
            <div className="bg-blue-200 backdrop-blur-md rounded-full px-6 py-2">
              <span className="text-lg font-semibold text-gray-700">মোট সদস্য: {members.length} জন</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="নাম, ইমেইল, মোবাইল, স্কুল বা কলেজ দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-500" />
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="">সব শাখা</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              >
                <option value="">সব রক্তের গ্রুপ</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>

              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              >
                <option value="">সব ব্যাচ</option>
                {sscBatches.map(batch => (
                  <option key={batch} value={batch}>এসএসসি {batch}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center">
            <span className="text-gray-600">
              {filteredMembers.length} জন সদস্য পাওয়া গেছে
            </span>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredMembers.length > 0 ? (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">কোন সদস্য পাওয়া যায়নি</h3>
            <p className="text-gray-500">অনুসন্ধানের শর্ত পরিবর্তন করে আবার চেষ্টা করুন</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;