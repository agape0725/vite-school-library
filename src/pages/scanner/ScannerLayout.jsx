import PageNav from "../../components/PageNav";
import { Outlet } from "react-router-dom";

function ScannerLayout() {
  return (
    <>
      <PageNav />
      <div className="p-4">
        <Outlet /> {/* will render BookScanner or ScannedBook */}
      </div>
    </>
  );
}

export default ScannerLayout;
