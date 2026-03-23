// import { useState } from "react";
// import starIcon from "../assets/icons/star.png";
// import noCover from "../assets/images/no-cover.jpg";
// import Overlay from "./Overlay";
// import { span } from "framer-motion/client";

// function Book({ book }) {
//   const [isHovered, setIsHovered] = useState(false);

//   const {
//     key,
//     title,
//     author_name: authorArray,
//     first_publish_year: year,
//     // Remove cover_i and rating if no longer used or keep rating if you want
//     book_cover: cover, // your local image path or import
//     rating,
//     isLost,
//   } = book;

//   const author = authorArray ? authorArray.join(", ") : "Unknown Author";

//   return (
//     <div
//       className={`${
//         isLost ? "opacity-20 pointer-events-none" : "cursor-pointer"
//       }`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div>
//         <div
//           className={`relative transition-transform duration-100 linear ${
//             isHovered ? "bg-cover" : "bg-contain scale-95"
//           } bg-center h-44 w-full shadow-inner`}
//           style={{
//             backgroundImage: `url(${
//               cover
//                 ? cover.startsWith("http")
//                   ? cover
//                   : `http://localhost:7000/${cover}`
//                 : noCover
//             })`,
//           }}
//         >
//           {isHovered && <Overlay opacity="bg-opacity-60" />}
//         </div>
//       </div>
//       {isLost ? (
//         <span className="flex justify-center text-xs truncate w-full sm:w-28">
//           unavailable
//         </span>
//       ) : (
//         <div className="flex flex-col h-full font-montserrat gap-0.5">
//           <h1 className="text-sm truncate w-full sm:w-28" title={title}>
//             {title}
//           </h1>
//           <p
//             className="text-xs font-semibold truncate w-full sm:w-28 flex-grow"
//             title={author}
//           >
//             {author}
//           </p>
//           <span
//             className={`flex gap-1 text-xs font-semibold ${
//               rating ? "text-orange100" : "text-orange200"
//             }`}
//             title={rating ? `Rating: ${rating.toFixed(1)}` : "No ratings"}
//           >
//             {typeof rating === "number" && rating > 0 ? (
//               <div className="flex gap-1 items-center">
//                 <p>{rating.toFixed(1)}</p>
//                 <img className="w-3 h-3" src={starIcon} alt="icon-star" />
//               </div>
//             ) : (
//               <span className="italic text-xs font-medium">No ratings</span>
//             )}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Book;

import { useState } from "react";
import starIcon from "../assets/icons/star.png";
import noCover from "../assets/images/no-cover.jpg";
import Overlay from "./Overlay";
// import { span } from "framer-motion/client";

function Book({ book }) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    key,
    title,
    author_name: authorArray,
    first_publish_year: year,
    // Remove cover_i and rating if no longer used or keep rating if you want
    book_cover: cover, // your local image path or import
    rating,
    isLost,
  } = book;

  const author = authorArray ? authorArray.join(", ") : "Unknown Author";

  const imageUrl = cover
    ? cover.startsWith("http")
      ? cover
      : `${import.meta.env.BASE_URL}${cover}` // ✅ FIX
    : noCover;

  return (
    <div
      className={`${
        isLost ? "opacity-20 pointer-events-none" : "cursor-pointer"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div
          className={`relative transition-transform duration-100 linear ${
            isHovered ? "bg-cover" : "bg-contain scale-95"
          } bg-center h-44 w-full shadow-inner`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {isHovered && <Overlay opacity="bg-opacity-60" />}
        </div>
      </div>
      {isLost ? (
        <span className="flex justify-center text-xs truncate w-full sm:w-28">
          unavailable
        </span>
      ) : (
        <div className="flex flex-col h-full font-montserrat gap-0.5">
          <h1 className="text-sm truncate w-full sm:w-28" title={title}>
            {title}
          </h1>
          <p
            className="text-xs font-semibold truncate w-full sm:w-28 flex-grow"
            title={author}
          >
            {author}
          </p>
          <span
            className={`flex gap-1 text-xs font-semibold ${
              rating ? "text-orange100" : "text-orange200"
            }`}
            title={rating ? `Rating: ${rating.toFixed(1)}` : "No ratings"}
          >
            {typeof rating === "number" && rating > 0 ? (
              <div className="flex gap-1 items-center">
                <p>{rating.toFixed(1)}</p>
                <img className="w-3 h-3" src={starIcon} alt="icon-star" />
              </div>
            ) : (
              <span className="italic text-xs font-medium">No ratings</span>
            )}
          </span>
        </div>
      )}
    </div>
  );
}

export default Book;
