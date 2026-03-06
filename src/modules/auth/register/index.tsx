import { FormAside } from "../components/FormAside";
import { RegisterForm } from "./components/Form";

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center overflow-hidden">
      <FormAside />
      <RegisterForm />
    </div>
  );
}
