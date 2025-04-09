import noImage from "../assets/images/no-cover.jpg";
import Button from "./Button";
import closeImg from "../assets/icons/close.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function BookDetails({ details, author }) {
  const { title, description, covers, first_publish_date: year } = details;
  const image = covers?.[0];

  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        navigate("/library");
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [navigate]);

  return (
    <>
      <div className="absolute right-5" onClick={() => navigate("/library")}>
        <img className="w-4 cursor-pointer " src={closeImg} alt="close" />
      </div>
      <img
        className="rounded-lg w-full h-[50vh] md:w-[250px] mx-auto object-contain"
        src={
          image ? `https://covers.openlibrary.org/b/id/${image}-M.jpg` : noImage
        }
        alt="Book cover"
      />
      <div className="flex flex-col gap-3 justify-center w-full">
        <p className="text-xl text-blue900 font-semibold">{title}</p>
        {typeof description === "string" ? (
          <p className="text-xs">{description}</p>
        ) : description?.value ? (
          <p className="text-xs text-gray-600 italic text-justify">
            {description.value}
          </p>
        ) : (
          <p className="text-xs text-red-500 italic font-light">
            *NO DESCRIPTION*
          </p>
        )}
        <div className="flex flex-col gap-1">
          <p className="text-xs">
            <span className="text-orange200">Author:</span> {author}
          </p>
          <p className="text-xs">
            <span className="text-orange200">Year:</span> {year}
          </p>
        </div>
        {/* <div className="flex mt-5 justify-center md:justify-start">
          <Button type="btn1" padding="padding2" hover="hover1">
            Borrow
          </Button>
        </div> */}
      </div>
    </>
  );
}

export default BookDetails;
