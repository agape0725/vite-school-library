import Overlay from "./Overlay";
import eventImage from "../assets/images/basketball-event.jpg";

function EventImage() {
  return (
    <div className="relative w-full md:w-1/2">
      <img
        src={eventImage}
        alt="News"
        className="w-full h-auto rounded-lg shadow-lg"
      />
      <Overlay hoverBackground="bg-opacity-0" opacity="bg-opacity-20" />
    </div>
  );
}

export default EventImage;
