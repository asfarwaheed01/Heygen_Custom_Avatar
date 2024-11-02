// import React, { useState, useEffect } from "react";

// interface Avatar {
//   id: string;
//   name: string;
//   region: string;
//   gender: string;
//   age: string;
// }

// interface AvatarSelectionFormProps {
//   onSelectAvatar: (avatarId: string) => void;
// }

// export const AVATARS: Avatar[] = [
//   {
//     id: "Eric_public_pro2_20230608",
//     name: "Edward in Blue Shirt",
//     gender: "male",
//     region: "EU",
//     age: "Old",
//   },
//   {
//     id: "Tyler-incasualsuit-20220721",
//     name: "Tyler in Casual Suit",
//     gender: "male",
//     region: "US",
//     age: "Middle Age",
//   },
//   {
//     id: "Anna_public_3_20240108",
//     name: "Anna in Brown T-shirt",
//     gender: "female",
//     region: "EU",
//     age: "Old",
//   },
//   {
//     id: "Susan_public_2_20240328",
//     name: "Susan in Black Shirt",
//     gender: "female",
//     region: "EU",
//     age: "Young",
//   },
//   {
//     id: "josh_lite3_20230714",
//     name: "Joshua Heygen CEO",
//     gender: "male",
//     region: "Asia",
//     age: "Young",
//   },
//   {
//     id: "Wayne_20240711",
//     name: "Alice",
//     gender: "female",
//     region: "US",
//     age: "MiddleAge",
//   },
//   {
//     id: "ef08039a41354ed5a20565db899373f3",
//     name: "Sonia",
//     gender: "female",
//     region: "US",
//     age: "Middle Age",
//   },
//   {
//     id: "336b72634e644335ad40bd56462fc780",
//     name: "Lina",
//     gender: "female",
//     region: "EU",
//     age: "Young",
//   },
//   {
//     id: "37f4d912aa564663a1cf8d63acd0e1ab",
//     name: "Tina",
//     gender: "female",
//     region: "EU",
//     age: "Young",
//   },
//   {
//     id: "cc2984a6003a4d5194eb58a4ad570337",
//     name: "Lucas",
//     gender: "male",
//     region: "US",
//     age: "Middle Age",
//   },
//   {
//     id: "eb0a8cc8046f476da551a5559fbb5c82",
//     name: "Raj",
//     gender: "male",
//     region: "Asia",
//     age: "MiddleAge",
//   },
//   {
//     id: "fa7b34fe0b294f02b2fca6c1ed2c7158",
//     name: "Mei Lin",
//     gender: "female",
//     region: "Asia",
//     age: "Middle Age",
//   },
//   {
//     id: "3c8a703d9d764938ae522b43401a59c2",
//     name: "Kenji",
//     gender: "female",
//     region: "EU",
//     age: "Young",
//   },
//   {
//     id: "73c84e2b886940099c5793b085150f2f",
//     name: "Zara",
//     gender: "female",
//     region: "Asia",
//     age: "Old",
//   },
//   {
//     id: "c20f4bdddbe041ecba98d93444f8b29b",
//     name: "Caroline",
//     gender: "female",
//     region: "US",
//     age: "Old",
//   },
//   {
//     id: "43c34c4285cb4b6c81856713c70ba23b",
//     name: "Khalid",
//     gender: "male",
//     region: "Asia",
//     age: "Young",
//   },
//   {
//     id: "2c57ba04ef4d4a5ca30a953d0791e7e3",
//     name: "Sofia",
//     gender: "female",
//     region: "EU",
//     age: "Middle Age",
//   },
// ];

// const AvatarSelectionForm: React.FC<AvatarSelectionFormProps> = ({
//   onSelectAvatar,
// }) => {
//   const [selectedRegion, setSelectedRegion] = useState<string>("");
//   const [selectedGender, setSelectedGender] = useState<string>("");
//   const [selectedAge, setSelectedAge] = useState<string>("");
//   const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
//   const filtersSelected = selectedRegion && selectedGender && selectedAge;

//   const regions = [
//     { id: "US", name: "United States" },
//     { id: "EU", name: "Europe" },
//     { id: "Asia", name: "Asia" },
//   ];

//   const genders = [
//     { id: "male", name: "Male" },
//     { id: "female", name: "Female" },
//   ];

//   const ages = [
//     { id: "Young", name: "Young" },
//     { id: "Middle Age", name: "Middle Age" },
//     { id: "Old", name: "Old" },
//   ];

//   useEffect(() => {
//     if (filtersSelected) {
//       const matchingAvatars = AVATARS.filter(
//         (avatar) =>
//           avatar.region === selectedRegion &&
//           avatar.gender === selectedGender &&
//           avatar.age === selectedAge
//       );

//       if (matchingAvatars.length > 0) {
//         const chosenAvatar =
//           matchingAvatars[Math.floor(Math.random() * matchingAvatars.length)];
//         setSelectedAvatar(chosenAvatar);
//         onSelectAvatar(chosenAvatar.id);
//       } else {
//         setSelectedAvatar(null);
//       }
//     } else {
//       setSelectedAvatar(null);
//     }
//   }, [
//     selectedRegion,
//     selectedGender,
//     selectedAge,
//     filtersSelected,
//     onSelectAvatar,
//   ]);

//   return (
//     <div className="w-full max-w-md mx-auto mb-6 p-6 bg-white rounded-lg shadow-md">
//       <div className="space-y-4">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Select Region
//           </label>
//           <select
//             value={selectedRegion}
//             onChange={(e) => setSelectedRegion(e.target.value)}
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
//             Select Gender
//           </label>
//           <select
//             value={selectedGender}
//             onChange={(e) => setSelectedGender(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Select Gender</option>
//             {genders.map((gender) => (
//               <option key={gender.id} value={gender.id}>
//                 {gender.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Select Age
//           </label>
//           <select
//             value={selectedAge}
//             onChange={(e) => setSelectedAge(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Select Age</option>
//             {ages.map((age) => (
//               <option key={age.id} value={age.id}>
//                 {age.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {filtersSelected && selectedAvatar === null && (
//           <div className="mt-4 p-4 border border-red-300 bg-red-50 rounded-lg flex items-center">
//             <span role="img" aria-label="search" className="mr-2 text-xl">
//               🔍
//             </span>
//             <span className="text-red-700 font-medium">
//               No avatars found matching your selection. Please adjust the
//               filters to find an avatar.
//             </span>
//           </div>
//         )}

//         {selectedAvatar && (
//           <div className="mt-4 p-4 border rounded bg-blue-50">
//             <h3 className="text-lg font-medium text-gray-700">
//               Selected Avatar:
//             </h3>
//             <p>{selectedAvatar.name}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AvatarSelectionForm;

import { Avatar } from "@/interfaces/Interfaces";
import { AVATARS } from "@/utils/constants";
import React, { useState, useEffect } from "react";

interface AvatarSelectionFormProps {
  onSelectAvatar: (avatarId: string) => void;
}

const AvatarSelectionForm: React.FC<AvatarSelectionFormProps> = ({
  onSelectAvatar,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const filtersSelected = selectedRegion && selectedGender && selectedAge;
  console.log(selectedAvatar);

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

  useEffect(() => {
    if (filtersSelected) {
      let matchingAvatars = AVATARS.filter(
        (avatar) =>
          avatar.region === selectedRegion &&
          avatar.gender === selectedGender &&
          avatar.age === selectedAge
      );

      if (matchingAvatars.length === 0) {
        matchingAvatars = AVATARS.filter(
          (avatar) =>
            avatar.region === selectedRegion && avatar.gender === selectedGender
        );
      }
      if (matchingAvatars.length === 0) {
        matchingAvatars = AVATARS.filter(
          (avatar) => avatar.region === selectedRegion
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
    selectedRegion,
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
            Select Region
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
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

        {/* {selectedAvatar && (
          <div className="mt-4 p-4 border rounded bg-blue-50">
            <h3 className="text-lg font-medium text-gray-700">
              Selected Avatar:
            </h3>
            <p>{selectedAvatar.name}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AvatarSelectionForm;
