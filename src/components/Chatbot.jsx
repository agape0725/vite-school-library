// import { useState } from "react";
// import { useAccounts } from "../contexts/AccountsContext";
// import { faqs } from "../../data/db.json";

// export default function Chatbot() {
//   const { accounts, books } = useAccounts();
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "Hi! Ask me about availability of our books in the library.",
//     },
//   ]);
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     const botReply = getBotResponse(input);

//     setMessages((prev) => [
//       ...prev,
//       userMessage,
//       { sender: "bot", text: botReply },
//     ]);
//     setInput("");
//   };

//   const getBotResponse = (query) => {
//     const lowerQuery = query.toLowerCase();

//     //BOOK AVAILABILITY & BORROW STATUS
//     for (const account of accounts) {
//       const {
//         borrowed = [],
//         lost = [],
//         returning = [],
//         overdue = [],
//         fullname,
//       } = account;

//       const allBooks = [
//         ...borrowed.map((b) => ({ ...b })),
//         ...lost.map((b) => ({ ...b })),
//         ...returning.map((b) => ({ ...b })),
//         ...overdue.map((b) => ({ ...b })),
//       ];

//       for (const book of allBooks) {
//         if (lowerQuery.includes(book.title.toLowerCase())) {
//           const lentDate = new Date(book.lentDate);
//           const dateToday = new Date();

//           const borrowPeriodDays = 4;
//           const diffMs = dateToday - lentDate;
//           const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//           const daysLeft = borrowPeriodDays - daysPassed;

//           return `"${
//             book.title
//           }" is currently borrowed by ${fullname} and has ${daysLeft} day${
//             daysLeft !== 1 ? "s" : ""
//           } left before it's due.`;
//         }
//       }
//     }

//     const availableBookByTitle = books.find((b) =>
//       lowerQuery.includes(b.title.toLowerCase())
//     );

//     if (availableBookByTitle) {
//       return `"${availableBookByTitle.title}" is available and ready to borrow in the library.`;
//     }

//     const booksByAuthor = books.filter((b) =>
//       b.author_name.some((author) => lowerQuery.includes(author.toLowerCase()))
//     );

//     if (booksByAuthor.length > 0) {
//       const titles = booksByAuthor.map((b) => `"${b.title}"`).join(", ");
//       const author = booksByAuthor[0].author_name[0];
//       return `We have books by ${author}: ${titles}.`;
//     }

//     //FAQS
//     if (
//       lowerQuery.includes("how to borrow") ||
//       lowerQuery.includes("how can i borrow") ||
//       lowerQuery.includes("borrow book")
//     ) {
//       const faq1 = faqs.find((f) => f.id === "1");
//       if (faq1) return faq1.answer;
//     }

//     if (
//       lowerQuery.includes("how long") ||
//       lowerQuery.includes("how many days") ||
//       lowerQuery.includes("borrow period") ||
//       lowerQuery.includes("days to return") ||
//       lowerQuery.includes("when should i return")
//     ) {
//       const faq2 = faqs.find((f) => f.id === "2");
//       if (faq2) return faq2.answer;
//     }

//     if (
//       lowerQuery.includes("can i access") ||
//       lowerQuery.includes("use from home") ||
//       lowerQuery.includes("borrow online") ||
//       lowerQuery.includes("access remotely")
//     ) {
//       const faq3 = faqs.find((f) => f.id === "3");
//       if (faq3) return faq3.answer;
//     }

//     if (
//       lowerQuery.includes("how many") ||
//       lowerQuery.includes("maximum borrow") ||
//       lowerQuery.includes("limit of books")
//     ) {
//       const faq4 = faqs.find((f) => f.id === "4");
//       if (faq4) return faq4.answer;
//     }

//     if (
//       lowerQuery.includes("how to search") ||
//       lowerQuery.includes("find book") ||
//       lowerQuery.includes("search for book") ||
//       lowerQuery.includes("look for a book")
//     ) {
//       const faq5 = faqs.find((f) => f.id === "5");
//       if (faq5) return faq5.answer;
//     }

//     if (
//       lowerQuery.includes("late fee") ||
//       lowerQuery.includes("overdue fee") ||
//       lowerQuery.includes("penalty") ||
//       lowerQuery.includes("fine")
//     ) {
//       const faq6 = faqs.find((f) => f.id === "6");
//       if (faq6) return faq6.answer;
//     }

//     if (
//       lowerQuery.includes("lost book") ||
//       lowerQuery.includes("i lost a book") ||
//       lowerQuery.includes("missing book") ||
//       lowerQuery.includes("book i borrowed is gone")
//     ) {
//       const faq7 = faqs.find((f) => f.id === "7");
//       if (faq7) return faq7.answer;
//     }

//     if (
//       lowerQuery.includes("how") ||
//       lowerQuery.includes("what") ||
//       lowerQuery.includes("can") ||
//       lowerQuery.includes("why") ||
//       lowerQuery.includes("?")
//     ) {
//       return (
//         "Hmm, I’m not sure about that specific question 🤔. " +
//         "You can ask things like:\n" +
//         "• How to borrow a book\n" +
//         "• How many books can I borrow\n" +
//         "• What should I do if I lost a book\n" +
//         "• Are there late fees for overdue books"
//       );
//     }

//     // FALLBACK
//     return "Sorry, I couldn't find that book in our records.";
//   };

//   return (
//     <div className="flex flex-col w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl p-4">
//       <div className="flex-1 overflow-y-auto mb-4 h-80 border rounded-lg p-2">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`my-2 p-2 rounded-xl ${
//               msg.sender === "bot"
//                 ? "bg-gray-100 text-gray-800 self-start"
//                 : "bg-blue-500 text-white self-end ml-auto"
//             } w-fit max-w-[80%]`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask about a book..."
//           className="flex-1 border rounded-xl p-2 outline-none"
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// ORIGINAL

// import { useState } from "react";
// import { useAccounts } from "../contexts/AccountsContext";
// import { faqs } from "../../data/db.json";

// export default function Chatbot() {
//   const { accounts, books } = useAccounts();
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "Hi! Ask me about availability of our books in the library.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     const botReply = getBotResponse(input);

//     setMessages((prev) => [
//       ...prev,
//       userMessage,
//       { sender: "bot", text: botReply },
//     ]);
//     setInput("");
//   };

//   const getBotResponse = (query) => {
//     const lowerQuery = query.toLowerCase();

//     //BOOK QUERY
//     for (const account of accounts) {
//       const {
//         borrowed = [],
//         lost = [],
//         returning = [],
//         overdue = [],
//         fullname,
//       } = account;

//       const allBooks = [
//         ...borrowed.map((b) => ({ ...b })),
//         ...lost.map((b) => ({ ...b })),
//         ...returning.map((b) => ({ ...b })),
//         ...overdue.map((b) => ({ ...b })),
//       ];

//       for (const book of allBooks) {
//         if (lowerQuery.includes(book.title.toLowerCase())) {
//           const lentDate = new Date(book.lentDate);
//           const dateToday = new Date();

//           const borrowPeriodDays = 4;
//           const diffMs = dateToday - lentDate;
//           const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//           const daysLeft = borrowPeriodDays - daysPassed;

//           return `"${
//             book.title
//           }" is currently borrowed by ${fullname} and has ${daysLeft} day${
//             daysLeft !== 1 ? "s" : ""
//           } left before it's due.`;
//         }
//       }
//     }

//     const availableBookByTitle = books.find((b) =>
//       lowerQuery.includes(b.title.toLowerCase())
//     );

//     if (availableBookByTitle) {
//       return `Yes, "${availableBookByTitle.title}" is available and ready to borrow in the library.`;
//     }

//     if (
//       (!availableBookByTitle && lowerQuery.includes("book title")) ||
//       lowerQuery.includes("do you have")
//     ) {
//       return `Sorry, we currently don’t have that book in our collection. You can check again later or ask another title.`;
//     }

//     const booksByAuthor = books.filter((b) =>
//       b.author_name.some((author) => lowerQuery.includes(author.toLowerCase()))
//     );

//     if (booksByAuthor.length > 0) {
//       const titles = booksByAuthor.map((b) => `"${b.title}"`).join(", ");
//       const author = booksByAuthor[0].author_name[0];
//       return `We have books by ${author}: ${titles}.`;
//     }

//     //FAQS QUERY
//     if (
//       lowerQuery.includes("how to borrow") ||
//       lowerQuery.includes("how can i borrow") ||
//       lowerQuery.includes("borrow book")
//     ) {
//       const faq1 = faqs.find((f) => f.id === "1");
//       if (faq1) return faq1.answer;
//     }

//     if (
//       lowerQuery.includes("how long") ||
//       lowerQuery.includes("how many days") ||
//       lowerQuery.includes("borrow period") ||
//       lowerQuery.includes("days to return") ||
//       lowerQuery.includes("when should i return")
//     ) {
//       const faq2 = faqs.find((f) => f.id === "2");
//       if (faq2) return faq2.answer;
//     }

//     if (
//       lowerQuery.includes("can i access") ||
//       lowerQuery.includes("use from home") ||
//       lowerQuery.includes("borrow online") ||
//       lowerQuery.includes("access remotely")
//     ) {
//       const faq3 = faqs.find((f) => f.id === "3");
//       if (faq3) return faq3.answer;
//     }

//     if (
//       lowerQuery.includes("how many") ||
//       lowerQuery.includes("maximum borrow") ||
//       lowerQuery.includes("limit of books")
//     ) {
//       const faq4 = faqs.find((f) => f.id === "4");
//       if (faq4) return faq4.answer;
//     }

//     if (
//       lowerQuery.includes("how to search") ||
//       lowerQuery.includes("find book") ||
//       lowerQuery.includes("search for book") ||
//       lowerQuery.includes("look for a book")
//     ) {
//       const faq5 = faqs.find((f) => f.id === "5");
//       if (faq5) return faq5.answer;
//     }

//     if (
//       lowerQuery.includes("late fee") ||
//       lowerQuery.includes("overdue fee") ||
//       lowerQuery.includes("penalty") ||
//       lowerQuery.includes("fine")
//     ) {
//       const faq6 = faqs.find((f) => f.id === "6");
//       if (faq6) return faq6.answer;
//     }

//     if (
//       lowerQuery.includes("lost book") ||
//       lowerQuery.includes("i lost a book") ||
//       lowerQuery.includes("missing book") ||
//       lowerQuery.includes("book i borrowed is gone")
//     ) {
//       const faq7 = faqs.find((f) => f.id === "7");
//       if (faq7) return faq7.answer;
//     }

//     if (
//       lowerQuery.includes("how") ||
//       lowerQuery.includes("what") ||
//       lowerQuery.includes("can") ||
//       lowerQuery.includes("why") ||
//       lowerQuery.includes("?")
//     ) {
//       return (
//         "Hmm, I’m not sure about that specific question 🤔. " +
//         "You can ask things like:\n" +
//         "• How to borrow a book\n" +
//         "• How many books can I borrow\n" +
//         "• What should I do if I lost a book\n" +
//         "• Are there late fees for overdue books"
//       );
//     }

//     // FALLBACK
//     return "Sorry, I couldn't find that book in our records.";
//   };

//   return (
//     <>
//       {/* 💬 Floating Chat Icon */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
//         >
//           💬
//         </button>
//       )}

//       {/* 🪄 Chatbot Popup */}
//       {isOpen && (
//         <div className="fixed bottom-6 right-6 flex flex-col w-full max-w-md bg-white shadow-2xl rounded-2xl p-4 border border-gray-200 z-50">
//           {/* Close button */}
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-lg font-semibold">Library Assistant</h2>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-gray-500 hover:text-gray-700 text-xl"
//             >
//               ✖
//             </button>
//           </div>

//           {/* Chat messages */}
//           <div className="flex-1 overflow-y-auto mb-4 h-80 border rounded-lg p-2">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`my-2 p-2 rounded-xl ${
//                   msg.sender === "bot"
//                     ? "bg-gray-100 text-gray-800 self-start"
//                     : "bg-blue-500 text-white self-end ml-auto"
//                 } w-fit max-w-[80%]`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           {/* Input area */}
//           <div className="flex gap-2">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask about a book..."
//               className="flex-1 border rounded-xl p-2 outline-none"
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button
//               onClick={handleSend}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// EDITED

// import { useState } from "react";
// import { useAccounts } from "../contexts/AccountsContext";
// import { faqs } from "../../data/db.json";

// export default function Chatbot() {
//   const { accounts, books } = useAccounts();
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "Hi! Ask me about availability of our books in the library.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     const botReply = getBotResponse(input);

//     setMessages((prev) => [
//       ...prev,
//       userMessage,
//       { sender: "bot", text: botReply },
//     ]);
//     setInput("");
//   };

//   const getBotResponse = (query) => {
//     const lowerQuery = query.toLowerCase();

//     //BOOK QUERY
//     for (const account of accounts) {
//       const {
//         borrowed = [],
//         lost = [],
//         returning = [],
//         overdue = [],
//         fullname,
//       } = account;

//       const allBooks = [
//         ...borrowed.map((b) => ({ ...b })),
//         ...lost.map((b) => ({ ...b })),
//         ...returning.map((b) => ({ ...b })),
//         ...overdue.map((b) => ({ ...b })),
//       ];

//       for (const book of allBooks) {
//         if (lowerQuery.includes(book.title.toLowerCase())) {
//           const lentDate = new Date(book.lentDate);
//           const dateToday = new Date();

//           const borrowPeriodDays = 4;
//           const diffMs = dateToday - lentDate;
//           const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//           const daysLeft = borrowPeriodDays - daysPassed;

//           return `"${
//             book.title
//           }" is currently borrowed by ${fullname} and has ${daysLeft} day${
//             daysLeft !== 1 ? "s" : ""
//           } left before it's due.`;
//         }
//       }
//     }

//     const availableBookByTitle = books.find((b) =>
//       lowerQuery.includes(b.title.toLowerCase())
//     );

//     if (availableBookByTitle) {
//       return `Yes, "${availableBookByTitle.title}" is available and ready to borrow in the library.`;
//     }

//     if (
//       (!availableBookByTitle && lowerQuery.includes("book title")) ||
//       lowerQuery.includes("do you have")
//     ) {
//       return `Sorry, we currently don’t have that book in our collection. You can check again later or ask another title.`;
//     }

//     const booksByAuthor = books.filter((b) =>
//       b.author_name.some((author) => lowerQuery.includes(author.toLowerCase()))
//     );

//     if (booksByAuthor.length > 0) {
//       const titles = booksByAuthor.map((b) => `"${b.title}"`).join(", ");
//       const author = booksByAuthor[0].author_name[0];
//       return `We have books by ${author}: ${titles}.`;
//     }

//     //FAQS QUERY
//     if (
//       lowerQuery.includes("how to borrow") ||
//       lowerQuery.includes("how can i borrow") ||
//       lowerQuery.includes("borrow book")
//     ) {
//       const faq1 = faqs.find((f) => f.id === "1");
//       if (faq1) return faq1.answer;
//     }

//     if (
//       lowerQuery.includes("how long") ||
//       lowerQuery.includes("how many days") ||
//       lowerQuery.includes("borrow period") ||
//       lowerQuery.includes("days to return") ||
//       lowerQuery.includes("when should i return")
//     ) {
//       const faq2 = faqs.find((f) => f.id === "2");
//       if (faq2) return faq2.answer;
//     }

//     if (
//       lowerQuery.includes("can i access") ||
//       lowerQuery.includes("use from home") ||
//       lowerQuery.includes("borrow online") ||
//       lowerQuery.includes("access remotely")
//     ) {
//       const faq3 = faqs.find((f) => f.id === "3");
//       if (faq3) return faq3.answer;
//     }

//     if (
//       lowerQuery.includes("how many") ||
//       lowerQuery.includes("maximum borrow") ||
//       lowerQuery.includes("limit of books")
//     ) {
//       const faq4 = faqs.find((f) => f.id === "4");
//       if (faq4) return faq4.answer;
//     }

//     if (
//       lowerQuery.includes("how to search") ||
//       lowerQuery.includes("find book") ||
//       lowerQuery.includes("search for book") ||
//       lowerQuery.includes("look for a book")
//     ) {
//       const faq5 = faqs.find((f) => f.id === "5");
//       if (faq5) return faq5.answer;
//     }

//     if (
//       lowerQuery.includes("late fee") ||
//       lowerQuery.includes("overdue fee") ||
//       lowerQuery.includes("penalty") ||
//       lowerQuery.includes("fine")
//     ) {
//       const faq6 = faqs.find((f) => f.id === "6");
//       if (faq6) return faq6.answer;
//     }

//     if (
//       lowerQuery.includes("lost book") ||
//       lowerQuery.includes("i lost a book") ||
//       lowerQuery.includes("missing book") ||
//       lowerQuery.includes("book i borrowed is gone")
//     ) {
//       const faq7 = faqs.find((f) => f.id === "7");
//       if (faq7) return faq7.answer;
//     }

//     if (
//       lowerQuery.includes("how") ||
//       lowerQuery.includes("what") ||
//       lowerQuery.includes("can") ||
//       lowerQuery.includes("why") ||
//       lowerQuery.includes("?")
//     ) {
//       return (
//         "Hmm, I’m not sure about that specific question 🤔. " +
//         "You can ask things like:\n" +
//         "• How to borrow a book\n" +
//         "• How many books can I borrow\n" +
//         "• What should I do if I lost a book\n" +
//         "• Are there late fees for overdue books"
//       );
//     }

//     // FALLBACK
//     return "Sorry, I couldn't find that book in our records.";
//   };

//   return (
//     <>
//       {/* 💬 Floating Chat Icon */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
//         >
//           💬
//         </button>
//       )}

//       {/* 🪄 Chatbot Popup */}
//       {isOpen && (
//         <div className="fixed bottom-6 right-6 flex flex-col w-full max-w-md bg-white shadow-2xl rounded-2xl p-4 border border-gray-200 z-50 max-h-[80vh]">
//           {/* Close button */}
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-lg font-semibold">Library Assistant</h2>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-gray-500 hover:text-gray-700 text-xl"
//             >
//               ✖
//             </button>
//           </div>

//           {/* Chat messages */}
//           <div className="flex-1 overflow-y-auto mb-4 border rounded-lg p-2 min-h-[120px]">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`my-2 p-2 rounded-xl ${
//                   msg.sender === "bot"
//                     ? "bg-gray-100 text-gray-800"
//                     : "bg-blue-500 text-white ml-auto"
//                 } w-fit max-w-[80%]`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           {/* Input area */}
//           <div className="flex gap-2">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask about a book..."
//               className="flex-1 border rounded-xl p-2 outline-none"
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button
//               onClick={handleSend}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// NEW

import { useState } from "react";
import { useAccounts } from "../contexts/AccountsContext";
import { faqs } from "../../data/db.json";

export default function Chatbot() {
  const { accounts, books } = useAccounts();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! Ask me about availability of our books in the library.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botReply = getBotResponse(input);

    setMessages((prev) => [
      ...prev,
      userMessage,
      typeof botReply === "string"
        ? { sender: "bot", text: botReply }
        : { sender: "bot", ...botReply },
    ]);
    setInput("");
  };

  const getBotResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    // BOOK QUERY
    for (const account of accounts) {
      const {
        borrowed = [],
        lost = [],
        returning = [],
        overdue = [],
        fullname,
      } = account;

      const allBooks = [
        ...borrowed.map((b) => ({ ...b })),
        ...lost.map((b) => ({ ...b })),
        ...returning.map((b) => ({ ...b })),
        ...overdue.map((b) => ({ ...b })),
      ];

      for (const book of allBooks) {
        if (lowerQuery.includes(book.title.toLowerCase())) {
          const lentDate = new Date(book.lentDate);
          const dateToday = new Date();

          const borrowPeriodDays = 4;
          const diffMs = dateToday - lentDate;
          const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          const daysLeft = borrowPeriodDays - daysPassed;

          return `"${
            book.title
          }" is currently borrowed by ${fullname} and has ${daysLeft} day${
            daysLeft !== 1 ? "s" : ""
          } left before it's due.`;
        }
      }
    }

    const availableBookByTitle = books.find((b) =>
      lowerQuery.includes(b.title.toLowerCase()),
    );

    if (availableBookByTitle) {
      return `Yes, "${availableBookByTitle.title}" is available and ready to borrow in the library.`;
    }

    if (
      (!availableBookByTitle && lowerQuery.includes("book title")) ||
      lowerQuery.includes("do you have")
    ) {
      return `Sorry, we currently don’t have that book in our collection. You can check again later or ask another title.`;
    }

    const booksByAuthor = books.filter((b) =>
      b.author_name.some((author) => lowerQuery.includes(author.toLowerCase())),
    );

    if (booksByAuthor.length > 0) {
      const titles = booksByAuthor.map((b) => `"${b.title}"`).join(", ");
      const author = booksByAuthor[0].author_name[0];
      return `We have books by ${author}: ${titles}.`;
    }

    // FAQS QUERY
    if (
      lowerQuery.includes("how to borrow") ||
      lowerQuery.includes("how can i borrow") ||
      lowerQuery.includes("borrow book")
    ) {
      const faq1 = faqs.find((f) => f.id === "1");
      if (faq1) return faq1.answer;
    }

    if (
      lowerQuery.includes("how long") ||
      lowerQuery.includes("how many days") ||
      lowerQuery.includes("borrow period") ||
      lowerQuery.includes("days to return") ||
      lowerQuery.includes("when should i return")
    ) {
      const faq2 = faqs.find((f) => f.id === "2");
      if (faq2) return faq2.answer;
    }

    if (
      lowerQuery.includes("can i access") ||
      lowerQuery.includes("use from home") ||
      lowerQuery.includes("borrow online") ||
      lowerQuery.includes("access remotely")
    ) {
      const faq3 = faqs.find((f) => f.id === "3");
      if (faq3) return faq3.answer;
    }

    if (
      lowerQuery.includes("how many") ||
      lowerQuery.includes("maximum borrow") ||
      lowerQuery.includes("limit of books")
    ) {
      const faq4 = faqs.find((f) => f.id === "4");
      if (faq4) return faq4.answer;
    }

    if (
      lowerQuery.includes("how to search") ||
      lowerQuery.includes("find book") ||
      lowerQuery.includes("search for book") ||
      lowerQuery.includes("look for a book")
    ) {
      const faq5 = faqs.find((f) => f.id === "5");
      if (faq5) return faq5.answer;
    }

    if (
      lowerQuery.includes("late fee") ||
      lowerQuery.includes("overdue fee") ||
      lowerQuery.includes("penalty") ||
      lowerQuery.includes("fine")
    ) {
      const faq6 = faqs.find((f) => f.id === "6");
      if (faq6) return faq6.answer;
    }

    if (
      lowerQuery.includes("lost book") ||
      lowerQuery.includes("i lost a book") ||
      lowerQuery.includes("missing book") ||
      lowerQuery.includes("book i borrowed is gone")
    ) {
      const faq7 = faqs.find((f) => f.id === "7");
      if (faq7) return faq7.answer;
    }

    if (
      lowerQuery.includes("how") ||
      lowerQuery.includes("what") ||
      lowerQuery.includes("can") ||
      lowerQuery.includes("why") ||
      lowerQuery.includes("?")
    ) {
      return {
        text: "Hmm, I’m not sure about that specific question 🤔",
        suggestions: [
          "How to borrow a book",
          "How many books can I borrow",
          "What should I do if I lost a book",
          "Are there late fees for overdue books",
        ],
      };
    }

    return "Sorry, I couldn't find that book in our records.";
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
        >
          💬
        </button>
      )}

      {/* Chatbot */}
      {isOpen && (
        <div
          className="
          fixed 
          bottom-0 right-0 
          w-full h-[85vh]
          sm:bottom-6 sm:right-6 sm:w-full sm:max-w-md sm:h-auto
          flex flex-col 
          bg-white shadow-none sm:shadow-2xl 
          rounded-none sm:rounded-2xl 
          p-4 border border-gray-200 
          z-50
        "
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Library Assistant</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 border rounded-lg p-2 min-h-[120px] max-h-[60vh] sm:max-h-[50vh]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`my-2 p-2 rounded-xl ${
                  msg.sender === "bot"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-500 text-white ml-auto"
                } w-fit max-w-[85%] sm:max-w-[80%]`}
              >
                <div>
                  <p>{msg.text}</p>

                  {msg.suggestions && (
                    <div className="mt-2 flex flex-col gap-1">
                      {msg.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            const userMessage = { sender: "user", text: s };
                            const botReply = getBotResponse(s);

                            setMessages((prev) => [
                              ...prev,
                              userMessage,
                              typeof botReply === "string"
                                ? { sender: "bot", text: botReply }
                                : { sender: "bot", ...botReply },
                            ]);
                          }}
                          className="text-left text-blue-600 hover:underline text-sm"
                        >
                          • {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a book..."
              className="flex-1 border rounded-xl p-2 outline-none text-sm sm:text-base"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-xl text-sm sm:text-base"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
