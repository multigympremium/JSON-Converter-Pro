// src/Converter.jsx

import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { FaExchangeAlt } from 'react-icons/fa';

const Converter = () => {
    const [jsonData, setJsonData] = useState('');
    const [convertedData, setConvertedData] = useState(null);

    const handleConvert = () => {
        const parsedData = JSON.parse(jsonData);
        const converted = parsedData.data.map(member => ({
            _id: member.MemberCode,
            full_name: member.FullName,
            email: member.Email || 'N/A',
            contact_no: member.ContactNumber,
            member_id: `M${member.MemberID}`,
            nickname: member.UserName || 'N/A',
            date_of_birth: member.DateOfBirth === "01 Jan 0001" ? 'N/A' : member.DateOfBirth,
            nid_number: member.NID || 'N/A',
            address: member.Address || 'N/A',
            status: 'N/A',  // Assuming 'status' is not available in the original data
            gender: member.Gender === 'MALE' ? 'Male' : 'Female',
            religion: 'N/A',  // Assuming 'religion' is not available in the original data
            blood_group: member.BloodGroupName,
            height: member.Height ? `${member.Height}cm` : 'N/A',
            weight: member.Weight ? `${member.Weight}kg` : 'N/A',
            profession: member.Occupation || 'N/A',
            branch: 'N/A',  // Assuming 'branch' is not available in the original data
            expiredate: member.CardExpireOn,
            photourl: member.ImageName ? `https://www.example.com${member.ImageName}` : 'N/A',
            role: 'member',
            emergency_contact_name: 'N/A',  // Assuming this is not available in the original data
            emergency_contact_number: member.EmergencyContactNumber || 'N/A',
            card_no: member.CardNumber,
            admission_date: member.RegistrationDate,
            updatedAt: new Date().toISOString(),
        }));

        setConvertedData(converted);
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
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <pre className="whitespace-pre-wrap">
                        {JSON.stringify(convertedData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default Converter;
