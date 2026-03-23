import { useAccounts } from "../contexts/AccountsContext";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function BorrowStats() {
  const { accounts } = useAccounts();

  // Filter by year
  const collegeAccounts = accounts.filter((acc) => acc.year === "College");
  const shsAccounts = accounts.filter((acc) => acc.year === "Shs");

  // Borrowing counts
  const collegeBorrowed = collegeAccounts.filter(
    (acc) => acc.borrowed?.length > 0,
  ).length;
  const shsBorrowed = shsAccounts.filter(
    (acc) => acc.borrowed?.length > 0,
  ).length;

  // Percentages
  const collegePercentage = collegeAccounts.length
    ? ((collegeBorrowed / collegeAccounts.length) * 100).toFixed(2)
    : 0;
  const shsPercentage = shsAccounts.length
    ? ((shsBorrowed / shsAccounts.length) * 100).toFixed(2)
    : 0;

  return (
    <Section backgroundColor="bg-gradient-to-r from-orange-100 via-yellow-50 to-pink-100">
      <SectionTitle fontColor="text-orange100">
        Student Borrowing Report
      </SectionTitle>
      <div className="flex flex-col items-center max-w-5xl mx-auto gap-5">
        <p className="text-xs text-center text-black">
          See how our students are diving into the world of books! This report
          shows the borrowing activity of College and SHS students — a snapshot
          of just how much our library is fueling curiosity and learning.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Box
            studentType="College"
            accounts={collegeAccounts.length}
            borrowedAccounts={collegeBorrowed}
            percentage={collegePercentage}
            // color="#f28b30"
            color="#22c55e"
          />

          <Box
            studentType="Senior Highschool"
            accounts={shsAccounts.length}
            borrowedAccounts={shsBorrowed}
            percentage={shsPercentage}
            // color="#e63946"
            color="#22c55e"
          />
        </div>
      </div>
    </Section>
  );
}

function Box({ studentType, borrowedAccounts, percentage, color }) {
  return (
    <div className="bg-white p-5 rounded-lg flex flex-col items-center w-52 gap-5">
      <h3 className="font-semibold text-lg text-blue900">{studentType}</h3>

      <div className="w-24 h-24 mb-3">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: "#333",
            pathColor: color,
            trailColor: "#eee",
            textSize: "16px",
          })}
        />
      </div>
      <div className="text-center">
        <p className="text-xs">
          {borrowedAccounts === 0
            ? "No borrowed book yet"
            : `${borrowedAccounts} student${
                borrowedAccounts === 1 ? "" : "s"
              } borrowed book`}
        </p>
      </div>
    </div>
  );
}

export default BorrowStats;
