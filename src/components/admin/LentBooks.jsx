import { useAccounts } from "../../contexts/AccountsContext";
import NoUserFound from "./NoUserFound";
import Section from "./Section";
import Users from "./Users";

function LentBooks() {
  const { accounts } = useAccounts();

  // Students //
  const studentsOnly = accounts?.filter((acc) => acc.role === "Student");

  function students(year, action) {
    return studentsOnly?.filter(
      (acc) => acc.year === year && acc[action].length !== 0
    );
  }

  // Borrowed
  const collegeStudentsBorrowed = students("College", "borrowed");
  const shsStudentsBorrowed = students("Shs", "borrowed");

  // Overdue
  const collegeStudentsOverdue = students("College", "overdue");
  const shsStudentsOverdue = students("Shs", "overdue");

  // Admins //
  const adminsOnly = accounts?.filter((acc) => acc.role === "Admin");

  function admins(role, action) {
    return adminsOnly?.filter(
      (acc) => acc.role === role && acc[action].length !== 0
    );
  }

  const adminBorrow = admins("Admin", "borrowed");
  const adminOverdue = admins("Admin", "overdue");

  const hasRequest =
    collegeStudentsBorrowed.length > 0 ||
    shsStudentsBorrowed.length > 0 ||
    collegeStudentsOverdue.length > 0 ||
    shsStudentsOverdue.length > 0 ||
    adminBorrow.length > 0 ||
    adminOverdue.length > 0;

  return (
    <>
      {hasRequest ? (
        <div className="space-y-8">
          {/* Admins */}
          {adminBorrow.length > 0 || adminOverdue.length > 0 ? (
            <Section
              title="Borrowed/Overdue book from admins:"
              gradient="bg-gradient-to-br from-emerald-100 via-teal-200 to-emerald-100 border border-emerald-300 shadow-lg"
              textStyle="text-emerald-800 font-bold tracking-wide"
            >
              {/* Borrowed */}
              <Users
                label="Borrowed"
                users={adminBorrow}
                action="borrowed"
                type="Shs"
              />
              {/* Overdue */}
              <Users
                label="Overdue"
                users={adminOverdue}
                action="overdue"
                type="College"
              />
            </Section>
          ) : null}

          {/* Students */}
          {/* Borrowed Books */}
          {shsStudentsBorrowed.length > 0 ||
          collegeStudentsBorrowed.length > 0 ? (
            <Section
              title="Borrowed book from students:"
              gradient="bg-gradient-to-br from-green-50 via-green-100 to-green-50 border border-green-200"
              textStyle="text-green-500"
            >
              <Users
                label="Senior Highschool"
                users={shsStudentsBorrowed}
                action="borrowed"
                type="Shs"
              />

              <Users
                label="College"
                users={collegeStudentsBorrowed}
                action="borrowed"
                type="College"
              />
            </Section>
          ) : null}

          {/* Overdue Books */}
          {shsStudentsOverdue.length > 0 ||
          collegeStudentsOverdue.length > 0 ? (
            <Section
              title="Overdue books from students:"
              gradient="bg-gradient-to-br from-red-50 via-red-100 to-red-50 border border-red-200"
              textStyle="text-red-500"
            >
              <Users
                label="Senior Highschool"
                users={shsStudentsOverdue}
                action="overdue"
                type="Shs"
              />

              <Users
                label="College"
                users={collegeStudentsOverdue}
                action="overdue"
                type="College"
              />
            </Section>
          ) : null}
        </div>
      ) : (
        <NoUserFound>No borrowed or overdue books</NoUserFound>
      )}
    </>
  );
}

export default LentBooks;
