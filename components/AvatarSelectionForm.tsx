"use client";
import React, { useState, useEffect } from "react";
import { Avatar } from "@/interfaces/Interfaces";
import { AVATARS } from "@/utils/constants";

interface AvatarSelectionFormProps {
  onSelectAvatar: (avatarId: string) => void;
}

const AvatarSelectionForm: React.FC<AvatarSelectionFormProps> = ({
  onSelectAvatar,
}) => {
  const [selectedEthnicity, setSelectedEthnicity] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const filtersSelected = selectedEthnicity && selectedGender && selectedAge;

  const ethnicities = [
    { id: "African American", name: "African American" },
    { id: "Asian", name: "Asian" },
    { id: "Caucasian", name: "Caucasian" },
    { id: "Hispanic", name: "Hispanic" },
    { id: "Other", name: "Other" },
  ];

  const genders = [
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "non-binary", name: "Non-Binary" },
  ];

  const ages = [
    { id: "Young", name: "Young" },
    { id: "Middle Age", name: "Middle Age" },
    { id: "Old", name: "Old" },
  ];

  useEffect(() => {
    if (filtersSelected) {
      let matchingAvatars = AVATARS.filter(
        (avatar) =>
          avatar.ethnicity === selectedEthnicity &&
          avatar.gender === selectedGender &&
          avatar.age === selectedAge
      );

      if (matchingAvatars.length === 0) {
        matchingAvatars = AVATARS.filter(
          (avatar) =>
            avatar.ethnicity === selectedEthnicity &&
            avatar.gender === selectedGender
        );
      }
      if (matchingAvatars.length === 0) {
        matchingAvatars = AVATARS.filter(
          (avatar) => avatar.ethnicity === selectedEthnicity
        );
      }
      if (matchingAvatars.length === 0) {
        matchingAvatars = AVATARS;
      }

      const chosenAvatar =
        matchingAvatars[Math.floor(Math.random() * matchingAvatars.length)];
      setSelectedAvatar(chosenAvatar);
      onSelectAvatar(chosenAvatar.id);
    } else {
      setSelectedAvatar(null);
    }
  }, [
    selectedEthnicity,
    selectedGender,
    selectedAge,
    filtersSelected,
    onSelectAvatar,
  ]);

  return (
    <div className="w-full max-w-md mx-auto mb-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Ethnicity
          </label>
          <select
            value={selectedEthnicity}
            onChange={(e) => setSelectedEthnicity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Ethnicity</option>
            {ethnicities.map((ethnicity) => (
              <option key={ethnicity.id} value={ethnicity.id}>
                {ethnicity.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Gender
          </label>
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Age
          </label>
          <select
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Age</option>
            {ages.map((age) => (
              <option key={age.id} value={age.id}>
                {age.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelectionForm;
