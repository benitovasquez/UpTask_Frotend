import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectView() {
    const navigate = useNavigate();

    // Valores iniciales del formulario
    const initialValue: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    };

    // Uso de `useForm` con valores predeterminados
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValue
    });

    // Configuración de la mutación usando useMutation de react-query
    const mutation = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate('/');
        }
    });

    // Maneja el envío del formulario
    const handleForm = (formData: ProjectFormData) => mutation.mutate(formData);

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Llena el siguiente formulario para crear un proyecto
                </p>

                <nav className="my-5">
                    <Link
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to="/"
                    >
                        Volver a Proyectos
                    </Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />

                    <input
                        type="submit"
                        value="Crear Proyecto"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    );
}
