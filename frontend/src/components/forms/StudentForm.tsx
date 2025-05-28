"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  legajo: z
    .string()
    .min(4, { message: "El legajo mínimamente debe tener 4 dígitos de longitud." })
    .max(10, { message: "El legajo como máximo puede tener 10 dígitos de longitud. Hablar con resposable!!" }),
  email: z.string().email({ message: "Mail inválido." }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener mínimo 8 carácteres de longitud!" }),
  firstName: z.string().min(1, { message: "El primer nombre es requerido!" }),
  lastName: z.string().min(1, { message: "El apellido es requerido!" }),
  phone: z.string().min(1, { message: "El teléfono es requerido!" }),
  address: z.string().min(1, { message: "El domicilio es requerido!" }),
  birthday: z.date({ message: "La fecha de nacimiento es requerida!" }),
  sex: z.enum(["male", "female"], { message: "Sexo es requerido!" }),
  img: z.instanceof(File, { message: "Una imagen es requerida" }),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Crear un nuevo estudiante</h1>
      <span className="text-xs text-gray-400 font-medium">
        Agregar Cuenta del mismo
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Legajo"
          name="legajo"
          defaultValue={data?.legajo}
          register={register}
          error={errors?.legajo}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Contraseña"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Información Personal
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nombre completo"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Apellido"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="N° Telefono"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Domicilio"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Fecha de nacimiento"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Hombre</option>
            <option value="female">Mujer</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Suba una foto</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
