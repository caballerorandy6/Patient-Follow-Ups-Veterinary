import { usePatientStore } from "../store/store";
import { PatientDetailsProps } from "../types/index";
import PatientDetailItem from "./PatientDetailItem";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const { deletePatient, getPatientById } = usePatientStore();

  const handleclick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePatient(patient.id);
        toast.error("Patient deleted successfully!", { type: "error" });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else {
        toast.error("Patient not deleted!", { type: "error" });
      }
    });
  };
  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="ID:" data={patient.id} />
      <PatientDetailItem label="Name:" data={patient.name} />
      <PatientDetailItem label="Owner:" data={patient.caretaker} />
      <PatientDetailItem label="Email:" data={patient.email} />
      <PatientDetailItem label="Date:" data={patient.date.toString()} />
      <PatientDetailItem label="Symptoms:" data={patient.symptoms} />
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between mt-10">
        <button
          onClick={() => getPatientById(patient.id)}
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-bold uppercase rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={handleclick}
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 transition-colors text-white font-bold uppercase rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
