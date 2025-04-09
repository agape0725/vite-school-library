// // import { useState } from "react";
// // import PageNav from "../components/PageNav";
// // import LibraryBooks from "../components/LibraryBooks";
// // import Overlay from "../components/Overlay";
// // import { Outlet } from "react-router-dom";

// // function Library() {
// //   const [bookDetails, setBookDetails] = useState({
// //     author_key: "",
// //     title: "",
// //     description: "",
// //     author_name: "",
// //     first_publish_year: "",
// //     rating: "",
// //     cover_i: "",
// //   });

// //   return (
// //     <>
// //       <div>
// //         <PageNav />
// //         <LibraryBooks setBookDetails={setBookDetails} />
// //         <Outlet context={{ bookDetails }} />
// //       </div>
// //     </>
// //   );
// // }

// // export default Library;

// import { useState } from "react";
// import PageNav from "../components/PageNav";
// // import LibraryBooks from "../components/LibraryBooks";
// import Overlay from "../components/Overlay";
// import { Outlet } from "react-router-dom";

// function Library() {
//   // const [bookDetails, setBookDetails] = useState({
//   //   author_key: "",
//   //   title: "",
//   //   description: "",
//   //   author_name: "",
//   //   first_publish_year: "",
//   //   rating: "",
//   //   cover_i: "",
//   // });

//   return (
//     <>
//       <div>
//         <PageNav />
//         {/* <LibraryBooks setBookDe tails={setBookDetails} /> */}
//         {/* <Outlet context={{ bookDetails }} /> */}
//         <Outlet />
//       </div>
//     </>
//   );
// }

// export default Library;

// import { useState } from "react";
// import PageNav from "../components/PageNav";
// import LibraryBooks from "../components/LibraryBooks";
// import Overlay from "../components/Overlay";
// import { Outlet } from "react-router-dom";

// function Library() {
//   const [bookDetails, setBookDetails] = useState({
//     author_key: "",
//     title: "",
//     description: "",
//     author_name: "",
//     first_publish_year: "",
//     rating: "",
//     cover_i: "",
//   });

//   return (
//     <>
//       <div>
//         <PageNav />
//         <LibraryBooks setBookDetails={setBookDetails} />
//         <Outlet context={{ bookDetails }} />
//       </div>
//     </>
//   );
// }

// export default Library;
import PageNav from "../components/PageNav";
import Books from "../components/Books";
import { Outlet } from "react-router-dom";

function Library({ bookDetails, setBookDetails }) {
  return (
    <>
      <div>
        <PageNav />
        <Books setBookDetails={setBookDetails} />
        <Outlet context={{ bookDetails }} />
      </div>
    </>
  );
}

export default Library;
