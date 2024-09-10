// src/Converter.jsx

import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { FaExchangeAlt } from 'react-icons/fa';
import axios from 'axios';

// Function to generate random data
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const formatDate = (date) => {
    const parsedDate = new Date(date);
    return `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')}`;
};

const generateRandomDate = () => {
    const start = new Date(1950, 0, 1);
    const end = new Date(2000, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return formatDate(date);
};

const generateRandomNumber = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
};

const generateRandomHeight = () => {
    const heights = [];

    // Generate heights from 4 feet 0 to 7 feet 5
    for (let feet = 4; feet <= 7; feet++) {
        for (let inches = 0; inches <= 11; inches++) {
            if (feet === 7 && inches > 5) break;  // Limit to 7 feet 5 inches
            heights.push(`${feet} feet ${inches}`);
        }
    }

    return getRandomItem(heights);
};

const generateRandomWeight = () => {
    const weights = [];

    // Generate weights from 40 to 105
    for (let weight = 40; weight <= 105; weight++) {
        weights.push(weight);
    }

    return getRandomItem(weights);
};

const professions = [
    "Software Engineer", "Graphic Designer", "Marketing Manager", "Data Scientist", "Teacher", "Real Estate Agent",
    "Financial Analyst", "Civil Engineer", "Content Creator", "Doctor", "Journalist", "Architect", "Lawyer", "Pharmacist",
    "Nurse", "Dentist", "Surgeon", "Pilot", "Chef", "Musician", "Actor", "Artist", "Photographer", "Economist", "Librarian",
    "Veterinarian", "Psychologist", "Biologist", "Chemist", "Physicist", "Anthropologist", "Sociologist", "Historian",
    "Geologist", "Mathematician", "Statistician", "Zoologist", "Botanist", "Environmental Scientist", "Mechanical Engineer",
    "Electrical Engineer", "Chemical Engineer", "Petroleum Engineer", "Software Developer", "Web Developer", "UI/UX Designer",
    "Product Manager", "Sales Manager", "Human Resources Manager", "Operations Manager", "Supply Chain Manager", "Logistics Manager",
    "Customer Service Representative", "Sales Executive", "Digital Marketing Specialist", "Social Media Manager", "SEO Specialist",
    "Content Writer", "Copywriter", "Public Relations Specialist", "Event Planner", "Wedding Planner", "Fitness Trainer", "Yoga Instructor",
    "Nutritionist", "Dietitian", "Psychiatrist", "Dermatologist", "Optometrist", "Chiropractor", "Occupational Therapist", "Physical Therapist",
    "Speech Therapist", "Audiologist", "Barber", "Hair Stylist", "Makeup Artist", "Fashion Designer", "Interior Designer", "Florist",
    "Carpenter", "Plumber", "Electrician", "Mechanic", "Taxi Driver", "Truck Driver", "Bus Driver", "Security Guard", "Firefighter", "Police Officer",
    "Paramedic", "Customs Officer", "Immigration Officer", "Air Traffic Controller", "Train Conductor", "Ship Captain", "Fisherman",
    "Farmer", "Rancher", "Brewer", "Baker", "Butcher"
];

const generateBangladeshiName = () => {
    const names = [
        "Rafiq Ahmed", "Aminul Islam", "Shamim Hossain", "Rehana Parveen", "Anika Rahman", 
        "Asif Mahmud", "Sadia Rahman", "Tariqul Islam", "Mohammad Hossain", "Farhana Yasmin", 
        "Firoz Ahmed", "Nazmul Huda", "Lutfur Rahman", "Shirin Akter", "Rashedul Islam",
        "Mitu Akter", "Taslima Begum", "Monir Hossain", "Zahirul Islam", "Ayesha Siddiqua",
        "Kamrul Islam", "Tanvir Hasan", "Mahfuzur Rahman", "Jannatul Ferdous", "Mahmuda Khatun",
        "Moinul Islam", "Nurjahan Begum", "Shakib Al Hasan", "Tamim Iqbal", "Mashrafe Mortaza",
        "Rumana Ahmed", "Morshed Alam", "Abdullah Al Mamun", "Hasina Begum", "Rabeya Sultana",
        "Rubel Hossain", "Sumaiya Sultana", "Masud Rana", "Khaleda Begum", "Anwar Hossain",
        "Humayun Kabir", "Shimul Hossain", "Sabbir Rahman", "Kawsar Ahmed", "Sultana Begum",
        "Nusrat Jahan", "Sajjad Hossain", "Tahmina Sultana", "Jahangir Alam", "Tanima Begum",
        "Saidur Rahman", "Rokeya Begum", "Nurul Islam", "Alamin Hossain", "Sumona Rahman",
        "Shahina Begum", "Rashed Khan", "Habibur Rahman", "Israt Jahan", "Shamima Nasrin",
        "Fahmida Khatun", "Fayezur Rahman", "Abdur Rahim", "Ishrat Jahan", "Mahbubur Rahman",
        "Julekha Begum", "Mostafizur Rahman", "Papia Sultana", "Nasir Uddin", "Hasibul Hossain",
        "Hasina Akter", "Raihan Uddin", "Jashim Uddin", "Afroza Begum", "Shafiqur Rahman",
        "Mahmudul Hasan", "Fatema Begum", "Rezwan Ahmed", "Rahima Begum", "Tasnim Rahman",
        "Mafizur Rahman", "Mishu Akter", "Delwar Hossain", "Saleha Begum", "Mamunur Rahman",
        "Jesmin Akter", "Sabbir Ahmed", "Halima Khatun", "Zahid Hossain", "Fahima Islam",
        "Mushfiqur Rahim", "Jahangir Hossain", "Parvin Akter", "Kazi Anwar", "Rokibul Hossain",
        "Mansur Hossain", "Samia Ahmed", "Shuvra Islam", "Tanjina Begum", "Sarwar Hossain",
        "Ismail Hossain", "Afzal Hossain", "Sumaiya Islam", "Nadia Rahman", "Sajjadul Islam",
        "Sohel Rana", "Shahriar Hossain", "Nasima Begum", "Sabina Yasmin", "Habibul Bashar",
        "Kamal Hossain", "Mofizul Islam", "Najmul Hossain", "Sanaullah Khan", "Azharul Islam",
        "Selina Akter", "Samiul Hasan", "Rezina Khatun", "Jubayer Ahmed", "Lamia Islam",
        "Arif Hossain", "Nasir Hossain", "Tasfia Rahman", "Munia Begum", "Alamgir Hossain",
        "Rezaul Karim", "Ayesha Akter", "Babul Hossain", "Muntaha Rahman", "Iqbal Hossain",
        "Akhtaruzzaman", "Aminur Rahman", "Alamgir Kabir", "Tasmina Hossain", "Afsana Begum",
        "Murad Hossain", "Shirin Hossain", "Jahid Hasan", "Sumon Ahmed", "Rokeya Akter",
        "Shamim Ahmed", "Irfan Ali", "Monira Begum", "Habib Rahman", "Anik Hossain",
        "Shafiqul Islam", "Mahin Rahman", "Nasrin Akter", "Rashidul Hasan", "Shohel Rana",
        "Atiqur Rahman", "Raihan Ahmed", "Shorna Islam", "Abdul Karim", "Ayesha Sultana",
        "Akram Hossain", "Mokhlesur Rahman", "Salma Khatun", "Mitu Hossain", "Ali Akbar",
        "Tania Akter", "Masudur Rahman", "Mahadi Hasan", "Rokibul Islam", "Sadiya Sultana",
        "Arafat Hossain", "Mofazzal Hossain", "Abu Sayed", "Shamsul Haque", "Fahima Yasmin",
        "Lutfur Rahman", "Milon Hossain", "Azad Hossain", "Sanjida Rahman", "Tahsin Rahman",
        "Taslima Sultana", "Imran Hossain", "Jahidul Islam", "Aklima Begum", "Shamima Islam",
        "Nasir Ahmed", "Murshidul Islam", "Nafis Ahmed", "Mariam Begum", "Abdul Momin",
        "Saifur Rahman", "Shakil Ahmed", "Sadika Rahman", "Rafiqul Islam", "Munira Akter"
    ];
    return getRandomItem(names);
};

const generateRandomPhoneNumber = () => {
    return `01${generateRandomNumber(9)}`;
};



const convertImageUrl = (imageName) => {
    const imageFileName = imageName.split('/').pop(); // Extract file name
    return `https://mgpwebaps.s3.eu-north-1.amazonaws.com/Profile/${imageFileName}`; // New image URL
};

const Converter = () => {
    const [jsonData, setJsonData] = useState('');
    const [convertedData, setConvertedData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submittedCount, setSubmittedCount] = useState(0);
    const [failedData, setFailedData] = useState([]);  // Track failed submissions

    const handleConvert = () => {
        const parsedData = JSON.parse(jsonData);
        const converted = parsedData.data.map(member => ({
            // Conversion logic remains the same
            full_name: member.FullName,
            email: member.Email || "",
            contact_no: member.ContactNumber,
            member_id: `${member.MemberTextID}`,
            nickname: member.FullName.split(' ')[0],
            date_of_birth: member.DateOfBirth === "01 Jan 0001" ? generateRandomDate() : member.DateOfBirth,
            nid_number: member.NID || generateRandomNumber(getRandomItem([10, 13, 17])),
            address: member.Address || "Mohammadpur, Dhaka",
            status: getRandomItem(["Married", "Unmarried", "Divorced", "Don't say"]),
            gender: member.Gender ? (member.Gender.toLowerCase() === "male" ? "Male" : "Female") : getRandomItem(["Male", "Female"]),
            religion: getRandomItem(["Islam", "Hindu", "Christian", "Buddhism", "Other"]),
            blood_group: member.BloodGroupName === "NOT TESTED" ? "B+" : (member.BloodGroupName || getRandomItem(["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"])),
            height: member.Height ? `${member.Height} cm` : generateRandomHeight(),
            weight: member.Weight ? member.Weight : generateRandomWeight(),
            profession: member.Occupation || getRandomItem(professions),
            branch: "shia",
            expiredate: member.CardExpireOn ? formatDate(member.CardExpireOn) : "N/A",
            photourl: member.ImageName ? convertImageUrl(member.ImageName) : 'N/A',
            role: "member",
            emergency_contact_name: generateBangladeshiName(),
            emergency_contact_number: generateRandomPhoneNumber(),
            card_no: member.CardNumber,
            admission_date: member.RegistrationDate ? formatDate(member.RegistrationDate) : "N/A",
            notes: member.Note || "",
        }));

        setConvertedData(converted);
        setSubmittedCount(0); // Reset the count when new data is converted
        setFailedData([]); // Clear previous failed data
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitMessage('');
        const failed = [];

        for (let i = 0; i < convertedData.length; i++) {
            try {
                await axios.post('https://multigym-management-server-dmmji.ondigitalocean.app/api/users/json', convertedData[i]);
                setSubmittedCount((prevCount) => prevCount + 1);
            } catch (error) {
                failed.push(convertedData[i]);
            }
        }

        setFailedData(failed); // Store the failed data
        setSubmitMessage(failed.length > 0 ? `${failed.length} data submissions failed` : 'All data submitted successfully!');
        setIsSubmitting(false);
    };

    const handleRetryFailed = async () => {
        setIsSubmitting(true);
        setSubmitMessage('');
        const newFailedData = [];

        for (let i = 0; i < failedData.length; i++) {
            try {
                await axios.post('https://multigym-management-server-dmmji.ondigitalocean.app/api/users/json', failedData[i]);
                setSubmittedCount((prevCount) => prevCount + 1);
            } catch (error) {
                newFailedData.push(failedData[i]); // Re-push the failed data
            }
        }

        setFailedData(newFailedData); // Update the failed data
        setSubmitMessage(newFailedData.length > 0 ? `${newFailedData.length} data submissions still failed` : 'All failed data submitted successfully!');
        setIsSubmitting(false);
    };

    const downloadFailedData = () => {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(failedData, null, 2))}`;
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', 'failed_data.json');
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">JSON Data Converter</h1>
            <TextField
                label="JSON Input"
                multiline
                rows={10}
                fullWidth
                variant="outlined"
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                className="mt-4"
                startIcon={<FaExchangeAlt />}
                onClick={handleConvert}
            >
                Convert
            </Button>

            {convertedData && (
                <>
                    <Button
                        variant="contained"
                        color="success"
                        className="mt-4"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : `Submit Data (${convertedData.length})`}
                    </Button>

                    {failedData.length > 0 && (
                        <>
                            <Button
                                variant="contained"
                                color="warning"
                                className="mt-4"
                                onClick={handleRetryFailed}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Retrying...' : `Retry Failed Data (${failedData.length})`}
                            </Button>

                            <Button
                                variant="contained"
                                color="secondary"
                                className="mt-4"
                                onClick={downloadFailedData}
                            >
                                Download Failed Data
                            </Button>
                        </>
                    )}

                    {submitMessage && (
                        <div className="mt-4">
                            <p>{submitMessage}</p>
                        </div>
                    )}

                    <div className="mt-4 p-4 bg-gray-100 rounded">
                        <pre className="whitespace-pre-wrap">
                            {JSON.stringify(convertedData, null, 2)}
                        </pre>
                    </div>
                </>
            )}
        </div>
    );
};

export default Converter;