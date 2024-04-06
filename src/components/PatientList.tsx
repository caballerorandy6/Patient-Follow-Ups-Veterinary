import { usePatientStore } from "../store/store";
import PatientDetails from "./PatientDetails";

const PatientList = () => {
  const { patients } = usePatientStore();
  //console.log(patients);

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
      {patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Patient List</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Manage your {""}
            <span className="text-indigo-600 font-bold">
              patients and appointments
            </span>
          </p>
          {patients.map((patient) => (
            <PatientDetails key={patient.id} patient={patient} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center uppercase">
            No Patients Yet
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Start adding patients and they will appear{" "}
            <span className="text-indigo-600 font-bold">here!</span>
          </p>
        </>
      )}
    </div>
  );
};

export default PatientList;
