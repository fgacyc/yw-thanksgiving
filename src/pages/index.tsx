import Head from "next/head";
import { Field, Form, Formik } from "formik";
import { uuid } from "uuidv4";
import { useState } from "react";
import { useDatabase } from "reactfire";
import { ref, set } from "firebase/database";
import Select from "react-select";
import { getRandomInt } from "~/utils/helpers";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const options = [
    {
      value: 1,
      label: "1-2 Years",
    },
    {
      value: 2,
      label: "3-4 Years",
    },
    {
      value: 3,
      label: "5-6 Years",
    },
    {
      value: 4,
      label: "7+ Years",
    },
  ];

  const dbRef = useDatabase();
  return (
    <>
      <Head>
        <title>Thanksgiving | FGACYCYW</title>
        <meta name="description" content="Unstoppable" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/Base_UNS.png')] bg-cover bg-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="relative flex max-w-xs  flex-col rounded-xl bg-white p-4 text-black shadow-lg">
            <img
              src={`https://api.dicebear.com/6.x/micah/svg?seed=${name.toUpperCase()}`}
              alt=""
              className="absolute -top-12 left-1/2 h-[100px] w-[100px] -translate-x-1/2 rounded-full border-2 border-white bg-gradient-to-tr from-[#b6e3f4] via-[#c0aede] to-[#d1d4f9]"
            />
            <p className="w-full pt-12 text-center text-xl font-bold">
              你来了CYC多少年?
            </p>
            <p className="w-full text-center text-xl font-bold">
              How long have you been attending CYC?
            </p>
            <Formik
              initialValues={{ name: "", cg: "", level: 1 }}
              onSubmit={async (values, actions) => {
                setLoading(true);
                const id = uuid();
                const now = Date.now();

                if (!values.name || !values.cg) {
                  alert("必须填写每一个格子");
                  setLoading(false);
                  throw new Error("必须填写每一个格子");
                }
                await set(ref(dbRef, `${now}`), {
                  ...values,
                  name: values.name.toUpperCase(),
                  cg: values.cg.toUpperCase(),
                  id: id,
                  approved: false,
                  createdAt: now,
                  gradient: getRandomInt(1, 4),
                }).then(() => {
                  setLoading(false);
                  alert("成功!");
                  actions.resetForm();
                });
              }}
            >
              {({ errors, setValues, values, handleChange, handleBlur }) => (
                <Form className="mt-2">
                  <div className="mb-2 flex flex-row items-center justify-center rounded-md border border-black px-2 py-1">
                    <label className="w-[70%] text-sm font-semibold">
                      全名 Full Name:
                    </label>
                    <input
                      name="name"
                      value={values.name}
                      onChange={(e) => {
                        handleChange(e);
                        setName(e.currentTarget.value);
                      }}
                      onBlur={handleBlur}
                      disabled={loading}
                      className={`w-full rounded-md px-2 py-1 font-bold focus-within:outline-none ${
                        errors.name ? "outline-2 outline-red-500" : ""
                      }`}
                    />
                  </div>
                  <div className="mb-2 flex flex-row items-center justify-center rounded-md border border-black px-2 py-1">
                    <label className="w-[70%] text-sm font-semibold">
                      小组 CG:
                    </label>
                    <Field
                      name="cg"
                      disabled={loading}
                      as="input"
                      className={`w-full rounded-md px-2 py-1 font-bold text-black focus-within:outline-none ${
                        errors.cg ? "outline-2 outline-red-500" : ""
                      }`}
                    />
                  </div>

                  <Select
                    options={options}
                    onChange={(e) =>
                      void setValues({ ...values, level: e!.value })
                    }
                    defaultValue={{ value: 1, label: "1-2 Years" }}
                    isSearchable={false}
                    styles={{
                      container: (baseStyles) => ({
                        ...baseStyles,
                        borderColor: "#000",
                        borderWidth: "1px",
                        borderRadius: "0.375rem",
                      }),
                    }}
                  />

                  <button className="mt-2 w-full rounded-md bg-[hsl(115,100%,70%)] py-2 text-base font-bold">
                    确定 Confirm
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
    </>
  );
}
