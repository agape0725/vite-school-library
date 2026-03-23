import { useAccounts } from "../../contexts/AccountsContext";
import NoUserFound from "./NoUserFound";
import Section from "./Section";
import Users from "./Users";

export default function LostBooks() {
  const { accounts } = useAccounts();

  // Students
  const studentsOnly = Array.isArray(accounts)
    ? accounts?.filter((acc) => acc.role === "Student")
    : [];

  function students(year, action) {
    return studentsOnly?.filter(
      (acc) => acc.year === year && acc[action]?.length !== 0
    );
  }

  // Borrow
  const collegeStudentsLostBook = students("College", "lost");
  const shsStudentsLostBook = students("Shs", "lost");

  // Admins
  const adminsOnly = Array.isArray(accounts)
    ? accounts?.filter((acc) => acc.role === "Admin")
    : [];

  function admins(action) {
    return adminsOnly?.filter((acc) => acc[action]?.length !== 0);
  }

  const adminLostBook = admins("lost");

  const hasLostBook =
    collegeStudentsLostBook.length > 0 ||
    shsStudentsLostBook.length > 0 ||
    adminLostBook.length > 0;

  return (
    <>
      {hasLostBook ? (
        <div className="space-y-8">
          {/* Admins */}
          {adminLostBook.length > 0 ? (
            <Section
              title="Admin(s) Report"
              gradient="bg-gradient-to-br from-emerald-100 via-teal-200 to-emerald-100 border border-emerald-300 shadow-lg"
              textStyle="text-emerald-800 font-bold tracking-wide"
            >
              <Users label="Lost Book" users={adminLostBook} action="lost" />
            </Section>
          ) : null}
          {/* Students */}
          {collegeStudentsLostBook.length > 0 ||
          shsStudentsLostBook.length > 0 ? (
            <Section title="Student(s) Report">
              <Users
                label="Senior Highschool"
                users={shsStudentsLostBook}
                action="lost"
              />

              <Users
                label="College"
                users={collegeStudentsLostBook}
                action="lost"
              />
            </Section>
          ) : null}
        </div>
      ) : (
        <NoUserFound>No lost book</NoUserFound>
      )}
    </>
  );
}
