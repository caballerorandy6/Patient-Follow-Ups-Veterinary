import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Error from "./Error";
import type { DrafPatient } from "../types";
import { usePatientStore } from "../store/store";

export default function PatientForm() {
  // LLamamos a la funcion addPatient del store
  // const addPatient = usePatientStore((state) => state.addPatient); Tambien se puede hacer de esta forma
  const { addPatient, activeId, patients, updatePatient } = usePatientStore();

  //La funcion filter devuelve un array con los elementos que cumplan la condicion pero en este caso solo queremos que nos retorne un elemento como objeto por eso le ponemos [0]
  useEffect(() => {
    // Devuelve el paciente que queremos editar segun su id
    if (activeId) {
      const activePatient = patients.filter(
        (patient) => patient.id === activeId
      )[0];
      setValue("name", activePatient.name);
      setValue("caretaker", activePatient.caretaker);
      setValue("date", activePatient.date);
      setValue("email", activePatient.email);
      setValue("symptoms", activePatient.symptoms);
    }
  }, [activeId]);

  const {
    register,
    handleSubmit,
    setValue, //Set un valor por defecto a nuestro input, se utiliza en este caso para cuando queremos editar un formulario.
    formState: { errors },
    reset,
  } = useForm<DrafPatient>();

  const registerPatient = (data: DrafPatient) => {
    if (activeId) {
      updatePatient(data);
      toast.success("Patient updated successfully!", { type: "success" });
    } else {
      addPatient(data);
      toast.success("Patient added successfully!", { type: "success" });
    }
    reset();
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center uppercase">
        Patient Monitoring
      </h2>

      <p className="text-lg mt-5 text-center mb-10">
        Add patients and {""}
        <span className="text-indigo-600 font-bold">manage them!</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Patient
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Patient's name"
            {...register("name", {
              required: "The patient's name is required!",
              maxLength: { value: 20, message: "The name is too long!" },
              minLength: { value: 2, message: "The name is too short!" },
            })}
          />
          {/* errors.name?.message as string "TAMBIEN LO PODEMOS HACER DE ESTE MODO PARA JAVASCRIPT" */}
          {/* errors.name?.message?.toString() as string "TAMBIEN LO PODEMOS HACER DE ESTE MODO PARA JAVASCRIPT" */}
          {errors.name && <Error>{errors.name.message}</Error>}
          {errors.maxLength && <Error>{errors.maxLength.message}</Error>}
          {errors.minLength && <Error>{errors.minLength.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Owner
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Ownwer's name"
            {...register("caretaker", {
              required: "Owner's name is required!",
              maxLength: { value: 20, message: "The owner's is too long!" },
              minLength: { value: 2, message: "The owner's is too short!" },
            })}
          />
          {errors.caretaker && <Error>{errors.caretaker.message}</Error>}
          {errors.maxLength && <Error>{errors.maxLength.message}</Error>}
          {errors.minLength && <Error>{errors.minLength.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Registration email"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email!",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Dicharge Date
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register("date", {
              required: "Date is required!",
            })}
          />
          {errors.date && <Error>{errors.date?.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Symptoms
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100 resize-textarea"
            placeholder="Patient symptoms"
            {...register("symptoms", {
              required: "Symptoms are required!",
              maxLength: { value: 300, message: "Symptoms are too long!" },
              minLength: { value: 2, message: "Symptoms are too short!" },
            })}
          />
          {errors.symptoms && <Error>{errors.symptoms?.message}</Error>}
          {errors.maxLength && <Error>{errors.maxLength.message}</Error>}
          {errors.minLength && <Error>{errors.minLength.message}</Error>}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Save Patient"
        />
      </form>
    </div>
  );
}
