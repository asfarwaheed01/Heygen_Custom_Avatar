// import { AVATARS } from "@/lib/constants";
// import React, { useEffect, useState } from "react";

// interface Avatar {
//   id: string;
//   name: string;
//   region: string;
// }

// interface AvatarData {
//   avatar_id: string;
//   name: string;
//   region: string;
// }

// interface AvatarSelectionFormProps {
//   onSelectAvatar: (avatarId: string) => void;
// }

// const names = [
//   { name: "Alice", gender: "female", region: "US" },
//   { name: "Sonia", gender: "female", region: "US" },
//   { name: "Lina", gender: "female", region: "EU" },
//   { name: "Tina", gender: "female", region: "EU" },
//   { name: "Lucas", gender: "male", region: "US" },
//   { name: "Raj", gender: "male", region: "Asia" },
//   { name: "Mei Lin", gender: "female", region: "Asia" },
//   { name: "Kenji", gender: "male", region: "EU" },
//   { name: "Zara", gender: "female", region: "Asia" },
//   { name: "Carlos", gender: "male", region: "US" },
//   { name: "Khalid", gender: "male", region: "Asia" },
//   { name: "Sofia", gender: "female", region: "EU" },
// ];

// const AvatarSelectionForm: React.FC<AvatarSelectionFormProps> = ({
//   onSelectAvatar,
// }) => {
//   const [avatars, setAvatars] = useState<Avatar[]>([]);
//   const [selectedRegion, setSelectedRegion] = useState<string>("");
//   const [selectedAvatar, setSelectedAvatar] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);

//   const regions = [
//     { id: "us", name: "United States" },
//     { id: "eu", name: "Europe" },
//     { id: "asia", name: "Asia" },
//   ];

//   useEffect(() => {
//     const fetchAvatars = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           "https://api.heygen.com/v1/streaming/avatar.list",
//           {
//             method: "GET",
//             headers: {
//               accept: "application/json",
//               "x-api-key": process.env.HEYGENAPIKEY || "",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         const apiAvatars =
//           data?.data?.map((avatar: AvatarData, index: number) => ({
//             id: avatar.avatar_id,
//             name: names[index % names.length].name,
//             region: names[index % names.length].region,
//           })) || [];

//         // Add predefined AVATARS with region and gender assignments
//         const predefinedAvatars = AVATARS.map((avatar: any, index: number) => ({
//           id: avatar.avatar_id,
//           name: avatar.name,
//           region: names[index % names.length].region,
//           gender: names[index % names.length].gender,
//         }));

//         // Merge fetched avatars with predefined avatars
//         const mergedAvatars = [...apiAvatars, ...predefinedAvatars];
//         setAvatars(mergedAvatars);
//       } catch (error) {
//         console.error("Error fetching avatars:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAvatars();
//   }, []);

//   const filteredAvatars = avatars.filter(
//     (avatar) => !selectedRegion || avatar.region === selectedRegion
//   );

//   const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedRegion(event.target.value);
//     setSelectedAvatar("");
//   };

//   const handleAvatarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedAvatar(event.target.value);
//     onSelectAvatar(event.target.value);
//   };

//   if (loading) {
//     return (
//       <div className="w-full max-w-md mx-auto mb-6 p-6 bg-white rounded-lg shadow-md">
//         <div className="space-y-4">
//           <div className="h-8 bg-gray-300 rounded-md animate-pulse"></div>
//           <div className="h-8 bg-gray-300 rounded-md animate-pulse"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-md mx-auto mb-6 p-6 bg-white rounded-lg shadow-md">
//       <div className="space-y-4">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Select Region
//           </label>
//           <select
//             value={selectedRegion}
//             onChange={handleRegionChange}
//             className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Select Region</option>
//             {regions.map((region) => (
//               <option key={region.id} value={region.id}>
//                 {region.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Select Avatar
//           </label>
//           <select
//             value={selectedAvatar}
//             onChange={handleAvatarChange}
//             disabled={!filteredAvatars.length}
//             className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
//           >
//             {filteredAvatars.map((avatar) => (
//               <option key={avatar.id} value={avatar.id}>
//                 {avatar.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AvatarSelectionForm;

import React, { useState } from "react";

interface Avatar {
  id: string;
  name: string;
  region: string;
  gender: string;
  age: string;
}

interface AvatarSelectionFormProps {
  onSelectAvatar: (avatarId: string) => void;
}

const getRandomAge = () => {
  const ages = ["Young", "Middle Age", "Old"];
  return ages[Math.floor(Math.random() * ages.length)];
};

export const AVATARS: Avatar[] = [
  {
    id: "Eric_public_pro2_20230608",
    name: "Edward in Blue Shirt",
    gender: "male",
    region: "US",
    age: getRandomAge(),
  },
  {
    id: "Tyler-incasualsuit-20220721",
    name: "Tyler in Casual Suit",
    gender: "male",
    region: "US",
    age: getRandomAge(),
  },
  {
    id: "Anna_public_3_20240108",
    name: "Anna in Brown T-shirt",
    gender: "female",
    region: "EU",
    age: getRandomAge(),
  },
  {
    id: "Susan_public_2_20240328",
    name: "Susan in Black Shirt",
    gender: "female",
    region: "EU",
    age: getRandomAge(),
  },
  {
    id: "josh_lite3_20230714",
    name: "Joshua Heygen CEO",
    gender: "male",
    region: "Asia",
    age: getRandomAge(),
  },
  {
    id: "Wayne_20240711",
    name: "Alice",
    gender: "female",
    region: "US",
    age: getRandomAge(),
  },
  {
    id: "ef08039a41354ed5a20565db899373f3",
    name: "Sonia",
    gender: "female",
    region: "US",
    age: getRandomAge(),
  },
  {
    id: "336b72634e644335ad40bd56462fc780",
    name: "Lina",
    gender: "female",
    region: "EU",
    age: getRandomAge(),
  },
  {
    id: "37f4d912aa564663a1cf8d63acd0e1ab",
    name: "Tina",
    gender: "female",
    region: "EU",
    age: getRandomAge(),
  },
  {
    id: "cc2984a6003a4d5194eb58a4ad570337",
    name: "Lucas",
    gender: "male",
    region: "US",
    age: getRandomAge(),
  },
  {
    id: "eb0a8cc8046f476da551a5559fbb5c82",
    name: "Raj",
    gender: "male",
    region: "Asia",
    age: getRandomAge(),
  },
  {
    id: "fa7b34fe0b294f02b2fca6c1ed2c7158",
    name: "Mei Lin",
    gender: "female",
    region: "Asia",
    age: getRandomAge(),
  },
  {
    id: "3c8a703d9d764938ae522b43401a59c2",
    name: "Kenji",
    gender: "male",
    region: "EU",
    age: getRandomAge(),
  },
  {
    id: "73c84e2b886940099c5793b085150f2f",
    name: "Zara",
    gender: "female",
    region: "Asia",
    age: getRandomAge(),
  },
  {
    id: "c20f4bdddbe041ecba98d93444f8b29b",
    name: "Carlos",
    gender: "male",
    region: "US",
    age: getRandomAge(),
  },
  {
    id: "43c34c4285cb4b6c81856713c70ba23b",
    name: "Khalid",
    gender: "male",
    region: "Asia",
    age: getRandomAge(),
  },
  {
    id: "2c57ba04ef4d4a5ca30a953d0791e7e3",
    name: "Sofia",
    gender: "female",
    region: "EU",
    age: getRandomAge(),
  },
];

const AvatarSelectionForm: React.FC<AvatarSelectionFormProps> = ({
  onSelectAvatar,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");

  const regions = [
    { id: "US", name: "United States" },
    { id: "EU", name: "Europe" },
    { id: "Asia", name: "Asia" },
  ];

  const genders = [
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
  ];

  const ages = [
    { id: "Young", name: "Young" },
    { id: "Middle Age", name: "Middle Age" },
    { id: "Old", name: "Old" },
  ];

  // Filter avatars based on selected criteria
  const filteredAvatars = AVATARS.filter(
    (avatar) =>
      (!selectedRegion || avatar.region === selectedRegion) &&
      (!selectedGender || avatar.gender === selectedGender) &&
      (!selectedAge || avatar.age === selectedAge)
  );

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
    setSelectedAvatar("");
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(event.target.value);
    setSelectedAvatar("");
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAge(event.target.value);
    setSelectedAvatar("");
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAvatar(event.target.value);
    onSelectAvatar(event.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Region
          </label>
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
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
            onChange={handleGenderChange}
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
            onChange={handleAgeChange}
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Avatar
          </label>
          <select
            value={selectedAvatar}
            onChange={handleAvatarChange}
            disabled={!filteredAvatars.length}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select Avatar</option>
            {filteredAvatars.map((avatar) => (
              <option key={avatar.id} value={avatar.id}>
                {avatar.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelectionForm;
