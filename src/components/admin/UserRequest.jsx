import { useAccounts } from "../../contexts/AccountsContext";
import NoUserFound from "./NoUserFound";
import Section from "./Section";
import Users from "./Users";

function UserRequest() {
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
  const collegeStudentsBorrow = students("College", "borrow");
  const shsStudentsBorrow = students("Shs", "borrow");

  // Return
  const collegeStudentsReturn = students("College", "returning");
  const shsStudentsReturn = students("Shs", "returning");

  // Admins
  const adminsOnly = Array.isArray(accounts)
    ? accounts?.filter((acc) => acc.role === "Admin")
    : [];

  function admins(action) {
    return adminsOnly?.filter((acc) => acc[action]?.length !== 0);
  }

  const adminBorrow = admins("borrow");
  const adminReturn = admins("returning");

  const hasRequest =
    collegeStudentsBorrow.length > 0 ||
    shsStudentsBorrow.length > 0 ||
    collegeStudentsReturn.length > 0 ||
    shsStudentsReturn.length > 0 ||
    adminBorrow.length > 0 ||
    adminReturn.length > 0;

  return (
    <>
      {hasRequest ? (
        <div className="space-y-8">
          {/* Admins */}
          {/* Borrow Request */}
          {adminBorrow.length > 0 || adminReturn.length > 0 ? (
            <Section
              title="Admin request"
              gradient="bg-gradient-to-br from-emerald-100 via-teal-200 to-emerald-100 border border-emerald-300 shadow-lg"
              textStyle="text-emerald-800 font-bold tracking-wide"
            >
              <Users
                label="Borrow Request"
                users={adminBorrow}
                action="borrowing"
              />
              <Users
                label="Return Request"
                users={adminReturn}
                action="returning"
              />
            </Section>
          ) : null}

          {/* Students */}
          {/* Borrow Requests */}
          {shsStudentsBorrow.length > 0 || collegeStudentsBorrow.length > 0 ? (
            <Section title="Student(s) who sent request to borrow book:">
              <Users
                label="Senior Highschool"
                users={shsStudentsBorrow}
                action="borrowing"
              />

              <Users
                label="College"
                users={collegeStudentsBorrow}
                action="borrowing"
              />
            </Section>
          ) : null}

          {/* Return Requests */}
          {shsStudentsReturn.length > 0 || collegeStudentsReturn.length > 0 ? (
            <Section title="Student(s) who sent request to return book:">
              <Users
                label="Senior Highschool"
                users={shsStudentsReturn}
                action="returning"
                type="Shs"
              />

              <Users
                label="College"
                users={collegeStudentsReturn}
                action="returning"
                type="College"
              />
            </Section>
          ) : null}
        </div>
      ) : (
        <NoUserFound>No pending requests.</NoUserFound>
      )}
    </>
  );
}

export default UserRequest;
