import { useState, useRef } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = "http://localhost:7000";

export default function BookScanner() {
  const [data, setData] = useState("");
  const lastScannedRef = useRef(null);
  const navigate = useNavigate();

  async function handleScan(code) {
    try {
      const res = await axios.get(`${backendUrl}/books`);
      const found = res.data.find(
        (b) => String(b.id) === String(code) || String(b.key) === String(code)
      );

      if (!found) {
        const notFoundBook = { title: "Book not found!", id: code };
        navigate("book-found", { state: { book: notFoundBook } });
        return;
      }

      const scannedBook = {
        ...found,
        book_cover: found.book_cover
          ? found.book_cover.startsWith("http")
            ? found.book_cover
            : `${backendUrl}/${found.book_cover}`
          : null,
      };
      navigate("book-found", { state: { book: scannedBook } });
    } catch (err) {
      console.error("Failed to fetch book", err);
    }
  }

  function handleUpdate(err, result) {
    if (result?.text) {
      const scanned = result.text;
      if (scanned !== lastScannedRef.current) {
        lastScannedRef.current = scanned;
        setData(scanned);
        handleScan(scanned);
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-4">
        📚 Scan a Book Barcode
      </h2>

      <div className="relative border-4 border-green-500 rounded-xl overflow-hidden shadow-lg">
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={handleUpdate}
        />
        {/* Scanner line effect */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-green-500 animate-pulse"></div>
      </div>

      {/* {data && ( */}
      <div className="mt-6 text-center">
        {/* <p className="text-sm text-gray-500">Last scanned code:</p> */}
        <p className="text-lg font-semibold text-green-600">{data}</p>
      </div>
      {/* )} */}
    </div>
  );
}
